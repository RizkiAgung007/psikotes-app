<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryInterpretation;
use App\Models\Module;
use App\Models\Option;
use App\Models\UserAnswer;
use App\Models\UserTest;
use Carbon\Carbon; // <--- PENTING: Import Carbon untuk manipulasi waktu
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserTestController extends Controller
{
    /**
     * Menampilkan Dashboard User
     */
    public function index()
    {
        $userId = Auth::id();

        // Mengambil modul beserta status apakah user ini sudah mengerjakannya
        $modules = Module::withCount('questions')
            ->with(['userTests' => function ($q) use ($userId) {
                $q->where('user_id', $userId)->latest();
            }])->get()->map(function ($module) {
                // Cek apakah sudah ada tes yang finished_at nya terisi
                $module->is_done = $module->userTests->whereNotNull('finished_at')->isNotEmpty();
                return $module;
            });

        return Inertia::render('Dashboard', [
            'modules' => $modules
        ]);
    }

    /**
     * Memulai ujian baru (Klik tombol Mulai)
     */
    public function store(Request $request)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id'
        ]);

        $userId = Auth::id();

        // 1. Cek apakah ada sesi menggantung (belum selesai)
        $existingTest = UserTest::where('user_id', $userId)
            ->where('module_id', $request->module_id)
            ->whereNull('finished_at')
            ->first();

        if ($existingTest) {
            return redirect()->route('exam.show', $existingTest->id);
        }

        // 2. Jika tidak ada, buat sesi baru
        $newTest = UserTest::create([
            'user_id'    => $userId,
            'module_id'  => $request->module_id,
            'started_at' => now() // Waktu start dicatat disini
        ]);

        return redirect()->route('exam.show', $newTest->id);
    }

    /**
     * Menampilkan halaman soal ujian
     */
    public function show($id)
    {
        // Ambil data tes, modul, soal, dan opsi jawaban
        $test = UserTest::with(['module.questions' => function ($q) {
            $q->orderBy('order', 'asc')->with('options');
        }])
        ->where('user_id', Auth::id())
        ->findOrFail($id);

        // Jika tes sudah selesai, lempar ke halaman hasil
        if ($test->finished_at) {
            return redirect()->route('exam.result', $test->id)->with('message', 'Tes ini sudah selesai');
        }

        // --- LOGIKA HITUNG MUNDUR (TIMER) ---

        $startedAt = Carbon::parse($test->started_at);
        // Ambil batas waktu dari modul (default 30 menit jika null)
        $timeLimitMinutes = $test->module->time_limit ?? 30;

        // Hitung waktu mati (Deadline)
        $deadline = $startedAt->copy()->addMinutes($timeLimitMinutes);

        // Hitung selisih detik antara SEKARANG dan DEADLINE
        // parameter false agar mengembalikan nilai negatif jika waktu sudah lewat
        $remainingSeconds = now()->diffInSeconds($deadline, false);

        // Jika waktu sudah habis (minus), set ke 0
        if ($remainingSeconds < 0) {
            $remainingSeconds = 0;
        }

        // ------------------------------------

        return Inertia::render('Exam/Show', [
            'test'      => $test,
            'questions' => $test->module->questions,
            'remaining_time' => (int) $remainingSeconds // Kirim sisa detik ke React
        ]);
    }

    /**
     * Submit Jawaban (Selesai Tes)
     */
    public function update(Request $request, $id)
    {
        $test = UserTest::where('user_id', Auth::id())->findOrFail($id);

        if ($test->finished_at) {
            return redirect()->route('exam.result', $test->id);
        }

        // Mulai Transaksi Database agar aman
        DB::transaction(function () use ($request, $test) {

            // 1. Simpan Jawaban User
            if ($request->answers && count($request->answers) > 0) {
                foreach ($request->answers as $optionId => $score) {
                    $option = Option::find($optionId);

                    if ($option) {
                        UserAnswer::create([
                            'user_test_id'  => $test->id,
                            'questions_id'  => $option->question_id,
                            'option_id'     => $optionId,
                            'score'         => $score,
                        ]);
                    }
                }
            }

            // 2. Hitung Skor (Scoring Logic)
            $answers = UserAnswer::with(['option.category'])->where('user_test_id', $test->id)->get();
            $groupedStats = [];

            foreach ($answers as $ans) {
                if ($ans->option && $ans->option->category) {
                    $catId = $ans->option->category->id;

                    if (!isset($groupedStats[$catId])) {
                        $groupedStats[$catId] = [
                            'id' => $catId,
                            'name' => $ans->option->category->name,
                            'code' => $ans->option->category->code,
                            'score' => 0
                        ];
                    }
                    $groupedStats[$catId]['score'] += $ans->score;
                }
            }

            // 3. Ranking & Interpretasi
            $rankedResults = array_values($groupedStats);
            usort($rankedResults, function ($a, $b) {
                return $b['score'] <=> $a['score'];
            });

            foreach ($rankedResults as $index => &$result) {
                $rank = $index + 1;
                $result['rank'] = $rank;

                $interpretation = CategoryInterpretation::where('category_id', $result['id'])
                                    ->where('rank', $rank)
                                    ->first();

                $result['description'] = $interpretation ? $interpretation->description : "Belum ada penjelasan.";
            }

            // 4. Tandai Selesai & Simpan Hasil JSON
            $test->update([
                'finished_at' => now(),
                'result'      => json_encode($rankedResults)
            ]);
        });

        return redirect()->route('exam.result', $test->id)->with('message', 'Tes berhasil dikumpulkan');
    }

    /**
     * Menampilkan Result
     */
    public function result($id)
    {
        $test = UserTest::with('module')->where('user_id', Auth::id())->findOrFail($id);

        if (!$test->finished_at) {
            return redirect()->route('exam.show', $test->id);
        }

        $results = json_decode($test->result, true);

        return Inertia::render('Exam/Result', [
            'test'    => $test,
            'results' => $results
        ]);
    }

    /**
     * Menampilkan History
     */
    public function history()
    {
        $histories = UserTest::with('module')->where('user_id', Auth::id())
                    ->whereNotNull('finished_at')
                    ->latest()->get();

        // Pastikan folder view sesuai dengan yang kita buat sebelumnya ('User/History')
        return Inertia::render('User/History', [
            'histories' => $histories
        ]);
    }

    public function update(Request $request, $id)
    {
        $test = UserTest::where('user_id', Auth::id())->findOrFail($id);

        if ($test->finished_at) {
            return redirect()->route('exam.result', $test->id);
        }

        DB::transaction(function () use ($request, $test) {

            // 1. SIMPAN JAWABAN
            // Gunakan updateOrCreate agar tidak duplikat jika user spam klik submit
            if ($request->answers && count($request->answers) > 0) {
                foreach ($request->answers as $optionId => $score) {
                    $option = Option::find($optionId);

                    if ($option) {
                        UserAnswer::updateOrCreate(
                            [
                                'user_test_id' => $test->id,
                                'questions_id' => $option->question_id, // Kunci unik
                            ],
                            [
                                'option_id'    => $optionId,
                                'score'        => $score,
                            ]
                        );
                    }
                }
            }

            // ---------------------------------------------------------
            // PERBAIKAN LOGIKA SCORING DIMULAI DARI SINI
            // ---------------------------------------------------------

            // 2. INISIALISASI SEMUA KATEGORI (Agar tidak kosong)
            $allCategories = Category::all();
            $groupedStats = [];

            // Siapkan wadah untuk SEMUA kategori dengan skor 0
            foreach ($allCategories as $cat) {
                $groupedStats[$cat->id] = [
                    'id'    => $cat->id,
                    'name'  => $cat->name,
                    'code'  => $cat->code,
                    'score' => 0 // Default 0
                ];
            }

            // 3. AMBIL JAWABAN & ISI SKOR
            $answers = UserAnswer::with(['option.category'])
                        ->where('user_test_id', $test->id)
                        ->get();

            foreach ($answers as $ans) {
                if ($ans->option && $ans->option->category) {
                    $catId = $ans->option->category->id;

                    // Kita tinggal tambah skor ke wadah yang sudah disiapkan di atas
                    if (isset($groupedStats[$catId])) {
                        $groupedStats[$catId]['score'] += $ans->score;
                    }
                }
            }

            // 4. SORTING & RANKING
            $rankedResults = array_values($groupedStats);

            // Urutkan Skor Tertinggi -> Terendah
            usort($rankedResults, function ($a, $b) {
                return $b['score'] <=> $a['score'];
            });

            // Beri Penjelasan
            foreach ($rankedResults as $index => &$result) {
                $rank = $index + 1;
                $result['rank'] = $rank;

                $interpretation = CategoryInterpretation::where('category_id', $result['id'])
                                    ->where('rank', $rank)
                                    ->first();

                $result['description'] = $interpretation
                    ? $interpretation->description
                    : "Anda berada di peringkat $rank (Skor: {$result['score']}).";
            }

            $test->update([
                'finished_at' => now(),
                'result'      => json_encode($rankedResults)
            ]);
        });

        return redirect()->route('exam.result', $test->id)->with('message', 'Tes berhasil dikumpulkan');
    }

    /**
     * Submit Jawaban (Perbaikan Logic)
     */
    public function update(Request $request, $id)
    {
        $test = UserTest::where('user_id', Auth::id())->findOrFail($id);

        // Jika sudah selesai, jangan diproses lagi
        if ($test->finished_at) {
            return redirect()->route('exam.result', $test->id);
        }

        DB::transaction(function () use ($request, $test) {
            // 1. SIMPAN JAWABAN (Jika ada data yang dikirim)
            // Kita cek input 'answers' secara eksplisit
            $incomingAnswers = $request->input('answers', []);

            if (!empty($incomingAnswers) && is_array($incomingAnswers)) {

                // Ambil semua ID Opsi sekaligus untuk meminimalisir query ke DB (Performance Tuning)
                $optionIds = array_keys($incomingAnswers);
                $options = Option::whereIn('id', $optionIds)->get()->keyBy('id');

                foreach ($incomingAnswers as $optionId => $score) {
                    // Pastikan opsi valid ada di database
                    if (isset($options[$optionId])) {
                        $option = $options[$optionId];

                        // Gunakan updateOrCreate untuk menyimpan/update jawaban
                        UserAnswer::updateOrCreate(
                            [
                                'user_test_id' => $test->id,
                                'option_id'    => $optionId,
                            ],
                            [
                                // Pastikan nama kolom ini sesuai di database Anda ('questions_id' atau 'question_id')
                                'questions_id' => $option->question_id,
                                'score'        => $score,
                            ]
                        );
                    }
                }
            }

            // 2. MULAI PERHITUNGAN
            // Ambil SEMUA jawaban yang ada di database untuk tes ini
            // (Baik yang baru disimpan, maupun yang 'Simpan Sementara' sebelumnya)
            $recordedAnswers = UserAnswer::with(['option.category'])
                ->where('user_test_id', $test->id)
                ->get();

            // Siapkan template kategori
            $allCategories = Category::all();
            $groupedStats = [];

            foreach ($allCategories as $cat) {
                $groupedStats[$cat->id] = [
                    'id'    => $cat->id,
                    'name'  => $cat->name,
                    'code'  => $cat->code,
                    'score' => 0
                ];
            }

            // Hitung Skor berdasarkan data di Database
            foreach ($recordedAnswers as $ans) {
                if ($ans->option && $ans->option->category) {
                    $catId = $ans->option->category->id;
                    if (isset($groupedStats[$catId])) {
                        $groupedStats[$catId]['score'] += $ans->score;
                    }
                }
            }

            // 3. RANKING & INTERPRETASI
            $rankedResults = array_values($groupedStats);

            // Sort: Tertinggi ke Terendah
            usort($rankedResults, function ($a, $b) {
                return $b['score'] <=> $a['score'];
            });

            // Ambil Interpretasi
            foreach ($rankedResults as $index => &$result) {
                $rank = $index + 1;
                $result['rank'] = $rank;

                $interpretation = CategoryInterpretation::where('category_id', $result['id'])
                    ->where('rank', $rank)
                    ->first();

                $result['description'] = $interpretation
                    ? $interpretation->description
                    : "Belum ada penjelasan untuk peringkat ini.";
            }

            // 4. FINALISASI TES
            // Simpan hasil json dan tandai selesai
            $test->update([
                'finished_at' => now(),
                'result'      => json_encode($rankedResults)
            ]);
        });

        return redirect()->route('exam.result', $test->id)
            ->with('message', 'Tes berhasil dikumpulkan');
    }
}

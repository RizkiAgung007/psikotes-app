<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryInterpretation;
use App\Models\Module;
use App\Models\Option;
use App\Models\UserAnswer;
use App\Models\UserTest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserTestController extends Controller
{
    /**
     * Menampilkan User
     */
    public function index()
    {
        $userId = Auth::id();

        // Mengambil soal dari modul sesuai dengan user dimana sudah selesai
        $modules = Module::withCount('questions')
                ->with(['userTests' => function ($q) use ($userId) {
                    $q->where('user_id', $userId)->latest();
                }])->get()->map(function ($module) {
                    $module->is_done = $module->userTests->whereNotNull('finished_at')
                    ->isNotEmpty();
                    return $module;
                });

        return Inertia::render('Dashboard', [
            'modules' => $modules
        ]);
    }

    /**
     * Memulai ujian baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id'
        ]);

        $userId = Auth::id();

        // Mengecek apakah user memiliki sesi test yang belum selesai
        $existingTest = UserTest::where('user_id', $userId)
                            ->where('module_id', $request->module_id)
                            ->whereNull('finished_at')->first();

        if ($existingTest) {
            return redirect()->route('exam.show', $existingTest->id);
        }

        // Jika user tidak memiliki sesi yang belum dimulai
        $newTest = UserTest::create([
            'user_id'    => $userId,
            'module_id'  => $request->module_id,
            'started_at' => now()
        ]);

        return redirect()->route('exam.show', $newTest->id);
    }

    /**
     * Menampilkan halaman ujian
     */
    public function show($id)
    {
        // Mengambil data tes modul dan soal"nya
        $test = UserTest::with(['module.questions' => function ($q) {
            $q->orderBy('order', 'asc')->with('options');
        }])
        ->where('user_id', Auth::id())
        ->findOrFail($id);

        // Jika sudah selesai redirect ke halaman hasil
        if ($test->finished_at) {
            return redirect()->route('exam.result', $test->id)
                            ->with('message', 'Tes ini sudah selesai');
        }

        $startedAt = Carbon::parse($test->started_at);
        $timeLimitMinutes = $test->module->time_limit ?? 10; // Waktu diambil dari modul
        $deadline = $startedAt->copy()->addMinute($timeLimitMinutes);
        $remainingSeconds = now()->diffInSeconds($deadline, false); // Hitung selisih detik antara saat ini dan deadline

        if ($remainingSeconds < 0) {
            $remainingSeconds = 0;
        }

        return Inertia::render('Exam/Show', [
            'test'           => $test,
            'questions'      => $test->module->questions,
            'remaining_time' => (int) $remainingSeconds
        ]);
    }

    /**
     * Submit Jawaban
     */
    public function update(Request $request, $id)
    {
        $test = UserTest::where('user_id', Auth::id())->findOrFail($id);

        // Jika sudah selesai tidak bisa akses lagi
        if ($test->finished_at) {
            return redirect()->route('exam.result', $test->id);
        }

        DB::transaction(function () use ($request, $test) {
            // Simpan jawawaban
            $inputAnswers = $request->input('answers', []);

            if (!empty($inputAnswers) && is_array($inputAnswers)) {
                $optionId = array_keys($inputAnswers);
                $options = Option::whereIn('id', $optionId)->get()->keyBy   ('id');

                foreach ($inputAnswers as $optionId => $score) {
                    if (isset($options[$optionId])) {
                        $option = $options[$optionId];

                        UserAnswer::updateOrCreate(
                            [
                                'user_test_id'  => $test->id,
                                'option_id'     => $optionId
                            ],
                            [
                                'questions_id'   => $option->question_id,
                                'score'         => $score
                            ]
                        );
                    }
                }
            }

            // Mengambil semua opsi yang ada di db untk soal tes ini
            $recordAnswers = UserAnswer::with(['option.category'])
                            ->where('user_test_id', $test->id)->get();

            // Menyiapkan kategori
            $allCategories = Category::all();
            $groupStats = [];

            foreach ($allCategories as $cat) {
                $groupStats[$cat->id] = [
                    'id'    => $cat->id,
                    'name'  => $cat->name,
                    'code'  => $cat->code,
                    'score' => 0
                ];
            }

            // Menhitung score berdasarkan data db
            foreach ($recordAnswers as $ans) {
                if ($ans->option && $ans->option->category) {
                    $catId = $ans->option->category->id;
                    if (isset($groupStats[$catId])) {
                        $groupStats[$catId]['score'] += $ans->score;
                    }
                }
            }

            // Rankking
            $rankedResults = array_values($groupStats);

            // Sorting tertinggi ke terendah
            usort ($rankedResults, function ($a, $b) {
                return $b['score'] <=> $a['score'];
            });

            // Mengambil interpretasi
            foreach ($rankedResults as $index => &$result) {
                $rank = $index + 1;
                $result['rank'] = $rank;

                $interpretation = CategoryInterpretation::where('category_id', $result['id'])
                                    ->where('rank', $rank)->first();

                $result['description'] = $interpretation
                                            ? $interpretation->description
                                            : "Belum ada penjelasan untuk rank ini.";
            }

            $test->update([
                'finished_at'   => now(),
                'result'        => json_encode($rankedResults)
            ]);
        });

        return redirect()->route('exam.result', $test->id)->with('message', 'Tes berhasil dikumpulkan.');
    }

    /**
     * Menampilkan result test
     */
    public function result($id)
    {
        $test = UserTest::with('module')->where('user_id', Auth::id())->findOrFail($id);

        // Jika belum selesai lempar ke test
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
     * Menampilkan history user
     */
    public function history()
    {
        $histories = UserTest::with('module')->where('user_id', Auth::id())
                    ->whereNotNull('finished_at')
                    ->latest()->get();

        return Inertia::render('History', [
            'histories' => $histories
        ]);
    }
}

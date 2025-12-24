<?php

namespace App\Http\Controllers;

use App\Models\CategoryInterpretation;
use App\Models\Module;
use App\Models\Option;
use App\Models\UserAnswer;
use App\Models\UserTest;
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
                    $module->is_done = $module->userTests->whereNotNull('finished_at')->isNotEmpty();
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
        $existingTest = UserTest::where('user_id', $userId)->where('module_id', $request->module_id)
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
            return redirect()->route('exam.result', $test->id)->with('message', 'Tes ini sudah selesai');
        }

        return Inertia::render('Exam/Show', [
            'test'      => $test,
            'questions' => $test->module->questions
        ]);
    }

    /**
     * Submit Jawaban
     */
    public function update(Request $request, $id)
    {
        $test = UserTest::where('user_id', Auth::id())->findOrFail($id);

        if ($test->finished_at) {
            return redirect()->route('exam.result', $test->id);
        }

        // Simpan Jawaban
        DB::transaction(function () use ($request, $test) {
            foreach ($request->answers as $optionId => $score) {
                $option = Option::find($optionId);

                if ($option) {
                    UserAnswer::create([
                        'user_test_id'  => $test->id,
                        'questions_id'   => $option->question_id,
                        'option_id'     => $optionId,
                        'score'         => $score,
                    ]);
                }
            }

            $answers = UserAnswer::with(['option.category'])->where('user_test_id', $test->id)->get();

            $groupStats = [];

            foreach ($answers as $ans) {
                if ($ans->option && $ans->option->category) {
                    $catId = $ans->option->category->id;
                    $catName = $ans->option->category->name;
                    $catCode = $ans->option->category->code;

                    if (!isset($groupedStats[$catId])) {
                        $groupedStats[$catId] = [
                            'id' => $catId,
                            'name' => $catName,
                            'code' => $catCode,
                            'score' => 0
                        ];
                    }
                    $groupedStats[$catId]['score'] += $ans->score;
                }
            }

            // Ubah ke Array Biasa & Sorting (Ranking)
            $rankedResults = array_values($groupedStats);

            // Urutkan Skor Tertinggi -> Terendah
            usort($rankedResults, function ($a, $b) {
                return $b['score'] <=> $a['score'];
            });

            // Loop hasil ranking, Rank 1 cari penjelasan rank 1, dst.
            foreach ($rankedResults as $index => &$result) {
                $rank = $index + 1;
                $result['rank'] = $rank;

                $interpretation = CategoryInterpretation::where('category_id', $result['id'])
                                    ->where('rank', $rank)
                                    ->first();

                $result['description'] = $interpretation ? $interpretation->description : "Belum ada penjelasan untuk peringkat ini.";
            }

            $test->update([
                'finished_at' => now(),
                'result'      => json_encode($rankedResults) 
            ]);
        });

        return redirect()->route('exam.result', $test->id)->with('message', 'Tes berhasil dikumpulkan');
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
}

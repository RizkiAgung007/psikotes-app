<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Module;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    // Menampilkan soal
    public function index()
    {
        $questions = Question::with(['options.category', 'module'])->orderBy('module_id', 'asc')
                    ->orderBy('order', 'asc')->get();

        return Inertia::render('Admin/Questions/Index', [
            'questions' => $questions
        ]);
    }

    // Membuat soal baru
    public function create()
    {
        $categories = Category::all();
        $modules = Module::all();

        return Inertia::render('Admin/Questions/Create', [
            'categories' => $categories,
            'modules' => $modules
        ]);
    }

    // Simpan ke d/b
    public function store(Request $request)
    {
        $request->validate([
            'module_id'             => 'required|exists:modules,id',
            'question_text'         => 'required|string',
            'options'               => 'required|array|min:2',
            'options.*.text'        => 'required|string',
            'options.*.category_id' => 'required|exists:categories,id',
        ]);

        // Simpan soall
        $question = Question::create([
            'module_id'     => $request->module_id,
            'question_text' => $request->question_text,
            'order'         => Question::count() + 1
        ]);

        // Simpan opsi lainnya
        foreach ($request->options as $opt) {
            $question->options()->create([
                'option_text' => $opt['text'],
                'category_id' => $opt['category_id']
            ]);
        }

        // Simpan dan Tambah
        if ($request->action === 'save_and_create_another') {
            return redirect()->route('admin.questions.create')
                        ->with('success', 'Soal disimpan, input berikutnya')
                        ->with('last_module_at', $request->module_id);
        }

        return redirect()->route('admin.questions.index')->with('success', 'Soal berhasil dbuat');
    }

    // Mengedit Soal
    public function edit(Question $question)
    {
        $question->load('options');
        $categories = Category::all();
        $modules = Module::all();

        return Inertia::render('Admin/Questions/Edit', [
            'question'  => $question,
            'categories'=> $categories,
            'modules'   => $modules
        ]);
    }

    // Simpan Update
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'module_id'             => 'required|exists:module,id',
            'question_text'         => 'required|string',
            'options'               => 'required|array|min:2',
            'options.*.text'        => 'required|string',
            'options.*.category_id' => 'required|exists:categories,id',
        ]);

        $question->update([
            'module_id'     => $request->module_id,
            'question_text' => $request->question_text
        ]);

        // Hapus semua opsi yang lama
        $question->options()->delete();

        // Masukkan Opsi Baru (Looping)
        foreach ($request->options as $opt) {
            $question->options()->create([
                'option_text' => $opt['text'],
                'category_id' => $opt['category_id'],
            ]);
        }

        return redirect()->route('admin.questions.index')->with('success', 'Soal berhasil diperbarui');
    }

    // Hapus Soal
    public function destroy(Question $question)
    {
        $question->delete();

        return redirect()->back();
    }
}

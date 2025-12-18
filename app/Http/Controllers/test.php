<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    // 1. Menampilkan Daftar Soal (Dashboard Admin)
    public function index()
    {
        // Ambil soal beserta opsinya
        $questions = Question::with(['options.category'])->orderBy('order')->get();

        return Inertia::render('Admin/Questions/Index', [
            'questions' => $questions
        ]);
    }

    // 1. Update fungsi Create (Kirim data modules ke React)
    public function create()
    {
        $categories = Category::all();
        $modules = Module::all(); // Ambil semua modul

        return Inertia::render('Admin/Questions/Create', [
            'categories' => $categories,
            'modules' => $modules // Kirim ke Frontend
        ]);
    }

    public function store(Request $request)
    {
        // ... (Validasi tetap sama seperti sebelumnya) ...
        $request->validate([
            'module_id'     => 'required|exists:modules,id',
            'question_text' => 'required|string',
            'options'       => 'required|array|min:2',
            'options.*.text'=> 'required|string',
            'options.*.category_id' => 'required|exists:categories,id',
        ]);

        // Simpan Soal
        $question = Question::create([
            'module_id'     => $request->module_id,
            'question_text' => $request->question_text,
            'order'         => Question::count() + 1,
        ]);

        // Simpan Opsi
        foreach ($request->options as $opt) {
            $question->options()->create([
                'option_text' => $opt['text'],
                'category_id' => $opt['category_id'],
            ]);
        }

        // --- LOGIKA BARU DI SINI ---

        // Jika user klik tombol "Simpan & Tambah Lagi"
        if ($request->action === 'save_and_create_another') {
            // Redirect kembali ke halaman create, tapi bawa pesan sukses
            return redirect()->route('admin.questions.create')
                ->with('success', 'Soal disimpan. Silakan input soal berikutnya!')
                // Kita kirim balik ID modul biar user gak capek milih lagi
                ->with('last_module_id', $request->module_id);
        }

        // Jika user klik tombol biasa
        return redirect()->route('admin.questions.index')->with('success', 'Soal berhasil dibuat!');
    }

    public function edit(Question $question)
    {
        // Ambil Opsi-opsinya juga biar form tidak kosong
        $question->load('options');

        $categories = Category::all();
        $modules = Module::all();

        return Inertia::render('Admin/Questions/Edit', [
            'question' => $question,
            'categories' => $categories,
            'modules' => $modules
        ]);
    }

    // 2. FUNGSI UPDATE: Menyimpan perubahan
    public function update(Request $request, Question $question)
    {
        // Validasi sama seperti Store
        $request->validate([
            'module_id'     => 'required|exists:modules,id',
            'question_text' => 'required|string',
            'options'       => 'required|array|min:2',
            'options.*.text'=> 'required|string',
            'options.*.category_id' => 'required|exists:categories,id',
        ]);

        // 1. Update Data Soal Utama
        $question->update([
            'module_id'     => $request->module_id,
            'question_text' => $request->question_text,
        ]);

        // 2. STRATEGI RESET OPSI (Hapus lama, buat baru)
        // Ini solusi paling aman untuk menangani perubahan urutan/jumlah opsi
        $question->options()->delete();

        // 3. Buat ulang opsi sesuai inputan baru
        foreach ($request->options as $opt) {
            $question->options()->create([
                'option_text' => $opt['text'],
                'category_id' => $opt['category_id'],
            ]);
        }

        return redirect()->route('admin.questions.index')
            ->with('success', 'Soal berhasil diperbarui!');
    }

    // 6. Hapus Soal
    public function destroy(Question $question)
    {
        $question->delete(); // Opsi otomatis terhapus karena settingan database 'cascade'
        return redirect()->back();
    }
}

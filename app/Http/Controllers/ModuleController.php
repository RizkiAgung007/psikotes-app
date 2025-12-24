<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
    /**
     * Menampilkan semua modul
     */
    public function index()
    {
        return Inertia::render('Admin/Modules/Index', [
            'modules' => Module::latest()->get()
        ]);
    }

    /**
     * Menyimpan modul baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255|unique:modules,name',
        ]);

        Module::create([
            'name' => $request->name
        ]);

        return redirect()->back()->with('message', 'Modul berhasil dibuat.');
    }

    /**
     * Melihat isi dari modul
     */
    public function show($id)
    {
        $module = Module::with(['questions' => function ($q) {
            $q->orderBy('order', 'asc');
        }, 'questions.options.category'])->findOrFail($id);

        return Inertia::render('Admin/Modules/Show', [
            'module' => $module
        ]);
    }

    /**
     * Menampilkan Kamus Interpretasi
     */
    public function detail($id)
    {
        $module = Module::with(['categories.interpretations' => function($q) {
            $q->orderBy('rank', 'asc');
        }])->findOrFail($id);

        return Inertia::render('Admin/Modules/Detail', [
            'module' => $module
        ]);
    }

    /**
     * Memperbarui modul
     */
    public function update(Request $request, Module $module)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:modules,name' . $module->id
        ]);

        $module->update([
            'name' => $request->name
        ]);

        return redirect()->back()->with('message', 'Modul berhasil diperbarui.');
    }

    /**
     * Menghapus modul
     */
    public function destroy(Module $module)
    {
        $module->delete();
        return redirect()->back()->with('message', 'Modul berhasil dihapus.');
    }
}

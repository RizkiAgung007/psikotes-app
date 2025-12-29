<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
            'name'          => 'required|string|max:255|unique:modules,name',
            'description'   => 'nullable|string',
            'time_limit'    => 'required|integer|min:1'
        ]);

        Module::create([
            'name'          => $request->name,
            'description'   => $request->description,
            'time_limit'    => $request->time_limit,
            'is_active'     => true
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
            'name'          => ['required', 'string', 'max:255', Rule::unique('modules', 'name')->ignore($module->id)],
            'description'   => 'nullable|string',
            'time_limit'    => 'required|integer|min:1'
        ]);

        $module->update([
            'name'          => $request->name,
            'description'   => $request->description,
            'time_limit'    => $request->time_limit
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

    /**
     * Tombol kunci modul
     */
    public function padlock($id)
    {
        $module = Module::findOrFail($id);

        $module->is_active = !$module->is_active;

        $module->save();

        return back()->with('message', 'Status modul berhasil dirubah');
    }
}

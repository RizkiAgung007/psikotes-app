<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Menampilkan semua kategori
     */
    public function index()
    {
        $categories = Category::latest()->get();

        $modules = Module::all();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'modules'    => $modules
        ]);
    }

    /**
     * Mengirim kategori baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:categories,code',
            'module_id' => 'required|exists:modules,id',
        ]);

        Category::create([
            'name'      => $request->name,
            'code'      => $request->code,
            'module_id' => $request->module_id,
        ]);

        return redirect()->back()->with('message', 'Kategori berhasil ditambahkan');
    }

    /**
     * Menampilkan detail kategori
     */
    public function show(Category $category)
    {
        $category->load(['module', 'interpretation' => function ($q) {
            $q->orderBy('rank', 'asc');
        }]);

        return Inertia::render('Admin/categories/Show', [
            'category' => $category
        ]);
    }

    /**
     * Mengedit kategori
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'code'      => 'required|string|max:10|unique:categories,code,' . $category->id,
            'module_id' => 'required|exists:modules,id',
        ]);

        $category->update($request->all());

        return redirect()->back()->with('message', 'Kategori berhasil diedit.');
    }

    /**
     * Mengapus kategori
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->back()->with('message', 'Kategori dihapus');
    }

    /**
     * Edit deskripsi skala
     */
    public function editInterpretations(Category $category)
    {
        $category->load('interpretations');

        $totalRanks = Category::where('module_id', $category->module_id)->count();

        return Inertia::render('Admin/Categories/Interpretations', [
            'category'  => $category,
            'totalRanks'=> $totalRanks,
            'existing'  => $category->interpretations
        ]);
    }

    /**
     * Simpan data ke DB
     */
    public function updateInterpretations(Request $request, Category $category)
    {
        $request->validate([
            'interpretations'                 => 'required|array',
            'interpretations.*.rank'          => 'required|integer',
            'interpretations.*.description'   => 'required|string'
        ]);

        foreach($request->interpretations as $data) {
            $category->interpretations()->updateOrCreate(
                ['rank'        => $data['rank']],
                ['description'  => $data['description']]
            );
        }

        return redirect()->route('admin.categories.index')->with('message', 'Penjelasan kategori berhasil disimpan');
    }
}

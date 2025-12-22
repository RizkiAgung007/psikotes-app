<?php

namespace App\Http\Controllers;

use App\Models\Category;
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

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Mengirim kategori baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:categories,code'
        ]);

        Category::create([
            'name' => $request->name,
            'code' => $request->code
        ]);

        return redirect()->back()->with('message', 'Kategori berhasil ditambahkan');
    }

    /**
     * Mengedit kategori
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:categories,code,' . $category->id
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
                ['ranks'        => $data['rank']],
                ['description'  => $data['description']]
            );
        }

        return redirect()->route('admin.categories.index')->with('message', 'Penjelasan kategori berhasil disimpan');
    }
}

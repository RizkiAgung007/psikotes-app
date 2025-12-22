// ... method index, store, update, destroy yang lama ...

    // 1. TAMPILKAN HALAMAN INPUT PENJELASAN
    public function editInterpretations(Category $category)
    {
        // Load interpretasi yang sudah ada (jika pernah diisi sebelumnya)
        $category->load('interpretations');

        // Hitung total kategori dalam modul yang sama
        // Ini untuk menentukan kita butuh input Rank 1 sampai berapa?
        $totalRanks = Category::where('module_id', $category->module_id)->count();

        return Inertia::render('Admin/Categories/Interpretations', [
            'category'   => $category,
            'totalRanks' => $totalRanks, // Kirim jumlah rank ke React (misal: 4)
            'existing'   => $category->interpretations // Kirim data lama buat di-edit
        ]);
    }

    // 2. SIMPAN DATA KE DATABASE
    public function updateInterpretations(Request $request, Category $category)
    {
        // Validasi: interpretations harus array
        $request->validate([
            'interpretations' => 'required|array',
            'interpretations.*.rank' => 'required|integer',
            'interpretations.*.description' => 'required|string',
        ]);

        // Kita gunakan Transaction biar aman
        // Hapus yang lama, simpan yang baru (atau update one-by-one)
        // Cara paling mudah: Loop data dari form

        foreach ($request->interpretations as $data) {
            // Update atau Create berdasarkan (category_id & rank)
            $category->interpretations()->updateOrCreate(
                ['rank' => $data['rank']], // Kunci pencarian
                ['description' => $data['description']] // Data yang diupdate
            );
        }

        return redirect()->route('admin.categories.index')
                         ->with('message', 'Penjelasan kategori berhasil disimpan');
    }

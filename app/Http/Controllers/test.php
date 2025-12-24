<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UserTest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestResultController extends Controller
{
    /**
     * Menampilkan daftar semua hasil tes peserta
     */
    public function index()
    {
        // Ambil data tes yang sudah selesai (finished_at tidak null)
        // Load juga data user (nama) dan module (nama tes)
        $results = UserTest::with(['user', 'module'])
            ->whereNotNull('finished_at')
            ->latest()
            ->paginate(10); // Kita batasi 10 per halaman biar rapi

        return Inertia::render('Admin/TestResults/Index', [
            'results' => $results
        ]);
    }

    /**
     * Menampilkan detail hasil tes satu peserta
     */
    public function show($id)
    {
        // Cari data tes berdasarkan ID
        $testResult = UserTest::with(['user', 'module'])->findOrFail($id);

        return Inertia::render('Admin/TestResults/Show', [
            'testResult' => $testResult
        ]);
    }
}

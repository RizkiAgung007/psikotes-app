<?php

namespace App\Http\Controllers;

use App\Models\UserTest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestResultController extends Controller
{
    use HasFactory;

    /**
     * Menampilkan semua daftar hasil tes user
     */
    public function index()
    {
        $results = UserTest::with(['user', 'module'])->whereNotNull('finished_at')->latest()->paginate(10);

        return Inertia::render('Admin/Results/Index', [
            'results' => $results
        ]);
    }

    /**
     * Menampilkan detail hasil tes user
     */
    public function show($id)
    {
        $testResult = UserTest::with(['user', 'module'])->findOrFail($id);

        return Inertia::render('Admin/Results/Show', [
            'testResult' => $testResult
        ]);
    }

    /**
     * Mereset hasil tes dengan soft delete
     */
    public function destroy($id)
    {
        $testResult = UserTest::findOrFail($id);

        $testResult->delete();

        return redirect()->back()->with('message', 'Hasil tes berhasil direset');
    }
}

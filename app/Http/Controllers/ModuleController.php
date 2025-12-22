<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
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
}

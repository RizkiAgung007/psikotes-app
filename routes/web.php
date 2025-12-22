<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserTestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [UserTestController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:user'])
    ->name('dashboard');

Route::post('/exam/start', [UserTestController::class, 'store'])->name('exam.start');
Route::get('/exam/{id}', [UserTestController::class, 'show'])->name('exam.show');
Route::post('/exam/{id}/submit', [UserTestController::class, 'update'])->name('exam.submit');
Route::get('/exam/{id}/result', [UserTestController::class, 'result'])->name('exam.result');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('questions', QuestionController::class);
    Route::resource('modules', ModuleController::class);
    Route::resource('categories', CategoryController::class);
    Route::get('categories/{category}/interpretations', [CategoryController::class, 'editInterpretations'])->name('admin.categories.interpretations');
    Route::post('categories/{category}/interpretations', [CategoryController::class, 'updateInterpretations'])->name('admin.categories.interpretations.update');
});



require __DIR__.'/auth.php';

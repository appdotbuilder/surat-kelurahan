<?php

use App\Http\Controllers\GeneratedLetterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LetterTemplateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with letter management dashboard
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Letter Template routes
    Route::resource('letter-templates', LetterTemplateController::class);
    
    // Generated Letter routes
    Route::resource('generated-letters', GeneratedLetterController::class)
        ->only(['index', 'create', 'store', 'show', 'destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

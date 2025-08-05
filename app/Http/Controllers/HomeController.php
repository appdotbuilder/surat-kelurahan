<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GeneratedLetter;
use App\Models\LetterTemplate;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with letter management dashboard.
     */
    public function index()
    {
        $templates = LetterTemplate::active()->latest()->limit(6)->get();
        $recentLetters = GeneratedLetter::with(['letterTemplate'])
            ->latest()
            ->limit(5)
            ->get();
        
        $stats = [
            'total_templates' => LetterTemplate::active()->count(),
            'total_letters' => GeneratedLetter::count(),
            'letters_this_month' => GeneratedLetter::whereMonth('created_at', date('m'))
                ->whereYear('created_at', date('Y'))
                ->count(),
        ];
        
        return Inertia::render('welcome', [
            'templates' => $templates,
            'recentLetters' => $recentLetters,
            'stats' => $stats,
        ]);
    }
}
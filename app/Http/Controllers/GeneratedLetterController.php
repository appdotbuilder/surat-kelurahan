<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenerateLetterRequest;
use App\Models\GeneratedLetter;
use App\Models\LetterTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeneratedLetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $letters = GeneratedLetter::with(['letterTemplate', 'user'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('generated-letters/index', [
            'letters' => $letters
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $templates = LetterTemplate::active()->get();
        
        return Inertia::render('generated-letters/create', [
            'templates' => $templates
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GenerateLetterRequest $request)
    {
        $template = LetterTemplate::findOrFail($request->template_id);
        
        // Generate letter number
        $letterNumber = $this->generateLetterNumber();
        
        // Replace placeholders in template content
        $content = $template->content;
        foreach ($request->form_data as $key => $value) {
            $content = str_replace("{{" . $key . "}}", $value, $content);
        }
        
        $letter = GeneratedLetter::create([
            'user_id' => auth()->id(),
            'letter_template_id' => $template->id,
            'letter_number' => $letterNumber,
            'form_data' => $request->form_data,
            'generated_content' => $content,
            'generated_at' => now(),
        ]);

        return redirect()->route('generated-letters.show', $letter)
            ->with('success', 'Surat berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(GeneratedLetter $generatedLetter)
    {
        $generatedLetter->load(['letterTemplate', 'user']);
        
        return Inertia::render('generated-letters/show', [
            'letter' => $generatedLetter
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GeneratedLetter $generatedLetter)
    {
        $generatedLetter->delete();

        return redirect()->route('generated-letters.index')
            ->with('success', 'Surat berhasil dihapus.');
    }

    /**
     * Generate a unique letter number.
     */
    protected function generateLetterNumber(): string
    {
        $year = date('Y');
        $month = date('m');
        $count = GeneratedLetter::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count() + 1;
        
        return sprintf('%03d/KEL/%s/%s', $count, $month, $year);
    }
}
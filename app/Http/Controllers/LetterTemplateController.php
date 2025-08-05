<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLetterTemplateRequest;
use App\Http\Requests\UpdateLetterTemplateRequest;
use App\Models\LetterTemplate;
use Inertia\Inertia;

class LetterTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = LetterTemplate::latest()->paginate(10);
        
        return Inertia::render('letter-templates/index', [
            'templates' => $templates
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('letter-templates/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLetterTemplateRequest $request)
    {
        $template = LetterTemplate::create($request->validated());

        return redirect()->route('letter-templates.show', $template)
            ->with('success', 'Template surat berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(LetterTemplate $letterTemplate)
    {
        return Inertia::render('letter-templates/show', [
            'template' => $letterTemplate
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LetterTemplate $letterTemplate)
    {
        return Inertia::render('letter-templates/edit', [
            'template' => $letterTemplate
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLetterTemplateRequest $request, LetterTemplate $letterTemplate)
    {
        $letterTemplate->update($request->validated());

        return redirect()->route('letter-templates.show', $letterTemplate)
            ->with('success', 'Template surat berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LetterTemplate $letterTemplate)
    {
        $letterTemplate->delete();

        return redirect()->route('letter-templates.index')
            ->with('success', 'Template surat berhasil dihapus.');
    }
}
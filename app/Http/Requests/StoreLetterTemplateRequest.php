<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLetterTemplateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:letter_templates,slug',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'required_fields' => 'required|array',
            'required_fields.*' => 'required|string',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama template surat wajib diisi.',
            'slug.required' => 'Slug template wajib diisi.',
            'slug.unique' => 'Slug ini sudah digunakan.',
            'content.required' => 'Konten surat wajib diisi.',
            'required_fields.required' => 'Field yang diperlukan wajib diisi.',
        ];
    }
}
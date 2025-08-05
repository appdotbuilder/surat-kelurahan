<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\LetterTemplate
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string $content
 * @property array $required_fields
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GeneratedLetter> $generatedLetters
 * @property-read int|null $generated_letters_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereRequiredFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate active()
 * @method static \Database\Factories\LetterTemplateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LetterTemplate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'content',
        'required_fields',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'required_fields' => 'array',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all generated letters for this template.
     */
    public function generatedLetters(): HasMany
    {
        return $this->hasMany(GeneratedLetter::class);
    }

    /**
     * Scope a query to only include active templates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
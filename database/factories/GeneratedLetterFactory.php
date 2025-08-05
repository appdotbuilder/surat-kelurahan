<?php

namespace Database\Factories;

use App\Models\GeneratedLetter;
use App\Models\LetterTemplate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GeneratedLetter>
 */
class GeneratedLetterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\GeneratedLetter>
     */
    protected $model = GeneratedLetter::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'letter_template_id' => LetterTemplate::factory(),
            'letter_number' => $this->faker->unique()->numerify('###/KEL/##/####'),
            'form_data' => [
                'nama' => $this->faker->name(),
                'alamat' => $this->faker->address(),
                'tanggal' => $this->faker->date(),
            ],
            'generated_content' => $this->faker->paragraphs(5, true),
            'generated_at' => now(),
        ];
    }
}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('generated_letters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('letter_template_id')->constrained()->onDelete('cascade');
            $table->string('letter_number')->unique();
            $table->json('form_data');
            $table->text('generated_content');
            $table->timestamp('generated_at');
            $table->timestamps();
            
            $table->index('letter_number');
            $table->index('user_id');
            $table->index('letter_template_id');
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generated_letters');
    }
};
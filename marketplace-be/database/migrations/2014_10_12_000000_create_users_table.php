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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['Customer', 'Mitra', 'Admin']);
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
            $table->string('CompanyCode', 0)->nullable();
            $table->integer('Status')->default(1);
            $table->integer('IsDeleted')->default(1);
            $table->string('CreatedBy', 32)->nullable();
            $table->timestamp('CreatedDate')->useCurrent();
            $table->string('LastUpdatedBy', 32)->nullable();
            $table->timestamp('LastUpdatedDate')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

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
        Schema::create('users_address', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('street');
            $table->string('RT');
            $table->string('RW');
            $table->string('village');
            $table->string('district');
            $table->string('city');
            $table->string('province');
            $table->string('nation');
            $table->string('postal_code');
            $table->string('additional_info')->nullable();
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
        Schema::dropIfExists('users_address');
    }
};

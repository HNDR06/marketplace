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
        Schema::create('user_address', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user')->nullable()->index('fk_user_address_to_user');
            $table->string('full_address')->nullable();
            $table->string('desa')->nullable();
            $table->string('kota')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('negara')->nullable();
            $table->string('kode_pos')->nullable();
            $table->string('CompanyCode', 0)->nullable();
            $table->integer('Status')->default(1);
            $table->integer('IsDeleted')->default(0);
            $table->string('CreatedBy', 32)->nullable();
            $table->timestamp('CreatedDate')->useCurrent();
            $table->string('LastUpdatedBy', 32)->nullable();
            $table->timestamp('LastUpdatedDate')->useCurrent();
            $table->foreign('id_user', 'fk_user_address_to_user')->references('id_user')->on('user')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_address');
    }
};

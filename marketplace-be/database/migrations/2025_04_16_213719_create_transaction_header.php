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
        Schema::create('transaction_header', function (Blueprint $table) {
            $table->id();
            $table->integer('invoice_no')->nullable();
            $table->integer('user_id')->nullable()->index('fk_invoice_header_to_user');
            $table->integer('method_payment')->nullable();
            $table->integer('ongkir')->nullable();
            $table->integer('total_harga')->nullable();
            $table->integer('total_item')->nullable();
            $table->integer('total_berat')->nullable();
            $table->integer('diskon')->nullable();
            $table->integer('pajak')->nullable();
            $table->string('CompanyCode', 0)->nullable();
            $table->integer('Status')->default(1);
            $table->integer('IsDeleted')->default(0);
            $table->string('CreatedBy', 32)->nullable();
            $table->timestamp('CreatedDate')->useCurrent();
            $table->string('LastUpdatedBy', 32)->nullable();
            $table->timestamp('LastUpdatedDate')->useCurrent();
            $table->foreign('user_id', 'fk_invoice_header_to_user')->references('id_user')->on('user')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_header');
    }
};

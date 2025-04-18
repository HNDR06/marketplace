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
        Schema::create('transaction_detail', function (Blueprint $table) {
            $table->id();
            $table->integer('invoice_no')->nullable();
            $table->integer('id_produk')->nullable()->index('fk_transaction_detail_to_product');
            $table->integer('id_user')->nullable()->index('fk_transaction_detail_to_user');
            $table->integer('quantity')->nullable();
            $table->string('nama_penerima')->nullable();
            $table->string('no_telp')->nullable();
            $table->string('alamat')->nullable();
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
            $table->integer('harga_barang')->nullable();
            $table->string('full_address')->nullable();
            $table->string('desa')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kelurahan')->nullable();
            $table->foreign('id_produk', 'fk_transaction_detail_to_product')->references('id_produk')->on('product')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign('id_user', 'fk_transaction_detail_to_user')->references('id_user')->on('user')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_detail');
    }
};

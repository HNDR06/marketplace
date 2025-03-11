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
        Schema::create('user', function (Blueprint $table) {
            $table->tinyInteger('user_id')->autoIncrement();
            $table->string('username');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('role');
            $table->string('status');
            $table->timestamp('created_date')->useCurrent();
            $table->timestamp('last_updated')->useCurrent()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_user');
    }
};

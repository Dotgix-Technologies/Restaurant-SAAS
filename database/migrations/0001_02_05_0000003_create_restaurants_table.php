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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->text('address');
            $table->text('location')->nullable();
            $table->string('DBA')->nullable();
            $table->string('cuisine_type')->default('FastFood');
            $table->enum('restaurant_type', ['OnSite', 'CloudKitchen', 'Hybrid'])->default('OnSite');
            $table->String('license_no')->nullable();
            $table->string('subscription_plan')->default('Free');
            $table->string('logo')->nullable(); // Path to the restaurant logo
            $table->enum('status', ['pending_verification','verified' ,'Approved', 'Active', 'Offline', 'Vacation', 'Deactivated', 'Suspended'])->default('pending_verification');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};

<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

// ... existing code ...

        DB::table('user')->insert([
            [
                'username' => 'user1',
                'email' => 'user1@example.com',
                'password' => bcrypt('password1'),
                'role' => 'User',
                'status' => 'active',
                'created_date' => now(),
                'last_updated' => now()
            ],
            [
                'username' => 'user2',
                'email' => 'user2@example.com',
                'password' => bcrypt('password2'),
                'role' => 'User',
                'status' => 'active',
                'created_date' => now(),
                'last_updated' => now()
            ]
        ]);

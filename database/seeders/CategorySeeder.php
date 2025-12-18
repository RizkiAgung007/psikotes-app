<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['code' => 'V', 'name' => 'Visual'],
            ['code' => 'A', 'name' => 'Auditory'],
            ['code' => 'K', 'name' => 'Kinesthetic'],
            ['code' => 'D', 'name' => 'Digital'],
        ];

        foreach ($data as $item) {
            Category::create($item);
        }
    }
}

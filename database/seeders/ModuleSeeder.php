<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Module::create([
            'name'        => 'Personality Test',
            'description' => 'Tes Kepribadian Dasar (V/A/K/D)'
        ]);

        Module::create([
            'name'        => 'Communication Style',
            'description' => 'Tes Gaya Komunikasi'
        ]);
    }
}

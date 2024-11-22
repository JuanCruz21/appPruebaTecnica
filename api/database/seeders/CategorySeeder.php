<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory()->create([
            'name' => 'Videos',
            'description' => 'Description for Category 1',
        ]);

        Category::factory()->create([
            'name' => 'Peliculas',
            'description' => 'Description for Category 1',
        ]);

        Category::factory()->create([
            'name' => 'Archivos',
            'description' => 'Description for Category 2',
        ]);

        Category::factory()->create([
            'name' => 'Imagenes',
            'description' => 'Description for Category 3',
        ]);
    }
}

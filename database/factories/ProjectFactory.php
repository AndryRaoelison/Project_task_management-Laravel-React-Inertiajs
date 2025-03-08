<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->sentence(),
            "description" => fake()->realText(),
            "due_date" => fake()->dateTimeBetween("now", "+2 year", "Indian/Antananarivo"),
            "start_date" => fake()->dateTimeBetween("now", "+1 month", "Indian/Antananarivo"),
            "status" => fake()->randomElement(["pending", "in_progress", "finished"]),
            "image_path" => fake()->imageUrl(),
            "created_by" => User::factory(),
            "updated_by" => 1,
            "created_at" => time(),
            "updated_at" => time()

        ];
    }
}

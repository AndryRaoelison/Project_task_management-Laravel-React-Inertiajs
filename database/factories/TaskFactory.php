<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
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
            "priority" => fake()->randomElement(["low", "medium", "high"]),
            "image_path" => fake()->imageUrl(),
            "created_by" => User::factory(),
            "assigned_user_id" => User::factory(),
            "updated_by" => 1,
            "created_at" => time(),
            "updated_at" => time()
        ];
    }
}

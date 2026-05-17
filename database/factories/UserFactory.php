<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'username' => fake()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'age' => fake()->numberBetween(18, 40),
            'name' => fake()->name(),
            'bio' => fake()->paragraph(),
            'profile_img' => fake()->imageUrl(200, 200, 'people'),
            'remember_token' => Str::random(10),
        ];
    }
}
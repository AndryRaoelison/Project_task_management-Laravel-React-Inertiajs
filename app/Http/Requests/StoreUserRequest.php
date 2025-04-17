<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "max:255", "string"],
            "email" => ["required", "email", Rule::unique('users', 'email')],
            "password" => [
                Password::min(8)->numbers()->mixedCase()->symbols(),
                "confirmed",
                "required"
            ]
        ];
    }
}
// This will be the password for all instances : 
// 1Password*

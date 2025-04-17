<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
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
            "name" => ["required", "string", "max:255"],
            "description" => ["nullable", "string"],
            "status" => Rule::in(["pending", "in_progress", "finished"]),
            "priority" => Rule::in(["low", "medium", "high"]),
            "due_date" => ["date", "nullable"],
            "start_date" => ["date", "nullable"],
            "assigned_user_id" => Rule::exists("users", "id"),
            "project_id" => Rule::exists("projects", "id")
        ];
    }
}

<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "status" => $this->status,
            "priority" => $this->priority,
            "due_date" => (new Carbon($this->due_date))->format("Y-m-d"),
            "start_date" => (new Carbon($this->start_date))->format("Y-m-d"),
            "created_by" => (new UserResource($this->taskCreatedBy)),
            "updated_by" => new UserResource($this->taskUpdatedBy),
            "assigned_user_id" => new UserResource($this->taskAssignedUser),
            "project" => new ProjectResource($this->project),
            "created_at" => (new Carbon($this->created_at))->format("d-m-y"),
            "updated_at" => (new Carbon($this->updated_at))->format("d-m-y"),
        ];
    }
}

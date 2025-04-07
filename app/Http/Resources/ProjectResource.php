<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "due_date" => (new Carbon($this->due_date))->format("Y-m-d"),
            "start_date" => (new Carbon($this->start_date))->format("Y-m-d"),
            "status" => $this->status,
            "image_path" => $this->image_path,
            "created_by" => new UserResource($this->createdby),
            "updated_by" => new UserResource($this->updatedby),
            "created_at" => (new Carbon($this->created_at))->format("d-m-y"),
            "updated_at" => (new Carbon($this->updated_at))->format("d-m-y"),
        ];
    }
}

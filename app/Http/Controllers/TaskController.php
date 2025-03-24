<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query()->with([
            "taskCreatedBy",
            "taskUpdatedBy",
            "project",
            "taskAssignedUser"
        ]);
        if (request('status')) {
            $query->where('status', 'like', "%" . request('status') . "%");
        }
        if (request('TaskNameInTask')) {
            $query->where('name', 'like', "%" . request('TaskNameInTask') . "%");
        }
        if (request('created_by')) {
            $query->whereHas('taskCreatedBy', function ($q) {
                $q->where('name', 'like', "%" . request('created_by') . "%");
            });
        }
        if (request("ProjectNameInTask")) {
            $query->whereHas('project', function ($q) {
                $q->where('name', 'like', '%' . request('ProjectNameInTask') . '%');
            });
        }
        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', 'desc');
        $tasks = $query->orderBy($sort_field, $sort_direction)
            ->paginate(25)->onEachSide(1);
        return Inertia::render('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}

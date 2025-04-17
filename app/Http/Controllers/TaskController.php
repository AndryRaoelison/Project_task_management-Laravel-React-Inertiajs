<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserCrudResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
        if (request('task_id')) {
            $query->where('id', '=', request('task_id'));
        }
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
            'queryParams' => request()->query() ?: null,
            'success' => session("success")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy("id", "desc")->get();
        $users = User::query()->orderBy("id", "desc")->get();
        return Inertia::render('Tasks/Create', [
            "projects" => ProjectResource::collection($projects)->resolve(),
            "users" => UserCrudResource::collection($users)->resolve(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();
        $name = $request->validated("name");
        Task::create($data);
        return to_route("task.index")->with("success", "Tâche: \"$name\" créée avec succès");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {//
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::query()->orderBy("id", "desc")->get();
        $projects = Project::query()->orderBy("id", "desc")->get();
        return Inertia::render("Tasks/Edit", [
            "task" => new TaskResource($task),
            "users" => UserCrudResource::collection($users)->resolve(),
            "projects" => ProjectResource::collection($projects)->resolve()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $name = $data['name'];
        $data['updated_by'] = Auth::id();
        unset($data['created_by']);
        $task->update($data);
        return to_route("task.index")->with("success", "La tâche : \"$name\" a été modifiée avec succès");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        return to_route("task.index")->with("success", "La tâche : \"$name\" a été supprimée avec succès");
    }

    /**
     * Show the specified resource based on the user logged in.
     */
    public function taskAssignedToUser()
    {
        $user = auth()->user();
        $query = Task::query()->where("assigned_user_id", "like", $user->id)->with('project');
        if (request('task_id')) {
            $query->where('id', '=', request('task_id'));
        }
        if (request('status')) {
            $query->where('status', 'like', "%" . request('status') . "%");
        }
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request('TaskNameInTask')) {
            $query->where('name', 'like', "%" . request('TaskNameInTask') . "%");
        }
        if (request('created_by')) {
            $query->whereHas("taskCreatedBy", function ($q) {
                $q->where("created_by", 'like', "%" . request('created_by') . "%");
            });
        }
        if (request("ProjectNameInTask")) {
            $query->whereHas('project', function ($q) {
                $q->where('name', 'like', '%' . request('ProjectNameInTask') . '%');
            });
        }
        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', 'desc');
        $tasks = $query->orderBy($sort_field, $sort_direction)->paginate(10);
        return Inertia::render("Tasks/MyTasks", [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?? null
        ]);
    }
}

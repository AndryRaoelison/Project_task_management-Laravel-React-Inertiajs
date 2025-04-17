<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query()->with(['createdBy', 'updatedBy']);
        $sort_field = request('sort_field', 'start_date');
        $sort_direction = request('sort_direction', 'desc');
        if (request('task_id')) {
            $query->where('id', '=', request('task_id'));
        }
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request('status'));
        }
        if (request('created_by')) {
            $query->whereHas('createdBy', function ($q) {
                $q->where('name', 'like', '%' . request('created_by') . '%');
            });
        }
        $projects = $query->orderBy($sort_field, $sort_direction)->paginate(20)->onEachSide(1);

        return inertia('Projects/Index', [
            "projects" => ProjectResource::collection($projects),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $project = $request->validated();
        $project['created_by'] = Auth::id();
        $project['updated_by'] = Auth::id();
        Project::create($project);
        return to_route('project.index')->with('success', 'Projet crée avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $queryParams = request()->query();
        $query = $project->tasks()->with([
            "taskCreatedBy",
            "taskUpdatedBy",
            "project",
            "taskAssignedUser"
        ]);

        if (request('status')) {
            $query->where('status', 'like', "%" . request('status') . "%");
        }
        if (request('name')) {
            $query->where('name', 'like', "%" . request('name') . "%");
        }
        if (request('created_by')) {
            $query->whereHas('taskCreatedBy', function ($q) {
                $q->where('name', 'like', "%" . request('created_by') . "%");
            });
        }
        $sort_field = request('sort_field', 'id');
        $sort_direction = request('sort_direction', 'desc');
        $tasks = $query->orderBy($sort_field, $sort_direction)
            ->paginate(25)->onEachSide(1);
        return inertia('Projects/Show', [
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => $queryParams ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render("Projects/Edit", [
            "project" => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $name = $project->name;
        $project_id = $project->id;
        $project->update($request->validated());
        return to_route("project.index")->with("success", "Le projet :  \"$project_id-$name\" a bien été modifié");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $project_id = $project->id;
        $project->delete();
        return to_route("project.index")->with("success", "Le projet :  \"$project_id-$name\" a bien été supprimé");
    }
}

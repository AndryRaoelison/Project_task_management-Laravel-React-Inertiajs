<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardContoller extends Controller
{
    public function index()
    {

        $sort_field = request("sort_field", "id");
        $sort_direction = request("sort_direction", "desc");
        // dahsboard statistics 
        $pendingTask = Task::where("status", "like", "pending")->count();
        $in_progressTask = Task::where("status", "like", "in_progress")->count();
        $pendingProject = Project::where("status", "like", "pending")->count();
        $in_progressProject = Project::where("status", "like", "in_progress")->count();
        //data handling : 
        $tasksQuery = Task::query()->whereIn("status", ["in_progress", "pending"])->with("project");
        if (request("project_name")) {
            $tasksQuery->whereHas('project', function ($q) {
                $q->where("name", "like", "%" . request("project_name") . "%");
            });
        }
        if (request("task_name")) {
            $tasksQuery->where("name", "like", "%" . request("task_name") . "%");
        }
        if (request("task_status")) {
            $tasksQuery->where("status", "like", "%" . request("task_status") . "%");
        }
        $tasks = $tasksQuery->orderBy($sort_field, $sort_direction)->paginate(21)->onEachSide(1);
        return inertia('Dashboard', [
            "pendingTask" => $pendingTask,
            "in_progressTask" => $in_progressTask,
            "pendingProject" => $pendingProject,
            "in_progressProject" => $in_progressProject,
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?? null
        ]);
    }
}

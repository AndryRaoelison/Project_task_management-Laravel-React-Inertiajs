<?php

use App\Http\Controllers\DashboardContoller;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

// ----Project/task/user management ----
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardContoller::class, 'index'])
        ->name('dashboard');
    Route::resource('project', ProjectController::class);
    Route::get('/my-tasks', [TaskController::class, "taskAssignedToUser"])
        ->name("task.myTasks");
    Route::resource('task', TaskController::class);
    Route::resource('user', UserController::class)->except('show');
});


// ----Profile management ----
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCrudResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $queryParams = request()->query();
        $query = User::query();
        if (request("name")) {
            $query = $query->where('name', 'like', '%' . request("name") . '%');
        }
        if (request("email")) {
            $query = $query->where('email', 'like', '%' . request("email") . '%');
        }
        $sort_field = request('sort_field', 'id');
        $sort_direction = request('sort_direction', 'desc');
        $users = $query->orderBy($sort_field, $sort_direction)->paginate(25)->onEachSide(1);
        return Inertia::render('Users/Index', [
            'users' => UserCrudResource::collection($users),
            "queryParams" => $queryParams ?? null,
            "success" => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $name = $data["name"];
        $data['email_verified_at'] = now();
        $data["password"] = Hash::make($data['password']);
        User::create($data);
        return to_route('user.index')->with("success", "L'utilisateur \"$name a bien été crée");
    }

    /**
     * Display the specified resource.
     */


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', ["user" => $user]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $name = $data["name"];
        $data['email_verified_at'] = now();
        if (!empty($data["password"])) {
            $data["password"] = Hash::make($data['password']);
        } else {
            unset($data["password"]);

        }
        if ($user->email !== $data['email']) {
            $data['email_verified_at'] = null;
        } else {
            unset($data['email_verified_at']);
        }
        $user->update($data);
        return to_route('user.index')->with("success", "L'utilisateur \"$name a bien été modifié");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();
        return to_route('project.index')->with("success", "L'utilisateur \"$name a bien été supprimé(e)");
    }
}

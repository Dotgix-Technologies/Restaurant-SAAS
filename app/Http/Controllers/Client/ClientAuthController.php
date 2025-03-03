<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Auth\LoginRequest;

class ClientAuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Client/Auth/Login');
    }
    public function login(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        return redirect()->intended(route('SuperAdmin.dashboard', absolute: false));
    }
}

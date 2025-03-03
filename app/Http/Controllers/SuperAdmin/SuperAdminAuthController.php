<?php

namespace App\Http\Controllers\SuperAdmin;

use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;

class SuperAdminAuthController extends Controller
{
    public function showLoginForm()
    {

        return Inertia::render('SuperAdmin/Auth/Login');
    }
    public function login(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        return redirect()->intended(route('SuperAdmin.dashboard', absolute: false));
    }
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();


        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('SuperAdmin.login');
    }
}

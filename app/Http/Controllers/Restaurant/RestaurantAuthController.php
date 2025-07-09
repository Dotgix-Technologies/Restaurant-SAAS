<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Auth\LoginRequest;

class RestaurantAuthController extends Controller
{
    public function showLoginForm(): Response
    {
        return Inertia::render('Restaurant/Auth/Login');
    }
    public function login(LoginRequest $request): RedirectResponse
    {
     
        $request->authenticate();

        $request->session()->regenerate();
        return redirect()->intended(route('restaurant.dashboard', absolute: false));
    }
public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('restaurant.login');
    }
}

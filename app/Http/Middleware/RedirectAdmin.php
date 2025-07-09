<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $guard = null): Response
    {
        if (Auth::guard($guard)->check() && Auth::user()->role == 'SuperAdmin') {

            if (!$request->is('SuperAdmin/*')) {

                return redirect()->route('SuperAdmin.dashboard');
            }
        }
        if (Auth::guard($guard)->check() && Auth::user()->role == 'Client') {

            if (!$request->is('Client/*')) {

                return redirect()->route('Client.dashboard');
            }
        }
        if (Auth::guard($guard)->check() && Auth::user()->role == 'Restaurant') {

            if (!$request->is('Restaurant/*')) {

                return redirect()->route('restaurant.dashboard');
            }
        }
        if (Auth::guard($guard)->check() && Auth::user()->role == 'SuperConsultant') {

            if (!$request->is('SuperConsultant/*')) {

                return redirect()->route('SuperConsultant.dashboard');
            }
        }
        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class Adminmiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        Log::info('Admin middleware accessed by user: ' . (auth()->check() ? auth()->user()->name : 'Guest'));
        if(!auth()->check()){
            Log::warning('Unauthorized access attempt to admin middleware by unauthenticated user.');
            return redirect('SuperAdmin/login')->with('error', 'You must be logged in to access this page.');
        }
        if ( auth()->user()->role == 'SuperAdmin') {
              Log::info('Admin middleware accessed by user: ' . auth()->user()->name);
            return $next($request); 
        }
        return redirect('/fuck')->with('error', 'Access denied, only admins can use this page.');
    }
}

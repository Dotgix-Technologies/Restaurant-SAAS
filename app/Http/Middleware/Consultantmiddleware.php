<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class Consultantmiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if(!auth()->check()){
            Log::warning('Unauthorized access attempt to consultant middleware by unauthenticated user.');
            return redirect('SuperConsultant/login')->with('error', 'You must be logged in to access this page.');
        }
        if ( auth()->user()->role == 'SuperConsultant') {
            Log::info('Consultant middleware accessed by user: ' . auth()->user()->name);
            return $next($request); 
        }
        return redirect('/')->with('error', 'Access denied, only consultants can use this page.');
    }
}

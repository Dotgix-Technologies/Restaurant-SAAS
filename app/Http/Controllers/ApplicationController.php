<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\Tenant;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
   public function index()
    {
        $restaurants = Restaurant::with(['tenant.Domain'])->get();
        return inertia('Welcome', [
            'canLogin' => route('login'),
            'canRegister' => route('register'),
            'restaurants' => $restaurants,
        ]);
    }
}

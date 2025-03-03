<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RestaurantController extends Controller
{
    public function index()
    {

        return Inertia::render('SuperAdmin/Dashboard', ['admin' => 'hello']);
    }
}

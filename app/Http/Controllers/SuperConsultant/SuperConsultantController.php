<?php

namespace App\Http\Controllers\SuperConsultant;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SuperConsultantController extends Controller
{
    public function index()
    {

        return Inertia::render('SuperAdmin/Dashboard', ['admin' => 'hello']);
    }
}

<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClientController extends Controller
{
    public function index()
    {

        return Inertia::render('Client/Dashboard', ['admin' => 'hello']);
    }
}

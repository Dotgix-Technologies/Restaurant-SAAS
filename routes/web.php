<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\Client\ClientAuthController;
use App\Http\Controllers\Restaurant\RestaurantController;
use App\Http\Controllers\SuperAdmin\SuperAdminController;
use App\Http\Controllers\Restaurant\RestaurantAuthController;
use App\Http\Controllers\SuperAdmin\SuperAdminAuthController;
use App\Http\Controllers\SuperConsultant\SuperConsultantController;
use App\Http\Controllers\SuperConsultant\SuperConsultantAuthController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'redirectAdmin'])->name('dashboard');
Route::group(['prefix' => 'SuperAdmin', 'middleware' => 'auth', 'isAdmin'], function () {
    Route::post('logout', [SuperAdminAuthController::class, 'logout'])->name('SuperAdmin.logout');
    Route::get('dashboard', [SuperAdminController::class, 'index'])->name('SuperAdmin.dashboard');
    Route::get('tenants/index', [SuperAdminController::class, 'TenentIndex'])->name('SuperAdmin.tenants.index');
    Route::get('tenants/create', [SuperAdminController::class, 'TenantCreate'])->name('SuperAdmin.tenants.create');
    Route::post('tenants/store', [SuperAdminController::class, 'TenantStore'])->name('SuperAdmin.tenants.store');
    Route::get('tenants/requests', [SuperAdminController::class, 'TenantRequests'])->name('SuperAdmin.tenants.requests');
    Route::get('users/create', [SuperAdminController::class, 'CreateUser'])->name('SuperAdmin.users.create');
    Route::post('users/store', [SuperAdminController::class, 'CreateStore'])->name('SuperAdmin.users.store');
    Route::get('users/index/{type}', [SuperAdminController::class, 'UserIndex'])->name('SuperAdmin.users.index');
    Route::get('users/edit/{id}', [SuperAdminController::class, 'UserShow'])->name('SuperAdmin.user.show');
    Route::get('users/{action}/{id}', [SuperAdminController::class, 'UserAction'])->name('SuperAdmin.user.action');
    Route::post('users/update/{id}', [SuperAdminController::class, 'UserUpdate'])->name('SuperAdmin.user.update');
    Route::post('restaurant/create/{id}', [SuperAdminController::class, 'CreateRestaurant'])->name('SuperAdmin.restaurant.create');
    Route::put('restaurant/action/{id}', [SuperAdminController::class, 'RestaurantAction'])->name('SuperAdmin.restaurant.action');
    Route::post('restaurant/document/upload/{id}', [SuperAdminController::class, 'KycDocUpload'])->name('SuperAdmin.restaurant.document.upload');
    Route::put('kycDoc/action/{id}', [SuperAdminController::class, 'RestauranKycDoctAction'])->name('SuperAdmin.kycDoc.action');
    Route::get('tenant/check/domain/{domain}', [SuperAdminController::class, 'checkDomain'])->name('SuperAdmin.tenant.domain.check');
    Route::post('tenent/create/{id}', [SuperAdminController::class, 'CreateTenent'])->name('SuperAdmin.tenent.create');
});
Route::group(['prefix' => 'Client', 'middleware' => 'auth', 'isAdmin'], function () {
    Route::post('logout', [ClientAuthController::class, 'logout'])->name('SuperAdmin.logout');
    Route::get('dashboard', [ClientController::class, 'index'])->name('SuperAdmin.dashboard');
});
Route::group(['prefix' => 'Restaurant', 'middleware' => 'auth', 'isAdmin'], function () {
    Route::post('logout', [RestaurantAuthController::class, 'logout'])->name('SuperAdmin.logout');
    Route::get('dashboard', [RestaurantController::class, 'index'])->name('SuperAdmin.dashboard');
});
Route::group(['prefix' => 'SuperConsultant', 'middleware' => 'auth', 'isAdmin'], function () {
    Route::post('logout', [SuperConsultantAuthController::class, 'logout'])->name('SuperAdmin.logout');
    Route::get('dashboard', [SuperConsultantController::class, 'index'])->name('SuperAdmin.dashboard');
});

Route::get('superAdmin/login', [SuperAdminAuthController::class, 'showLoginForm'])->name('SuperAdmin.login');
Route::post('SuperAdmin/login/post', [SuperAdminAuthController::class, 'login'])->name('SuperAdmin.login.post');
Route::get('Client/login', [ClientAuthController::class, 'showLoginForm'])->name('Client.login');
Route::post('Client/login', [ClientAuthController::class, 'login'])->name('Client.login.post');
Route::get('Restaurant/login', [RestaurantAuthController::class, 'showLoginForm'])->name('Restaurant.login');
Route::post('Restaurant/login', [RestaurantAuthController::class, 'login'])->name('Restaurant.login.post');
Route::get('SuperConsultant/login', [SuperConsultantAuthController::class, 'showLoginForm'])->name('SuperConsultant.login');
Route::post('SuperConsultant/login', [SuperConsultantAuthController::class, 'login'])->name('SuperConsultant.login.post');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('logout', [SuperAdminAuthController::class, 'logout'])->name('logout');
});

require __DIR__ . '/auth.php';

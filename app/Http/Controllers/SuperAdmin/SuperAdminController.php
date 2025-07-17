<?php

namespace App\Http\Controllers\SuperAdmin;

use Exception;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Tenant;
use App\Models\Restaurant;
use App\Models\KycDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\Password;
use Stancl\Tenancy\Database\Models\Domain;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class SuperAdminController extends Controller
{
    public function index()
    {

        return Inertia::render('SuperAdmin/Dashboard', ['admin' => 'hello']);
    }
    public function TenentIndex()
    {
        $tenants = Tenant::with('user')->get();
        return Inertia::render('SuperAdmin/Restorants/index', ['tenants' => $tenants]);
    }
    public function TenantCreate()
    {
        return Inertia::render('SuperAdmin/Restorants/create');
    }
    public function TenantStore(Request $request) {}
    public function TenantRequests()
    {
        $tenants = Tenant::whereJsonContains('data->status', 'pending')->get();
        return Inertia::render('SuperAdmin/Restorants/requests', ['tenants' => $tenants]);
    }
    public function CreateUser()
    {
        return Inertia::render('SuperAdmin/Users/Create');
    }
    public function CreateStore(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'role' => 'required',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);
        try {
            $user = User::create($validatedData);
            if ($user) {
                return redirect()->back()->with('success', 'User Have Been Registered Sucessfully');
            } else {
                return redirect()->back()->with('error', 'Error While Registering new user');
            }
        } catch (Exception $e) {
            Log::error('Adding while adding product' . $e->getMessage());
            return redirect()->back()->with('error', 'Something went wrong' . $e->getMessage());
        }
    }
    public function UserIndex($type)
    {
        $users = User::where('role', $type)->get();
        return Inertia::render('SuperAdmin/Users/Index', ['users' => $users]);
    }
    public function UserShow($id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 'Restaurant') {
            $user->load([
                'Tenants.Restaurant.KycDocuments',
                'Tenants.Domain',
                'restaurants.KycDocuments.restaurant'
            ]);
        }

        return Inertia::render('SuperAdmin/Users/Show', ['user' => $user]);
    }
    public function UserAction($action, $id)
    {

        try {
            $updateUser = User::findOrFail($id);
            $updateUser->status = $action;
            if ($action == 'verified' || $action == 'approved') {
                $updateUser->email_verified_at = now();
            }
            $updateUser->save();
            return redirect()->back()->with('success', '' . $updateUser->name . 'account Have Been ' . $action . ' Sucessfully');
        } catch (Exception $e) {
            Log::error('Adding while adding product' . $e->getMessage());
            return redirect()->back()->with('error', 'Something went wrong' . $e->getMessage());
        }
    }
    public function UserUpdate(Request $request,  $UserId)
    {
        $user = User::findOrFail($UserId);
        // dd($user);
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required',
        ]);
        if ($validatedData['status'] == 'verified' || $validatedData['status'] == 'approved') {
            $validatedData['email_verified_at'] = now();
        }
        try {
            Log::info(['validated_data' => $validatedData, 'user' => $user]);
            $user->update($validatedData);
            Log::info('User updated successfully: ' . $user);
            return redirect()->back()->with('success', 'User has been updated successfully');
        } catch (Exception $e) {
            Log::error('Error while updating user: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }
    public function CreateRestaurant(Request $request, $UserId)
    {
        try {
            $validateData = $request->validate([
                'restroName' => 'required|string|max:255',
                'restroEmail' => 'required|email|unique:restaurants,email|max:255',
                'restroPhone' => 'required|string|max:20',
                'restroaddress' => 'required|string',
                'restrolocation' => 'nullable|string',
                'restroDBA' => 'nullable|string|max:255',
                'restrocuisine_type' => 'required|string|in:FastFood,Italian,Chinese,Pakistani,Indian,Thai,Japanese,Mexican,Mediterranean,American,French,Vegan,Other',
                'restrorestaurant_type' => 'required|in:OnSite,CloudKitchen,Hybrid',
                'restrolicense_no' => 'nullable|string|max:255',
                'restrologo' => 'nullable|image|mimes:png,jpg,jpeg,webp,gif,ico|max:5060',
                'restraStatus' => 'required|in:pending_verification,Approved,Active,Offline,Vacation,Deactivaed,Suspended'
            ]);

            // Create new restaurant record
            $restaurant = new Restaurant();
            $restaurant->owner_id = $UserId;
            // Handle logo upload if present
            if ($request->hasFile('restrologo')) {
                $file = $request->file('restrologo');
                $filename = time() . '_' . $file->getClientOriginalName();
                // Move file directly to public/restaurants/logos
                $file->move(public_path('gallery/' . $UserId), $filename);
                // Save only the relative path
                $restaurant->logo = 'gallery/' . $UserId . '/' . $filename; // No "public"
            }
            $restaurant->name = $validateData['restroName'];
            $restaurant->email = $validateData['restroEmail'];
            $restaurant->phone = $validateData['restroPhone'];
            $restaurant->address = $validateData['restroaddress'];
            $restaurant->location = $validateData['restrolocation'] ?? null;
            $restaurant->DBA = $validateData['restroDBA'] ?? null;
            $restaurant->cuisine_type = $validateData['restrocuisine_type'];
            $restaurant->restaurant_type = $validateData['restrorestaurant_type'];
            $restaurant->license_no = $validateData['restrolicense_no'] ?? null;
            $restaurant->subscription_plan = 'Free';
            $restaurant->status = $validateData['restraStatus'] ?? 'pending_verification';

            $restaurant->save();
            return redirect()->back()->with('success', 'Restaurant created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error',  $e->errors());
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong' . $e->getMessage());
        }
    }
    public function RestaurantAction(Request $request, $id)
    {
        try {
            $validateData = $request->validate(['value' => 'required|in:verified,pending_verification,Approved,Active,Offline,Vacation,Deactivaed,Suspended']);
            $restaurant = Restaurant::findOrFail($id);
            $restaurant->status = $validateData['value'] ?? 'pending_verification';
            $restaurant->save();
            return redirect()->back()->with('success', 'Restaurant' . $restaurant->name . ' Status updated to ' . $validateData['value'] . ' successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error',  $e->errors());
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong' . $e->getMessage());
        }
    }
    public function RestauranKycDoctAction(Request $request, $id)
    {
        try {
            $validateData = $request->validate(['value' => 'required|in:pending_approval,Approved,Rejected']);
            $KycDocument = KycDocument::findOrFail($id);
            $KycDocument->status = $validateData['value'] ?? 'pending_approval';
            $KycDocument->save();
            return redirect()->back()->with('success', 'Kyc Document ' . $KycDocument->type . 'Status updated to ' . $validateData['value'] . ' successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error',  $e->errors());
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong' . $e->getMessage());
        }
    }
    public function checkDomain($domain)
    {
        try {
            // Check if domain already exists
            $exists = Domain::where('domain', $domain . '.' . config('app.domain'))->exists();
            return response()->json([
                'available' => !$exists // `true` if available, `false` if taken
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ], 500);
        }
    }
    public function CreateTenent(Request $request, $UserId)
    {
        try {
            // Validate the request
            $validatedData = $request->validate([
                'tenenrestroId' => 'required|exists:restaurants,id',
                'tenentDomain' => 'required|string|unique:domains,domain|max:255',
            ]);

            // Check if the restaurant already has a tenant
            $existingTenant = Tenant::where('restaurant_id', $validatedData['tenenrestroId'])->first();
            if ($existingTenant) {
                return redirect()->back()->withErrors(['tenenrestroId' => 'This restaurant already has a tenant.'])->withInput();
            }

            // Create the tenant
            $tenant = Tenant::create([
                'restaurant_id' => $validatedData['tenenrestroId'],
                'user_id' => $UserId,
                'data' => []
            ]);

            // Create and associate domain
            Domain::create([
                'domain' => $validatedData['tenentDomain'] . '.' . config('app.domain'),
                'tenant_id' => $tenant->id
            ]);

            return redirect()->back()->with('success', 'Tenant created successfully!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::info($e);
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $ex) {
            Log::error($ex);
            return redirect()->back()->with('error', 'An unexpected error occurred.')->withInput();
        }
    }

    public function KycDocUpload(Request $request, $restroId)
    {
        try {
            $request->validate([
                'kycDocuments' => 'required|mimes:pdf,doc,docx,txt|max:2048',
                'kycDocumentType' => 'required|string',
            ]);
            if ($request->hasFile('kycDocuments')) {
                $file = $request->file('kycDocuments');
                $filename = time() . '_' . $file->getClientOriginalName();

                // Move file directly to public/kyc_documents
                $file->move(public_path('kyc_documents'), $filename);

                // Save only the relative path
                $kycDocument = new KycDocument();
                $kycDocument->type = $request->kycDocumentType;
                $kycDocument->restaurant_id = $restroId;
                $kycDocument->document_path = 'kyc_documents/' . $filename; // No "public" prefix needed
                $kycDocument->save();

                return redirect()->back()->with('success', 'Document uploaded successfully!');
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::info($e);
            return redirect()->back()->withErrors($e->errors())->withInput();
        }
    }
    public function ThemeCreate()
    {
        return Inertia::render('SuperAdmin/Themes/Create');
    }
    public function ThemeStore(Request $request)
    {
        $request->validate([
            'zipFile' => 'required|file|mimes:zip',
        ]);
        $zipFile = $request->file('zipFile');
        $tmpPath = storage_path('app/temp-theme');
        $zip = new ZipArchive;
        // Cleanup before unzip
        File::deleteDirectory($tmpPath);
        File::makeDirectory($tmpPath, 0755, true);
        if ($zip->open($zipFile) === true) {
            $zip->extractTo($tmpPath);
            $zip->close();
        } else {
            return response()->json(['error' => 'Unable to extract zip'], 400);
        }
        // Paths
        $themeManifestPath = $tmpPath . '/build/manifest.json';
        $mainManifestPath = public_path('build/manifest.json');
        $assetsSourcePath = $tmpPath . '/build/assets';
        $assetsTargetPath = public_path('build/assets');
        // Step 1: Load both manifests
        $themeManifest = json_decode(file_get_contents($themeManifestPath), true);
        $mainManifest = json_decode(file_get_contents($mainManifestPath), true);
        // Log before merge
        Log::info('Before merge', [
            'mainManifest' => $mainManifest,
            'themeManifest' => $themeManifest,
        ]);
        // Ensure app.tsx key exists
        if (!isset($mainManifest['resources/js/app.tsx'])) {
            $mainManifest['resources/js/app.tsx'] = [
                'dynamicImports' => []
            ];
        }
        // Step 2: Add all theme keys to dynamicImports array
        foreach ($themeManifest as $key => $value) {
            $mainManifest[$key] = $value;

            // Add only the key name, not value['dynamicImports']
            if (!in_array($key, $mainManifest['resources/js/app.tsx']['dynamicImports'])) {
                $mainManifest['resources/js/app.tsx']['dynamicImports'][] = $key;
                Log::info("Added '{$key}' to dynamicImports.");
            }
        }
        // Step 3: Save merged manifest
        file_put_contents($mainManifestPath, json_encode($mainManifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        // Step 4: Copy assets if any
        if (File::exists($assetsSourcePath)) {
            File::copyDirectory($assetsSourcePath, $assetsTargetPath);
            Log::info('Assets copied from temp-theme to public.');
        }
        // Cleanup
        File::deleteDirectory($tmpPath);

        return response()->json(['success' => true, 'message' => 'Theme uploaded and applied successfully.']);
    }
}

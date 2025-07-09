<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use App\Models\Tenant;
use App\Models\Gallery;
use App\Models\Restaurant;
use App\Models\KycDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use Stancl\Tenancy\Database\Models\Domain;
use App\Http\Requests\UpdateRestaurantRequest;
use App\Http\Resources\GalleryResource;

class RestaurantController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $restaurants = $user->restaurants()->where('owner_id', $user->id)->with('kycDocuments')->get();
        $restaurantResources = RestaurantResource::collection($restaurants);

        return Inertia::render('Restaurant/Dashboard', ['restaurants' => $restaurantResources]);
    }
    public function RestaurantShow(Restaurant $restaurant)
    {
        $restaurant = auth()->user()->restaurants()->where('id', $restaurant->id)->with(['kycDocuments', 'tenant.Domain',])->firstOrFail();

        return Inertia::render('Restaurant/RestaurantShow', ['restaurant' => new RestaurantResource($restaurant)]);
    }
    public function RestaurantUpdate(UpdateRestaurantRequest $request, Restaurant $restaurant)
    {
        $validated = $request->validated();

        $requiresVerification = false;

        if (
            isset($validated['email']) && $validated['email'] !== $restaurant->email ||
            isset($validated['license_no']) && $validated['license_no'] !== $restaurant->license_no ||
            isset($validated['id']) && $validated['id'] !== $restaurant->id
        ) {
            $requiresVerification = true;
        }

        if ($requiresVerification) {
            $validated['status'] = 'pending_verification';
        }

        $restaurant->update($validated);

        return back()->with('response', [
            'message' => 'Restaurant updated successfully.',
            'data' => new RestaurantResource($restaurant->load(['tenant.Domain', 'kycDocuments']))
        ]);
    }
    public function RestaurantKycUpdate(Request $request, Restaurant $restaurant)
    {
        $kycDocuments = $request->input('kyc_documents', []);
        $uploadedFiles = $request->file('kyc_documents', []);

        foreach ($kycDocuments as $index => $docData) {
            $type = $docData['type'];
            $existingPath = $docData['existing_path'] ?? null;
            $uploadedFile = $uploadedFiles[$index]['document'] ?? null;
            if ($uploadedFile) {
                $filename = time() . '_' . $uploadedFile->getClientOriginalName();
                // Move file directly to public/kyc_documents
                $uploadedFile->move(public_path('kyc_documents'), $filename);
            } else {
                $filename = $existingPath;
            }
            if (!$filename) continue;
            KycDocument::updateOrCreate(
                [
                    'restaurant_id' => $restaurant->id,
                    'type' => $type,
                ],
                [
                    'document_path' => 'kyc_documents/' . $filename,
                ]
            );
        }

        return redirect()->back()->with('success', 'KYC Documents updated successfully.');
    }
    public function RestauranTenantRegister(Request $request, Restaurant $restaurant)
    {
        try {
            // Validate the request
            $validatedData = $request->validate([
                'domain' => 'required|string|unique:domains,domain|max:255',
            ]);

            // Check if the restaurant already has a tenant
            $existingTenant = Tenant::where('restaurant_id', $restaurant->id)->first();
            if ($existingTenant) {
                return redirect()->back()->withErrors(['tenenrestroId' => 'This restaurant already has a tenant.'])->withInput();
            }

            // Create the tenant
            $tenant = Tenant::create([
                'restaurant_id' => $restaurant->id,
                'user_id' => auth()->id(),
                'data' => []
            ]);

            // Create and associate domain
            Domain::create([
                'domain' => $validatedData['domain'] . '.' . config('app.domain'),
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
    public function getGallery()
    {
        $gallery = Gallery::where('user_id', Auth()->id())->latest()->paginate(20);
        return GalleryResource::collection($gallery);
    }
    public function uploadGalleryImages(Request $request)
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $user = auth()->user();
        $savedImages = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $folderPath = public_path('gallery/' . $user->id);

                if (!file_exists($folderPath)) {
                    mkdir($folderPath, 0755, true);
                }

                $image->move($folderPath, $filename);

                // Save into DB
                $gallery = Gallery::create([
                    'user_id' => $user->id,
                    'file_path' => 'gallery/' . $user->id . '/' . $filename,
                    'original_name' => $image->getClientOriginalName(),
                ]);

                $savedImages[] = $gallery;
            }
        }

        return redirect()->back()->with('success', 'Images Uploaded successfully!');
    }
    public function deleteGalleryImage($id)
    {
        $gallery = Gallery::findOrFail($id);

        // Authorization check
        if ($gallery->user_id !== auth()->id()) {
            return redirect()->back()->withErrors(['error' => 'Unauthorized action.']);
        }

        // Delete file from storage
        $filePath = public_path($gallery->file_path);
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        // Delete database record
        $gallery->delete();

        return redirect()->back()->with('success', 'Image deleted successfully!');
    }
    public function archiveGalleryImage($id)
    {
        $gallery = Gallery::findOrFail($id);

        // Authorization check
        if ($gallery->user_id !== auth()->id()) {
            return redirect()->back()->withErrors(['error' => 'Unauthorized action.']);
        }

        // Simply delete the database record (leave the file untouched)
        $gallery->delete();

        return redirect()->back()->with('success', 'Image archived (record deleted, file untouched)!');
    }
}

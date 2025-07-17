<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRestaurantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'DBA' => 'nullable|string|max:255',
            'cuisine_type' => 'nullable|string|max:255',
            'restaurant_type' => 'required|string|in:OnSite,CloudKitchen,Hybrid',
            'license_no' => 'nullable|string|max:255',
            'subscription_plan' => 'nullable|string|max:255',
            'logo' => 'nullable|file|max:255',
            'status' => 'nullable|string|in:pending_verification,verified,Approved,Active,Offline,Vacation,Deactivated,Suspended',
            'tenant_id' => 'nullable|exists:tenants,id',
            'domain_id' => 'nullable|exists:domains,id',
        ];
    }
}

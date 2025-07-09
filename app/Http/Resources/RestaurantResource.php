<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'owner_id' => $this->owner_id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'location' => $this->location,
            'DBA' => $this->DBA,
            'cuisine_type' => $this->cuisine_type,
            'restaurant_type' => $this->restaurant_type,
            'license_no' => $this->license_no,
            'subscription_plan' => $this->subscription_plan,
            'logo'=>$this->logo,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'kyc_documents' => KycDocumentResource::collection($this->whenLoaded('kycDocuments')),
            'tenant' => new TenantResource($this->whenLoaded('tenant')),      
        ];
    }
}

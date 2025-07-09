<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DomainResource extends JsonResource
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
            'tenant_id' => $this->tenant_id,
            'domain' => $this->domain,
            //'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // 'ssl_certificate' => $this->ssl_certificate, // Assuming this is a field in the Domain model
            // 'ssl_expiry_date' => $this->ssl_expiry_date, // Assuming this is a field in the Domain model
        ];
    }
}
    
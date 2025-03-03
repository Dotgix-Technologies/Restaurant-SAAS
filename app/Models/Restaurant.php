<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;
    protected $fillable = [
        'owner_id',
        'name',
        'email',
        'phone',
        'address',
        'location',
        'DBA',
        'cuisine_type',
        'restaurant_type',
        'Liscience_no',
        'subscription_plan',
        'status',
    ];
    public function KycDocuments()
    {
        return $this->hasMany(KycDocument::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KycDocument extends Model
{
    protected $fillable = [
        'type',
        'restaurant_id',
        'document_path'
    ];
    public function restaurant(){
        return $this->belongsTo(Restaurant::class);
    }
}

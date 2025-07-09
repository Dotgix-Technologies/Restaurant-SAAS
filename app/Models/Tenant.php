<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Domain;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;
    protected $fillable = [
        'user_id',
        'restaurant_id'
    ];
    public static function getCustomColumns(): array
    {
        return [
            'id',
            'user_id',
            'restaurant_id'
        ];
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function Restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
    public function Domain()
    {
        return $this->hasOne(Domain::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Relation one to many
     */
    public function options()
    {
        return $this->hasMany(Option::class)->orderBy('id');
    }

    /**
     * Relation one to one
     */
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Relation one to many
     */
    public function question()
    {
        return $this->hasMany(Question::class);
    }

    /**
     * Relation one to one
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

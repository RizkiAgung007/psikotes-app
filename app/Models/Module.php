<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    /**
     * Relation one to many
     */
    public function question()
    {
        return $this->hasMany(Question::class);
    }
}

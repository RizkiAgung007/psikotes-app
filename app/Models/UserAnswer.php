<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{

    public $timestamps = false;

    protected $fillable = [
        'user_test_id',
        'questions_id',
        'option_id',
        'score',
    ];


    // Jawaban ini milik tes siapa?
    public function userTest()
    {
        return $this->belongsTo(UserTest::class);
    }

    // Jawaban ini untuk pertanyaan mana?
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    // Jawaban ini memilih opsi mana?
    public function option()
    {
        return $this->belongsTo(Option::class);
    }
}

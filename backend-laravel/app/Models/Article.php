<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'source_url',
        'version',
        'references',
    ];

    protected $casts = [
        'references' => 'array',
    ];
}

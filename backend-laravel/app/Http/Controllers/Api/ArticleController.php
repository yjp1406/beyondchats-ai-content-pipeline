<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return Article::findOrFail($id);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'version' => 'in:original,updated',
            'references' => 'array|nullable',
        ]);

        $baseSlug = Str::slug($data['title']);

        // ✅ Ensure slug uniqueness across versions
        if (($data['version'] ?? 'original') === 'updated') {
            $data['slug'] = $baseSlug . '-updated';
        } else {
            $data['slug'] = $baseSlug;
        }

        return Article::create($data);
    }



    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->all());
        return $article;
    }

    public function destroy($id)
    {
        Article::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}

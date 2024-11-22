<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContentRequest;
use App\Http\Requests\UpdateContentRequest;
use App\Models\Content;
use Illuminate\Support\Facades\Storage;
class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contents = Content::where('user_id', auth()->id())->get();
        return response()->json($contents);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContentRequest $request)
    {
        $filePath = null;
        // dd($request->hasFile('urldata'));
        if ($request->hasAny('urldata')) {
            $file = $request->file('urldata');
            $filePath = $file->store('uploads', 'public');
            $filePath = Storage::url($filePath);
        }

        $content = Content::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'category_id' => $request->input('category_id'),
            'user_id' => auth()->id(),
            'urldata' => $filePath,
        ]);

        return response()->json($content, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Content $content)
    {
        if ($content->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json($content);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Content $content)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContentRequest $request, Content $content)
    {
        $content->update($request->validated());
        return response()->json($content);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        $content->delete();
        return response()->json(['message' => 'Content deleted'], 200);
    }
}

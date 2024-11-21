<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContentRequest;
use App\Http\Requests\UpdateContentRequest;
use App\Models\Content;

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
        if ($request->hasFile('urldata')) {
            $file = $request->file('urldata');
            $filePath = $file->store('uploads', 'public');
        }
        if ($filePath !== null) {
            $content = Content::create($request->validated() + [
                'user_id' => auth()->id(),
                'urldata' => $filePath ?? 'No has subido imagen',
            ]);
            return response()->json($content, 201);
        }
        return response()->json(['message' => 'File upload failed'], 500);
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

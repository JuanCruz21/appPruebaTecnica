<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContentRequest;
use App\Http\Requests\UpdateContentRequest;
use App\Models\Content;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $contents = Content::where('user_id', auth()->id())
            ->when($request->filled('category_id'), function ($query) use ($request) {
                $query->where('category_id', $request->category_id);
            })
            ->when($request->filled('favorite'), function ($query) use ($request) {
                $query->where('favorite', filter_var($request->favorite, FILTER_VALIDATE_BOOLEAN));
            })
            ->orderBy('created_at', 'DESC')
            ->get();

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

        // Verificar si urldata es un archivo
        if ($request->has('urldata')) {
            $urldata = $request->input('urldata');
            // Si es un string (ejemplo: una URL o base64), no intentar procesarlo como archivo
            if (is_string($urldata)) {
                $filePath = $urldata; // Guardamos el string directamente
            } elseif ($request->hasFile('urldata')) {
                // Si es un archivo, procesarlo y almacenarlo
                $file = $request->file('urldata');
                $filePath = $file->store('uploads', 'public');
                $filePath = Storage::url($filePath);
            }
        }

        $favorite = filter_var($request->input('favorite'), FILTER_VALIDATE_BOOLEAN);

        $content = Content::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'category_id' => $request->input('category_id'),
            'favorite' => $favorite,
            'user_id' => auth()->id(),
            'urldata' => $filePath??'Sin imagen',
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
        $filePath = $content->urldata; // Mantener el valor actual de urldata si no se envía

        // Verificar si urldata es un archivo
        if ($request->has('urldata')) {
            $urldata = $request->input('urldata');
            if (is_string($urldata)) {
                $filePath = $urldata; // Actualizar con la URL enviada
            } elseif ($request->hasFile('urldata')) {
                // Si es un archivo, procesarlo y almacenarlo
                $file = $request->file('urldata');
                $filePath = $file->store('uploads', 'public');
                $filePath = Storage::url($filePath);
            }
        }

        // Convertir favorite a booleano
        $favorite = filter_var($request->input('favorite'), FILTER_VALIDATE_BOOLEAN);

        // Actualizar los datos del contenido
        $content->update([
            'title' => $request->input('title', $content->title), // Mantener el valor actual si no se envía
            'description' => $request->input('description', $content->description),
            'category_id' => $request->input('category_id', $content->category_id),
            'favorite' => $favorite,
            'urldata' => $filePath,
        ]);

        return response()->json($content, 200); // Devolver el contenido actualizado
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

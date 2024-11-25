<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'category_id' => 'sometimes|integer|exists:categories,id',
            'favorite' => 'sometimes|boolean',
            // 'urldata' => 'sometimes|file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,ogg,qt,avi,wmv,flv,3gp,webm|max:2048',
        ];
    }
}

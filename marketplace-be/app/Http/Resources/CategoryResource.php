<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'icon' => $this->icon,
            'CreatedBy' => $this->CreatedBy,
            'LastUpdatedBy' => $this->LastUpdatedBy,
            'CreatedDate' => $this->CreatedDate,
            'LastUpdatedDate' => $this->LastUpdatedDate,

            // 'products' => ProductResource::collection($this->products)
        ];
    }
}

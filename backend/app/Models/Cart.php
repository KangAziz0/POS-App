<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $fillable = ['id','name','price','quantity','totalPrice','product_id'];

    public function products(){
        return $this->belongsTo(Product::class,'product_id','id');
    }
}

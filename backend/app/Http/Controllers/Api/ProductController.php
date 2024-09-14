<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Requests\ProductRequest;
use App\Models\Cart;
use App\Models\Product;
use App\Repositories\Cart\ICartRepository;

class ProductController extends Controller
{
    public $cart;
    public function __construct(ICartRepository $cart)
    {
        $this->cart = $cart;
    }

    public function index()
    {
        $data = Product::all();
        return response()->json($data);
    }
    public function store(ProductRequest $request)
    {
        Product::create([
            'code' => $request->code,
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'image' => $request->image,
            'category_id' => $request->category_id
        ]);
        return response()->json(['message' => 'Product Created'], 201);
    }
    public function carts()
    {
        $data = Cart::all();
        return response()->json($data);
    }

    public function cartStore(CartRequest $request)
    {
        $this->cart->AddToCart($request->all());
        return response()->json(['message' => 'Add To Cart Success']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Requests\ProductRequest;
use App\Models\Cart;
use App\Models\Product;
use App\Repositories\Cart\ICartRepository;
use Illuminate\Http\Request;

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

    public function productByCategory($id)
    {
        return response()->json(Product::where('category_id', $id)->get());
    }

    public function cartProduct($id)
    {
        $product = Cart::where('product_id', $id)->get();
        return response()->json($product);
    }

    public function cartUpdate(Request $request, $id)
    {
        Cart::where('product_id', $id)->update([
            'quantity' => $request->quantity,
            'totalPrice' => $request->totalPrice
        ]);
        return response()->json(['message' => 'update Success']);
        // dd($request->quantity);
    }

    public function cartDelete($id){
        Cart::where('id',$id)->delete();
        return response()->json(['message' => 'Cart Deleted Success']);
    }
}

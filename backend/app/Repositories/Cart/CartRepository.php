<?php

namespace App\Repositories\Cart;

use App\Models\Cart;
use App\Repositories\Cart\ICartRepository;

class CartRepository implements ICartRepository
{
  public function AddToCart(array $data)
  {
    Cart::insert([
      'name' => $data['name'],
      'price' => $data['price'],
      'quantity' => $data['quantity'],
      'totalPrice' => $data['totalPrice'],
      'product_id' => $data['product_id']
    ]);
  }

}

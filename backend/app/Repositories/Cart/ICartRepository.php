<?php

namespace App\Repositories\Cart;

interface ICartRepository
{
  public function AddToCart(array $data);
}

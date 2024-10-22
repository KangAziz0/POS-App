<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/categories',CategoryController::class);

Route::get('/products',[ProductController::class,'index']);
Route::post('/products',[ProductController::class,'store']);
Route::get('/products/category/{id}',[ProductController::class,'productByCategory']);

Route::get('/carts',[ProductController::class,'carts']);
Route::post('/carts',[ProductController::class,'cartStore']);
Route::put('/carts/{id}',[ProductController::class,'cartUpdate']);
Route::delete('/carts/{id}',[ProductController::class,'cartDelete']);
Route::get('/carts/product/{id}',[ProductController::class,'cartProduct']);

Route::get('/orders/{id}',[OrderController::class,'show']);
Route::post('/orders',[OrderController::class,'store']);
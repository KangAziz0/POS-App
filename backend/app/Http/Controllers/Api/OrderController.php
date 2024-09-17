<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Repositories\Order\IOrderRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public $order;
     public function __construct(IOrderRepository $order)
     {
        $this->order = $order;
     }
     
    public function show($id)
    {
        $order = Order::with('details.product')->where('id',$id)->first();
        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }
    
        // Bentuk struktur JSON sesuai permintaan
        $response = [
            'orders' => [
                [
                    'id' => $order->id,
                    'date' => $order->date,
                    'total' => $order->total,
                    'detail' => $order->details->map(function($detail) {
                        return [
                            'id' => $detail->id,
                            'qty' => $detail->qty,
                            'price' => $detail->price,
                            'name' => $detail->product->name,
                            'totalPrice' => $detail->qty * $detail->price,
                            'product_id' => $detail->product_id,
                        ];
                    })
                ]
            ]
        ];
        return response()->json($response);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        DB::beginTransaction();
        
        try {
            // Simpan data ke tabel orders
            $order = Order::create([
                'date' => date(now()),
                'total' => $request->total,
            ]);

            // Simpan data ke tabel order_details
            foreach ($request->detail as $detail) {
                OrderDetail::create([
                    'order_id' => $order->id, // Foreign key
                    'id' => $detail['id'],
                    'qty' => $detail['quantity'],
                    'price' => $detail['price'],
                    'totalPrice' => $detail['totalPrice'],
                    'name' => $detail['name'],
                    'product_id' => $detail['product_id'],
                ]);
            }

            // Commit transaksi
            DB::commit();

            return response()->json(['message' => 'Order successfully created'], 201);

        } catch (\Exception $e) {
            // Rollback jika terjadi error
            DB::rollBack();
            return response()->json(['message' => 'Order failed to create', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

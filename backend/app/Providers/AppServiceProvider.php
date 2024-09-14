<?php

namespace App\Providers;
use App\Repositories\Cart\CartRepository;
use App\Repositories\Cart\ICartRepository;
use App\Repositories\Order\IOrderRepository;
use App\Repositories\Order\OrderRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ICartRepository::class,CartRepository::class);
        // $this->app->bind(ICartService::class,CartService::class);

        $this->app->bind(IOrderRepository::class,OrderRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

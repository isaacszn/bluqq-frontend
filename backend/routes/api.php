<?php
use App\Http\Controllers\WalletController;
use App\Http\Controllers\EscrowController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!endpoint for checking wallet balance or escrow status
|
*/
Route::get('/wallet/balance', [WalletController::class, 'balance']);
Route::post('/escrow/create', [EscrowController::class, 'create']);

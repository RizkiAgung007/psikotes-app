<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (!$request->user()) {
            return redirect('/login');
        }

        if ($request->user()->role === 'admin') {
            return $next($request);
        }

        // Jika User biasa mencoba masuk ke tempat yang bukan haknya
        if ($request->user()->role !== $role) {
            if ($request->user()->role === 'user') {
                return redirect()->route('dashboard');
            }
        }

        return $next($request);
    }
}



"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-black border-2 border-black px-3 py-1">
          Planted
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-gray-800 hover:text-black font-medium">
            Shop All
          </Link>
          <Link href="/plants" className="text-gray-800 hover:text-black font-medium">
            Plants
          </Link>
          <Link href="/accessories" className="text-gray-800 hover:text-black font-medium">
            Accessories
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
          </Button>

          {user ? (
            <>
              {user.role === 'ADMIN' && (
                <Link 
                  href="/admin"
                  className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
              )}
              <button 
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' });
                  window.location.reload();
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

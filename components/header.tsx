"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Search, ShoppingBag, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from 'react';
import { Drawer } from "@/components/ui/drawer";

export function Header() {
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-black border-2 border-black px-3 py-1">
          Planted
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-gray-800 hover:text-black font-medium">
            Shop All
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6 text-black" />
        </button>

        {/* Mobile Drawer Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden" onClick={() => setMenuOpen(false)}>
            <div className="bg-white w-64 h-full p-6 flex flex-col space-y-6" onClick={e => e.stopPropagation()}>
              <button className="self-end mb-4 text-black text-2xl" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
              <Link href="/shop" className="text-lg font-medium text-black" onClick={() => setMenuOpen(false)}>
                Shop All
              </Link>
              {user ? (
                <>
                  {user.role === 'ADMIN' && (
                    <Link href="/admin" className="text-lg font-medium text-black" onClick={() => setMenuOpen(false)}>
                      Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={async () => {
                      await fetch('/api/auth/logout', { method: 'POST' });
                      window.location.reload();
                    }}
                    className="text-lg text-black hover:text-black text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-lg text-black hover:text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

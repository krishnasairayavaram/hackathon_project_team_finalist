"use client";

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {

  const { cart } = useCart();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsClient(true);
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    router.push('/');
  };

  // 🔍 Global Search
  const handleSearch = (e) => {

    if (e.key === "Enter") {

      if (!searchQuery.trim()) return;

      router.push(`/?search=${searchQuery}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              QuickBite.
            </Link>
          </div>

          {/* Search */}
          <div className="hidden flex-1 max-w-xl mx-8 lg:flex items-center">

            <div className="relative w-full group">

              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search for burgers, drinks, combo..."
                className="w-full bg-slate-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all border border-transparent focus:border-orange-200"
              />

            </div>

          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4 sm:space-x-6">

            {/* Admin */}
            {isClient && role === 'admin' && (
              <Link
                href="/admin/dashboard"
                className="text-orange-600 font-bold hover:text-orange-500 transition-colors hidden sm:block"
              >
                Admin Dashboard
              </Link>
            )}

            {/* Login / Logout */}
            {isClient && token ? (

              <button
                onClick={handleLogout}
                className="text-slate-600 hover:text-red-500 transition-colors font-semibold text-sm"
              >
                Logout
              </button>

            ) : (

              <Link
                href="/login"
                className="text-slate-600 hover:text-orange-500 transition-colors hidden sm:block"
              >
                <svg className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">

                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />

                </svg>
              </Link>

            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-slate-800 hover:text-orange-600 transition-colors bg-orange-50 rounded-full"
            >

              <svg className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">

                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />

              </svg>

              {isClient && cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cart.length}
                </span>
              )}

            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
}
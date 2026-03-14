"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {

  const { cart, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  // 🔒 Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login"); 
    }
  }, [router]);

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handleCheckout = () => {

    const token = localStorage.getItem("token");

    // 🔒 Prevent checkout if not logged in
    if (!token) {
      router.replace("/login");
      return;
    }

    if (cart.length === 0) return;

    setIsCheckingOut(true);

    setTimeout(() => {

      setIsCheckingOut(false);
      setPaymentSuccess(true);
      clearCart();

      setTimeout(() => {
        router.push('/');
      }, 3000);

    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
        <div className="bg-green-50 text-green-600 p-8 rounded-full mb-6 shadow-lg shadow-green-500/20">
          <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
          Payment Successful!
        </h2>

        <p className="text-slate-500 text-lg">
          Your meal order has been securely processed. Redirecting home...
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[70vh]">

      <h1 className="text-4xl font-bold text-slate-900 mb-8">
        Secure Checkout
      </h1>

      {cart.length === 0 ? (

        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">

          <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-50 text-orange-400 rounded-full mb-6">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Your cart is empty
          </h2>

          <p className="text-slate-500 mb-6">
            Looks like you haven't added any delicious food yet.
          </p>

          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition"
          >
            Browse Menu
          </button>

        </div>

      ) : (

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart Items */}
          <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">
              Order Items ({cart.length})
            </h2>

            <div className="space-y-6">

              {cart.map((item, index) => (

                <div key={index} className="flex gap-4 items-center">

                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{item.title}</h3>

                    <p className="text-slate-500 text-sm">
                      {item.description}
                    </p>

                    <p className="font-bold text-orange-600 mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="p-2 text-slate-400 hover:text-red-500"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 bg-slate-900 text-white rounded-3xl p-8 shadow-xl">

            <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax & Fees</span>
                <span>$2.50</span>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-700 text-xl font-bold">
                <span>Total</span>
                <span>${(parseFloat(total) + 2.5).toFixed(2)}</span>
              </div>

            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
            >
              {isCheckingOut ? "Processing..." : `Pay Now $${(parseFloat(total) + 2.5).toFixed(2)}`}
            </button>

            <div className="mt-4 text-center text-sm text-slate-400">
              Virtual Secure Checkout
            </div>

          </div>

        </div>

      )}

    </div>
  );
}
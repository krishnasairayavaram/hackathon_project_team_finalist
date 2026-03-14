"use client";
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function ClientLayoutWrapper({ children }) {
    return (
        <CartProvider>
            <Navbar />
            <main className="flex-1 w-full mx-auto max-w-[1400px]">
                {children}
            </main>
        </CartProvider>
    );
}

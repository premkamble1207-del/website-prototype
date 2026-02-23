"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const { state, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState<"form" | "success">("form");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("success");
        clearCart();
    };

    if (step === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Animated checkmark */}
                    <motion.div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-[#c8a97e] flex items-center justify-center">
                        <motion.svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#c8a97e"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <motion.path
                                d="M20 6 9 17l-5-5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            />
                        </motion.svg>
                    </motion.div>

                    <h1 className="text-3xl font-extralight tracking-tight mb-4">Order Confirmed</h1>
                    <p className="text-base opacity-40 mb-8 max-w-sm mx-auto">
                        Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3.5 bg-[var(--foreground)] text-[var(--background)] text-sm tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
                    >
                        Continue Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-16">
            <div className="max-w-5xl mx-auto px-6">
                <h1 className="text-3xl md:text-4xl font-extralight tracking-tight mb-12">Checkout</h1>

                {state.items.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-lg font-light opacity-30 mb-4">Your cart is empty</p>
                        <Link
                            href="/shop"
                            className="text-sm tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity"
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                            {/* Form */}
                            <div className="lg:col-span-3 space-y-8">
                                {/* Contact */}
                                <section>
                                    <h2 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Contact</h2>
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        required
                                        className="w-full border border-current/10 rounded-lg px-4 py-3 text-sm bg-transparent outline-none focus:border-[#c8a97e] transition-colors placeholder:opacity-30"
                                    />
                                </section>

                                {/* Shipping */}
                                <section>
                                    <h2 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Shipping</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="First name"
                                            required
                                            className="border border-current/10 rounded-lg px-4 py-3 text-sm bg-transparent outline-none focus:border-[#c8a97e] transition-colors placeholder:opacity-30"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last name"
                                            required
                                            className="border border-current/10 rounded-lg px-4 py-3 text-sm bg-transparent outline-none focus:border-[#c8a97e] transition-colors placeholder:opacity-30"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            required
                                            className="col-span-2 border border-current/10 rounded-lg px-4 py-3 text-sm bg-transparent outline-none focus:border-[#c8a97e] transition-colors placeholder:opacity-30"
                                        />
                                        <input
                                            type="text"
                                            placeholder="City"
                                            required
                                            className="border border-current/10 rounded-lg px-4 py-3 text-sm bg-transparent outline-none focus:border-[#c8a97e] transition-colors placeholder:opacity-30"
                                        />
                                        <input
                                            type="text"
                                            placeholder="ZIP code"
                                            required
                                            className="border border-current/10 rounded-lg px-4 py-3 text-sm bg-transparent outline-none focus:border-[#c8a97e] transition-colors placeholder:opacity-30"
                                        />
                                    </div>
                                </section>

                                {/* Payment */}
                                <section>
                                    <h2 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Payment</h2>
                                    <div className="border border-current/10 rounded-xl p-6 space-y-4">
                                        {/* Card visual */}
                                        <div className="bg-gradient-to-br from-[#1a1a18] to-[#2a2820] rounded-xl p-6 text-white aspect-[1.6/1] max-w-sm flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div className="w-10 h-7 rounded bg-[#c8a97e]/60" />
                                                <span className="text-xs opacity-40 tracking-wider">VISA</span>
                                            </div>
                                            <div>
                                                <p className="text-sm tracking-[0.3em] opacity-60 mb-2">•••• •••• •••• 4242</p>
                                                <div className="flex justify-between text-xs opacity-40">
                                                    <span>CARD HOLDER</span>
                                                    <span>12/28</span>
                                                </div>
                                            </div>
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="Card number"
                                            required
                                            className="w-full border border-current/10 rounded-lg px-4 py-3 text-sm bg-transparent outline-none focus:border-[#c8a97e] transition-colors placeholder:opacity-30"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                required
                                                className="border border-current/10 rounded-lg px-4 py-3 text-sm bg-transparent outline-none focus:border-[#c8a97e] transition-colors placeholder:opacity-30"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                required
                                                className="border border-current/10 rounded-lg px-4 py-3 text-sm bg-transparent outline-none focus:border-[#c8a97e] transition-colors placeholder:opacity-30"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <motion.button
                                    type="submit"
                                    className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] text-sm tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
                                    whileTap={{ scale: 0.99 }}
                                >
                                    Place Order — ${totalPrice.toFixed(2)}
                                </motion.button>
                            </div>

                            {/* Order summary */}
                            <div className="lg:col-span-2">
                                <div className="lg:sticky lg:top-28">
                                    <h2 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">Order Summary</h2>

                                    <div className="space-y-4 mb-6">
                                        <AnimatePresence>
                                            {state.items.map((item) => (
                                                <motion.div
                                                    key={item.product.id}
                                                    layout
                                                    className="flex gap-4"
                                                >
                                                    <div className="w-16 h-20 relative rounded-lg overflow-hidden bg-[#f0ece4] flex-shrink-0">
                                                        <Image
                                                            src={item.product.images[0]}
                                                            alt={item.product.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                        />
                                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--foreground)] text-[var(--background)] text-[10px] rounded-full flex items-center justify-center">
                                                            {item.quantity}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                                                        <p className="text-xs opacity-40">{item.selectedColor} · {item.selectedSize}</p>
                                                    </div>
                                                    <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    <div className="border-t border-current/5 pt-4 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="opacity-50">Subtotal</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="opacity-50">Shipping</span>
                                            <span className="opacity-50">Free</span>
                                        </div>
                                        <div className="flex justify-between text-base font-medium border-t border-current/5 pt-3">
                                            <span>Total</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
    const { state, removeItem, updateQuantity, closeDrawer, totalPrice, totalItems } = useCart();

    return (
        <AnimatePresence>
            {state.isDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeDrawer}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--background)] z-50 flex flex-col shadow-2xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-current/5">
                            <h2 className="text-sm tracking-[0.2em] uppercase">
                                Cart ({totalItems})
                            </h2>
                            <button
                                onClick={closeDrawer}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                                aria-label="Close cart"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M18 6 6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {state.items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20 mb-4">
                                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                        <line x1="3" x2="21" y1="6" y2="6" />
                                        <path d="M16 10a4 4 0 0 1-8 0" />
                                    </svg>
                                    <p className="text-sm opacity-40 mb-4">Your cart is empty</p>
                                    <button
                                        onClick={closeDrawer}
                                        className="text-xs tracking-wider uppercase border border-current/20 px-6 py-2.5 hover:bg-current/5 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <AnimatePresence mode="popLayout">
                                        {state.items.map((item) => (
                                            <motion.div
                                                key={item.product.id + item.selectedColor + item.selectedSize}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                                className="flex gap-4"
                                            >
                                                {/* Image */}
                                                <div className="w-20 h-24 relative rounded-lg overflow-hidden bg-[#f0ece4] flex-shrink-0">
                                                    <Image
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="80px"
                                                    />
                                                </div>

                                                {/* Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                                                    <p className="text-xs opacity-40 mt-0.5">
                                                        {item.selectedColor} · {item.selectedSize}
                                                    </p>
                                                    <p className="text-sm font-medium mt-2">
                                                        ${item.product.price}
                                                    </p>

                                                    {/* Quantity */}
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <button
                                                            className="w-6 h-6 border border-current/10 rounded text-xs flex items-center justify-center hover:bg-current/5 transition-colors"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="text-xs w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            className="w-6 h-6 border border-current/10 rounded text-xs flex items-center justify-center hover:bg-current/5 transition-colors"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    className="self-start opacity-30 hover:opacity-70 transition-opacity"
                                                    onClick={() => removeItem(item.product.id)}
                                                    aria-label="Remove item"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path d="M18 6 6 18M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {state.items.length > 0 && (
                            <div className="border-t border-current/5 p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm opacity-60">Subtotal</span>
                                    <span className="text-lg font-medium">${totalPrice.toFixed(2)}</span>
                                </div>
                                <p className="text-xs opacity-30">Shipping calculated at checkout</p>
                                <Link
                                    href="/checkout"
                                    onClick={closeDrawer}
                                    className="block w-full bg-[var(--foreground)] text-[var(--background)] text-center text-sm tracking-wider uppercase py-3.5 hover:opacity-90 transition-opacity"
                                >
                                    Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

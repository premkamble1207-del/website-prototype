"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { toggleDrawer, totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const navLinks = [
        { label: "Shop", href: "/shop" },
        { label: "Collections", href: "/shop" },
        { label: "About", href: "#" },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? "glass-dark py-3"
                        : "bg-transparent py-5"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Mobile menu button */}
                    <button
                        className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            className="block w-5 h-[1.5px] bg-current"
                            animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="block w-5 h-[1.5px] bg-current"
                            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.span
                            className="block w-5 h-[1.5px] bg-current"
                            animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </button>

                    {/* Nav links – Desktop */}
                    <nav className="hidden lg:flex items-center gap-8 flex-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm tracking-wider uppercase link-underline opacity-70 hover:opacity-100 transition-opacity"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Logo */}
                    <Link href="/" className="text-lg tracking-[0.3em] uppercase font-light select-none">
                        MINIMILIST
                    </Link>

                    {/* Right icons */}
                    <div className="flex items-center gap-5 flex-1 justify-end">
                        {/* Search */}
                        <Link href="/shop" className="hidden lg:block opacity-70 hover:opacity-100 transition-opacity">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </Link>

                        {/* Cart */}
                        <button
                            className="relative opacity-70 hover:opacity-100 transition-opacity"
                            onClick={toggleDrawer}
                            aria-label="Open cart"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" x2="21" y1="6" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            <AnimatePresence>
                                {totalItems > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-2 -right-2 w-4 h-4 bg-[#c8a97e] text-white text-[10px] rounded-full flex items-center justify-center font-medium"
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-8 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-2xl tracking-[0.2em] uppercase font-light"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

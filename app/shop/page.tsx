"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

type SortOption = "featured" | "price-low" | "price-high" | "newest";

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState<SortOption>("featured");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        let result = products.filter((p) => {
            if (activeCategory !== "All" && p.category !== activeCategory) return false;
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            return true;
        });

        switch (sortBy) {
            case "price-low":
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case "newest":
                result = [...result].filter((p) => p.badge === "NEW").concat(result.filter((p) => p.badge !== "NEW"));
                break;
        }

        return result;
    }, [activeCategory, sortBy, priceRange]);

    return (
        <div className="pt-28 pb-16">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <ScrollReveal>
                    <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">Shop</p>
                    <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">
                        All Products
                    </h1>
                </ScrollReveal>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-current/5">
                    {/* Categories */}
                    <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-all whitespace-nowrap ${activeCategory === cat
                                        ? "bg-[var(--foreground)] text-[var(--background)]"
                                        : "opacity-40 hover:opacity-70"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Filters toggle on mobile */}
                        <button
                            className="lg:hidden text-xs tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            Filters
                        </button>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="text-xs tracking-wider uppercase bg-transparent opacity-50 hover:opacity-100 transition-opacity outline-none cursor-pointer"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low → High</option>
                            <option value="price-high">Price: High → Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar filters – Desktop & mobile toggle */}
                    <AnimatePresence>
                        {(showFilters || typeof window !== "undefined") && (
                            <motion.aside
                                className={`w-56 flex-shrink-0 space-y-8 ${showFilters ? "block" : "hidden lg:block"}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Price range */}
                                <div>
                                    <h3 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Price Range</h3>
                                    <div className="space-y-3">
                                        <input
                                            type="range"
                                            min={0}
                                            max={500}
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="w-full accent-[#c8a97e]"
                                        />
                                        <div className="flex justify-between text-xs opacity-40">
                                            <span>$0</span>
                                            <span>${priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Category checkboxes */}
                                <div>
                                    <h3 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Category</h3>
                                    <div className="space-y-2">
                                        {categories.slice(1).map((cat) => (
                                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={activeCategory === cat}
                                                    onChange={() => setActiveCategory(activeCategory === cat ? "All" : cat)}
                                                    className="w-4 h-4 accent-[#c8a97e] cursor-pointer"
                                                />
                                                <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                                                    {cat}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Active filters */}
                                {activeCategory !== "All" && (
                                    <div>
                                        <h3 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-3">Active Filters</h3>
                                        <motion.button
                                            layout
                                            className="text-xs tracking-wider bg-[var(--foreground)]/10 px-3 py-1.5 rounded-full flex items-center gap-2"
                                            onClick={() => setActiveCategory("All")}
                                        >
                                            {activeCategory}
                                            <span className="opacity-40">×</span>
                                        </motion.button>
                                    </div>
                                )}
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <p className="text-xs opacity-30 mb-6">{filtered.length} products</p>
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {filtered.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProductCard product={product} index={i} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filtered.length === 0 && (
                            <div className="text-center py-24">
                                <p className="text-lg opacity-30 font-light">No products found</p>
                                <button
                                    className="text-sm mt-4 opacity-50 hover:opacity-100 transition-opacity tracking-wider uppercase"
                                    onClick={() => {
                                        setActiveCategory("All");
                                        setPriceRange([0, 500]);
                                    }}
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

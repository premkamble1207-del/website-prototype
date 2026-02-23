"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function ProductPage() {
    const params = useParams();
    const product = getProductById(params.id as string);
    const { addItem } = useCart();

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [qty, setQty] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-light mb-4">Product not found</h1>
                    <Link href="/shop" className="text-sm tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity">
                        Back to shop
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem({
            product,
            quantity: qty,
            selectedColor: product.colors[selectedColor].name,
            selectedSize: product.sizes[selectedSize],
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs opacity-40 mb-8">
                    <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:opacity-100 transition-opacity">Shop</Link>
                    <span>/</span>
                    <span className="opacity-70">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image gallery */}
                    <div className="space-y-4">
                        {/* Main image */}
                        <motion.div
                            className="relative aspect-square rounded-2xl overflow-hidden bg-[#f0ece4]"
                            layoutId={`product-image-${product.id}`}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={product.images[selectedImage]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width:1024px) 100vw, 50vw"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Badge */}
                            {product.badge && (
                                <span
                                    className={`absolute top-4 left-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full font-medium z-10 ${product.badge === "NEW"
                                            ? "bg-[var(--foreground)] text-[var(--background)]"
                                            : "bg-[#c8a97e] text-white"
                                        }`}
                                >
                                    {product.badge}
                                </span>
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="flex gap-3">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative w-20 h-20 rounded-lg overflow-hidden bg-[#f0ece4] transition-all ${selectedImage === i ? "ring-2 ring-[#c8a97e] ring-offset-2" : "opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product details */}
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">{product.category}</p>
                            <h1 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-2xl font-light">${product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-base line-through opacity-30">${product.originalPrice}</span>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-8">
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <svg
                                            key={i}
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className={i < Math.floor(product.rating) ? "text-[#c8a97e]" : "opacity-20"}
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs opacity-40">
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>

                            <p className="text-base opacity-50 leading-relaxed mb-8">{product.description}</p>

                            {/* Color selector */}
                            <div className="mb-6">
                                <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-3">
                                    Color — {product.colors[selectedColor].name}
                                </p>
                                <div className="flex gap-3">
                                    {product.colors.map((color, i) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(i)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === i ? "border-[#c8a97e] scale-110" : "border-transparent hover:scale-105"
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size selector */}
                            {product.sizes.length > 1 && (
                                <div className="mb-8">
                                    <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-3">Size</p>
                                    <div className="flex gap-2">
                                        {product.sizes.map((size, i) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(i)}
                                                className={`px-4 py-2 text-sm border rounded-lg transition-all ${selectedSize === i
                                                        ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                                                        : "border-current/10 hover:border-current/30"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity + Add to cart */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center border border-current/10 rounded-lg">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="px-4 py-3 text-sm hover:bg-current/5 transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="px-4 py-3 text-sm min-w-[40px] text-center">{qty}</span>
                                    <button
                                        onClick={() => setQty(qty + 1)}
                                        className="px-4 py-3 text-sm hover:bg-current/5 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <motion.button
                                    className="flex-1 py-3.5 bg-[var(--foreground)] text-[var(--background)] text-sm tracking-[0.15em] uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    onClick={handleAddToCart}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {addedToCart ? (
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            ✓ Added to Cart
                                        </motion.span>
                                    ) : (
                                        "Add to Cart"
                                    )}
                                </motion.button>
                            </div>

                            {/* Details */}
                            <div className="border-t border-current/5 pt-8">
                                <h3 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Details</h3>
                                <ul className="space-y-2">
                                    {product.details.map((detail, i) => (
                                        <li key={i} className="text-sm opacity-50 flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-[#c8a97e]" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Related products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-24">
                        <ScrollReveal>
                            <h2 className="text-2xl font-extralight tracking-tight mb-8">You may also like</h2>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

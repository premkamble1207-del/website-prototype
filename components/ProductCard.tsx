"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [added, setAdded] = useState(false);
    const { addItem } = useCart();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            product,
            quantity: 1,
            selectedColor: product.colors[0].name,
            selectedSize: product.sizes[0],
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            <Link href={`/product/${product.id}`} className="group block">
                <div
                    className="relative overflow-hidden rounded-xl bg-[#f0ece4] aspect-[3/4]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Image */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </motion.div>

                    {/* Badge */}
                    {product.badge && (
                        <span
                            className={`absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full font-medium z-10 ${product.badge === "NEW"
                                    ? "bg-[var(--foreground)] text-[var(--background)]"
                                    : "bg-[#c8a97e] text-white"
                                }`}
                        >
                            {product.badge}
                        </span>
                    )}

                    {/* Quick add button */}
                    <motion.button
                        className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg z-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleQuickAdd}
                        aria-label="Quick add to cart"
                    >
                        {added ? (
                            <motion.svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <path d="M20 6 9 17l-5-5" />
                            </motion.svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        )}
                    </motion.button>
                </div>

                {/* Info */}
                <div className="mt-4 space-y-1">
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <div className="flex items-center gap-2">
                        <p className="text-sm opacity-70">${product.price}</p>
                        {product.originalPrice && (
                            <p className="text-xs line-through opacity-30">
                                ${product.originalPrice}
                            </p>
                        )}
                    </div>

                    {/* Color swatches */}
                    <div className="flex items-center gap-1.5 pt-1">
                        {product.colors.map((color) => (
                            <span
                                key={color.name}
                                className="w-3 h-3 rounded-full border border-black/10"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

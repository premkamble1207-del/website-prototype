"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingElement from "@/components/animations/FloatingElement";

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = products.slice(0, 4);
  const secondaryProducts = products.slice(4, 8);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
        {/* Floating product images */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingElement className="absolute top-[15%] left-[8%] w-32 h-32 md:w-48 md:h-48 opacity-20 rounded-2xl overflow-hidden" duration={7} distance={25}>
            <Image src={products[0].images[0]} alt="" fill className="object-cover" sizes="200px" />
          </FloatingElement>
          <FloatingElement className="absolute top-[20%] right-[10%] w-24 h-24 md:w-40 md:h-40 opacity-15 rounded-2xl overflow-hidden" duration={8} distance={20} delay={1}>
            <Image src={products[1].images[0]} alt="" fill className="object-cover" sizes="160px" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-[20%] left-[15%] w-28 h-28 md:w-36 md:h-36 opacity-15 rounded-2xl overflow-hidden" duration={9} distance={15} delay={2}>
            <Image src={products[4].images[0]} alt="" fill className="object-cover" sizes="144px" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-[25%] right-[8%] w-20 h-20 md:w-32 md:h-32 opacity-10 rounded-2xl overflow-hidden" duration={6} distance={18} delay={0.5}>
            <Image src={products[6].images[0]} alt="" fill className="object-cover" sizes="128px" />
          </FloatingElement>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c8a97e]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#8fa68a]/8 rounded-full blur-[100px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.p
            className="text-xs tracking-[0.4em] uppercase opacity-40 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Objects for a considered life
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[0.95]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Less, but
            <br />
            <span className="italic font-light text-[#c8a97e]">better</span>
          </motion.h1>

          <motion.p
            className="mt-8 text-lg md:text-xl opacity-50 font-light max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Curated essentials designed with intention. Every detail considered, nothing wasted.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-[var(--foreground)] text-[var(--background)] text-sm tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
            >
              Shop Now
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3.5 border border-current/20 text-sm tracking-[0.15em] uppercase hover:bg-current/5 transition-colors"
            >
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 border border-current/20 rounded-full flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-1.5 bg-current/40 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ===== FEATURED COLLECTION ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">Featured</p>
              <h2 className="text-3xl md:text-4xl font-extralight tracking-tight">
                Curated for you
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity link-underline hidden md:block"
            >
              View All
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ===== EDITORIAL SECTION ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#f0ece4]">
              <Image
                src={products[2].images[0]}
                alt="Editorial"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div className="lg:pl-8">
              <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4">Philosophy</p>
              <h2 className="text-3xl md:text-5xl font-extralight tracking-tight leading-tight mb-6">
                Designed for
                <br />
                <span className="italic font-light">stillness</span>
              </h2>
              <p className="text-base opacity-50 leading-relaxed mb-8 max-w-md">
                We believe the objects around you shape the way you think. Each product is stripped
                to its essence — no excess, no noise. Just what matters.
              </p>
              <Link
                href="/shop"
                className="text-sm tracking-[0.15em] uppercase border-b border-current/30 pb-1 hover:border-current transition-colors"
              >
                Discover More
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== MORE PRODUCTS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">New Arrivals</p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight">
              Recently added
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondaryProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="mx-6 my-24 rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0ece4] to-[#e8e2d6]" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-6 text-[#1a1a18]">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4">Newsletter</p>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-tight mb-4">
              Stay in the loop
            </h2>
            <p className="text-base opacity-40 mb-8 max-w-md">
              Get early access to new releases, exclusive offers, and stories worth reading.
            </p>
            <div className="flex items-center gap-0 max-w-md mx-auto w-full">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/60 border border-black/10 px-5 py-3 text-sm outline-none placeholder:text-black/30 rounded-l"
              />
              <button className="bg-[#c8a97e] text-white px-6 py-3 text-sm tracking-wider uppercase hover:bg-[#a88b62] transition-colors rounded-r">
                Subscribe
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

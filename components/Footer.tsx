import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-black/10 mt-24">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg tracking-[0.3em] uppercase font-light mb-4">
                            MINIMILIST
                        </h3>
                        <p className="text-sm opacity-50 leading-relaxed">
                            Objects for a considered life. Designed to last, made to endure.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Shop</h4>
                        <ul className="space-y-3">
                            {["New Arrivals", "Best Sellers", "Electronics", "Audio", "Home", "Lifestyle"].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            href="/shop"
                                            className="text-sm opacity-60 hover:opacity-100 transition-opacity link-underline"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Company</h4>
                        <ul className="space-y-3">
                            {["About", "Sustainability", "Careers", "Press"].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-sm opacity-60 hover:opacity-100 transition-opacity link-underline"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Stay in touch</h4>
                        <p className="text-sm opacity-50 mb-4">
                            Curated updates. No noise.
                        </p>
                        <div className="flex border-b border-current/20">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 bg-transparent text-sm py-3 outline-none placeholder:opacity-30"
                            />
                            <button className="text-xs tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity px-2">
                                →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between border-t border-black/5 pt-8 gap-4">
                    <p className="text-xs opacity-30">
                        © 2026 MINIMILIST. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Privacy", "Terms", "Cookies"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-xs opacity-30 hover:opacity-60 transition-opacity"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

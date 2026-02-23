export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    description: string;
    details: string[];
    colors: { name: string; hex: string }[];
    sizes: string[];
    images: string[];
    badge?: "NEW" | "SALE";
    rating: number;
    reviews: number;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Aura Wireless Headphones",
        price: 349,
        category: "Audio",
        description: "Immersive sound meets minimal design. 40-hour battery, adaptive noise cancellation, and whisper-soft ear cushions.",
        details: [
            "Active noise cancellation",
            "40-hour battery life",
            "Bluetooth 5.3",
            "Memory foam ear cushions",
            "USB-C fast charging",
        ],
        colors: [
            { name: "Matte Black", hex: "#1a1a1a" },
            { name: "Sand", hex: "#c8b89a" },
            { name: "Stone White", hex: "#f0ece4" },
        ],
        sizes: ["One Size"],
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
        ],
        badge: "NEW",
        rating: 4.8,
        reviews: 124,
    },
    {
        id: "2",
        name: "Zenith Smart Watch",
        price: 429,
        originalPrice: 499,
        category: "Electronics",
        description: "Time, redefined. Sapphire crystal display with health monitoring that adapts to your life.",
        details: [
            "Sapphire crystal display",
            "Heart rate & SpO2 monitoring",
            "7-day battery life",
            "Water resistant to 50m",
            "Titanium case",
        ],
        colors: [
            { name: "Midnight", hex: "#0f0f14" },
            { name: "Silver", hex: "#c0c0c0" },
            { name: "Rose Gold", hex: "#b76e79" },
        ],
        sizes: ["40mm", "44mm"],
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
            "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800&q=80",
        ],
        badge: "SALE",
        rating: 4.9,
        reviews: 256,
    },
    {
        id: "3",
        name: "Horizon Desk Lamp",
        price: 189,
        category: "Home",
        description: "Light that moves with you. Adjustable warmth, touch controls, and a silhouette that whispers elegance.",
        details: [
            "2700K-6500K adjustable warmth",
            "Touch dimmer control",
            "Wireless charging base",
            "Aluminum + walnut finish",
            "Energy-efficient LED",
        ],
        colors: [
            { name: "Walnut", hex: "#5c3d2e" },
            { name: "White Oak", hex: "#d4c5a9" },
        ],
        sizes: ["One Size"],
        images: [
            "https://images.unsplash.com/photo-1534105615256-13940a56ff44?w=800&q=80",
            "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80",
        ],
        rating: 4.7,
        reviews: 89,
    },
    {
        id: "4",
        name: "Terra Ceramic Vase",
        price: 79,
        category: "Home",
        description: "Hand-formed imperfection. Each piece is unique — a quiet statement for your living space.",
        details: [
            "Hand-made ceramic",
            "Matte glaze finish",
            "Water-resistant interior",
            "Height: 28cm",
            "Sustainably sourced clay",
        ],
        colors: [
            { name: "Earth", hex: "#8b7355" },
            { name: "Ash", hex: "#b0a898" },
            { name: "Cream", hex: "#f5f0e8" },
        ],
        sizes: ["Small", "Medium", "Large"],
        images: [
            "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
            "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80",
        ],
        rating: 4.6,
        reviews: 67,
    },
    {
        id: "5",
        name: "Pulse Portable Speaker",
        price: 199,
        originalPrice: 249,
        category: "Audio",
        description: "Sound without boundaries. 360° audio in a form factor that fits your palm.",
        details: [
            "360° omnidirectional sound",
            "IPX7 waterproof",
            "18-hour battery",
            "Bluetooth 5.3 + AUX",
            "Woven fabric exterior",
        ],
        colors: [
            { name: "Charcoal", hex: "#333333" },
            { name: "Sage", hex: "#8fa68a" },
            { name: "Terracotta", hex: "#c67d5b" },
        ],
        sizes: ["One Size"],
        images: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
            "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80",
        ],
        badge: "SALE",
        rating: 4.5,
        reviews: 198,
    },
    {
        id: "6",
        name: "Form Leather Wallet",
        price: 129,
        category: "Lifestyle",
        description: "Craft meets restraint. Full-grain leather that ages gracefully with every use.",
        details: [
            "Full-grain Italian leather",
            "RFID blocking technology",
            "6 card slots + bill compartment",
            "Slim profile: 10mm",
            "Hand-stitched edges",
        ],
        colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "Cognac", hex: "#8b4513" },
            { name: "Navy", hex: "#1c2841" },
        ],
        sizes: ["One Size"],
        images: [
            "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
        ],
        badge: "NEW",
        rating: 4.8,
        reviews: 143,
    },
    {
        id: "7",
        name: "Void Sunglasses",
        price: 219,
        category: "Lifestyle",
        description: "See nothing but what matters. Polarized lenses in a frame that vanishes on your face.",
        details: [
            "Polarized CR-39 lenses",
            "UV400 protection",
            "Titanium bridge",
            "Acetate frame",
            "Includes hard case",
        ],
        colors: [
            { name: "Obsidian", hex: "#0d0d0d" },
            { name: "Tortoise", hex: "#8b6914" },
            { name: "Clear", hex: "#e8e4dc" },
        ],
        sizes: ["One Size"],
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
        ],
        rating: 4.7,
        reviews: 91,
    },
    {
        id: "8",
        name: "Echo Wireless Earbuds",
        price: 179,
        category: "Audio",
        description: "Disappear into sound. Ultra-light earbuds with spatial audio and seamless pairing.",
        details: [
            "Spatial audio support",
            "Active noise cancellation",
            "28-hour total battery",
            "IPX5 sweat resistant",
            "Touch controls",
        ],
        colors: [
            { name: "Pearl", hex: "#f5f0e8" },
            { name: "Graphite", hex: "#3a3a3a" },
        ],
        sizes: ["One Size"],
        images: [
            "https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?w=800&q=80",
            "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&q=80",
        ],
        badge: "NEW",
        rating: 4.6,
        reviews: 178,
    },
];

export const categories = ["All", "Electronics", "Audio", "Home", "Lifestyle"];

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    if (category === "All") return products;
    return products.filter((p) => p.category === category);
}

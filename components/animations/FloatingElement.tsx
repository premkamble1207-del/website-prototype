"use client";

import { motion } from "motion/react";

interface FloatingElementProps {
    children: React.ReactNode;
    className?: string;
    duration?: number;
    distance?: number;
    delay?: number;
}

export default function FloatingElement({
    children,
    className = "",
    duration = 6,
    distance = 20,
    delay = 0,
}: FloatingElementProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-distance / 2, distance / 2, -distance / 2],
                rotate: [-1, 1, -1],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}

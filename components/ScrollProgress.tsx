"use client";

import { motion, useScroll } from "motion/react";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            style={{
                scaleX: scrollYProgress,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, #c8a97e, #a88b62)",
                transformOrigin: "0%",
                zIndex: 9999,
            }}
        />
    );
}

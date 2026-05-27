"use client";

import { motion } from "motion/react";

interface MarqueeTextProps {
  items: string[];
  speed?: number;
  className?: string;
  textClassName?: string;
}

export function MarqueeText({
  items,
  speed = 40,
  className,
  textClassName,
}: MarqueeTextProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((text, i) => (
          <span
            key={i}
            className={`flex items-center gap-16 ${textClassName ?? ""}`}
          >
            {text} <span aria-hidden>★</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

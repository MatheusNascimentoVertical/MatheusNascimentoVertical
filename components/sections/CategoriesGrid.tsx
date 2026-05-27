"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { categorias } from "@/lib/data/produtos";
import { FadeIn } from "@/components/motion/FadeIn";

export function CategoriesGrid() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <FadeIn className="text-center mb-12">
        <p className="text-paizao-gold text-sm tracking-[0.3em] uppercase font-medium mb-2">
          Explore
        </p>
        <h2
          className="text-5xl sm:text-6xl text-paizao-ink leading-none"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          CATEGORIAS
        </h2>
      </FadeIn>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categorias.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/loja/${cat.slug}`}
              className="group block relative overflow-hidden rounded-2xl border border-paizao-line hover:border-paizao-gold/50 transition-all duration-300 aspect-square bg-paizao-surface"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-paizao-navy/80 to-paizao-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                <span className="text-4xl">{cat.icone}</span>
                <div className="text-center">
                  <p
                    className="text-paizao-ink font-display text-lg tracking-wider group-hover:text-paizao-gold transition-colors"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {cat.nome.toUpperCase()}
                  </p>
                  <p className="text-paizao-ink-dim text-xs mt-0.5 leading-tight hidden group-hover:block transition-all">
                    {cat.descricao}
                  </p>
                </div>
              </div>

              {/* Gold accent border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-paizao-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

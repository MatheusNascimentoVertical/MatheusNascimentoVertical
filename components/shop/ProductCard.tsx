"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Produto } from "@/lib/data/produtos";
import { PriceTag } from "./PriceTag";
import { BuyOnWhatsApp } from "./BuyOnWhatsApp";

interface ProductCardProps {
  produto: Produto;
}

export function ProductCard({ produto }: ProductCardProps) {
  const tamanhos = produto.variantes.filter((v) => v.estoque > 0).map((v) => v.tamanho);
  const hasPromo = !!produto.precoPromocional;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-paizao-surface rounded-2xl overflow-hidden border border-paizao-line hover:border-paizao-gold/40 transition-colors duration-300"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {produto.novo && (
          <span className="bg-paizao-gold text-paizao-bg text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
            NOVO
          </span>
        )}
        {produto.copa && (
          <span className="bg-paizao-green text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
            COPA 2026
          </span>
        )}
        {hasPromo && (
          <span className="bg-paizao-red text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
            SALE
          </span>
        )}
      </div>

      {/* Favorite */}
      <button
        aria-label="Favoritar produto"
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-paizao-bg/60 text-paizao-ink-dim hover:text-paizao-red opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <Heart size={16} />
      </button>

      {/* Image */}
      <Link href={`/produto/${produto.slug}`} className="block relative aspect-[3/4] overflow-hidden">
        <Image
          src={produto.imagens[0]}
          alt={produto.nome}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-paizao-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Sizes on hover */}
        <div className="absolute bottom-3 left-0 right-0 px-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex flex-wrap gap-1 justify-center">
            {tamanhos.map((tam) => (
              <span
                key={tam}
                className="text-[10px] font-bold bg-paizao-surface/90 text-paizao-gold px-2 py-0.5 rounded border border-paizao-gold/30"
              >
                {tam}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-[10px] text-paizao-gold tracking-[0.2em] uppercase font-medium mb-1">
            {produto.categoria}
          </p>
          <Link href={`/produto/${produto.slug}`}>
            <h3 className="font-semibold text-paizao-ink text-sm leading-snug hover:text-paizao-gold transition-colors line-clamp-2">
              {produto.nome}
            </h3>
          </Link>
        </div>

        <PriceTag
          preco={produto.precoVarejo}
          precoPromocional={produto.precoPromocional}
          size="sm"
        />

        <BuyOnWhatsApp nome={produto.nome} preco={produto.precoVarejo} size="sm" className="w-full" />
      </div>
    </motion.div>
  );
}

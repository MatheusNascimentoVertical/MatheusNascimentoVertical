"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { getProdutoBySlug, produtos, Tamanho } from "@/lib/data/produtos";
import { PriceTag } from "@/components/shop/PriceTag";
import { BuyOnWhatsApp } from "@/components/shop/BuyOnWhatsApp";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProdutoPage({ params }: PageProps) {
  const { slug } = use(params);
  const produto = getProdutoBySlug(slug);

  if (!produto) notFound();

  return <ProdutoContent produto={produto} />;
}

function ProdutoContent({ produto }: { produto: ReturnType<typeof getProdutoBySlug> & object }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Tamanho | null>(null);

  const relacionados = produtos
    .filter((p) => p.categoriaSlug === produto.categoriaSlug && p.id !== produto.id)
    .slice(0, 4);

  const tamanhoDisponivel = (tamanho: Tamanho) =>
    produto.variantes.some((v) => v.tamanho === tamanho && v.estoque > 0);

  const TAMANHOS: Tamanho[] = ["PP", "P", "M", "G", "GG", "XG"];
  const tamanhosComVariante = TAMANHOS.filter((t) =>
    produto.variantes.some((v) => v.tamanho === t)
  );

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <FadeIn className="mb-8 flex items-center gap-2 text-sm text-paizao-ink-dim">
        <Link href="/" className="hover:text-paizao-gold transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/loja" className="hover:text-paizao-gold transition-colors">
          Loja
        </Link>
        <span>/</span>
        <Link
          href={`/loja/${produto.categoriaSlug}`}
          className="hover:text-paizao-gold transition-colors"
        >
          {produto.categoria}
        </Link>
        <span>/</span>
        <span className="text-paizao-ink truncate">{produto.nome}</span>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Left — Gallery */}
        <FadeIn direction="left">
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-paizao-surface border border-paizao-line group">
              <Image
                src={produto.imagens[selectedImage]}
                alt={produto.nome}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {produto.novo && (
                  <span className="bg-paizao-gold text-paizao-bg text-xs font-bold px-3 py-1 rounded-full">
                    NOVO
                  </span>
                )}
                {produto.copa && (
                  <span className="bg-paizao-green text-white text-xs font-bold px-3 py-1 rounded-full">
                    COPA 2026
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  aria-label="Favoritar"
                  className="p-2.5 bg-paizao-bg/70 rounded-full text-paizao-ink-dim hover:text-paizao-red transition-colors"
                >
                  <Heart size={18} />
                </button>
                <button
                  aria-label="Compartilhar"
                  className="p-2.5 bg-paizao-bg/70 rounded-full text-paizao-ink-dim hover:text-paizao-gold transition-colors"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {produto.imagens.length > 1 && (
              <div className="flex gap-3">
                {produto.imagens.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-paizao-gold"
                        : "border-paizao-line hover:border-paizao-gold/50"
                    }`}
                    aria-label={`Ver imagem ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${produto.nome} — foto ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Right — Info */}
        <FadeIn direction="right" className="space-y-6">
          {/* Category */}
          <Link
            href={`/loja/${produto.categoriaSlug}`}
            className="inline-block text-xs text-paizao-gold tracking-[0.3em] uppercase hover:text-paizao-gold-bright transition-colors"
          >
            {produto.categoria}
          </Link>

          {/* Name */}
          <h1
            className="text-4xl sm:text-5xl text-paizao-ink leading-tight"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {produto.nome.toUpperCase()}
          </h1>

          {/* Price */}
          <PriceTag
            preco={produto.precoVarejo}
            precoPromocional={produto.precoPromocional}
            showInstallment
            size="lg"
          />

          {/* Description */}
          <p className="text-paizao-ink-dim leading-relaxed">{produto.descricao}</p>

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-paizao-ink">
                Tamanho{selectedSize ? `: ${selectedSize}` : ""}
              </h3>
              <button className="text-xs text-paizao-gold hover:underline">
                Tabela de medidas
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tamanhosComVariante.map((tam) => {
                const disponivel = tamanhoDisponivel(tam);
                const selecionado = selectedSize === tam;
                return (
                  <motion.button
                    key={tam}
                    onClick={() => disponivel && setSelectedSize(tam)}
                    whileTap={disponivel ? { scale: 0.95 } : {}}
                    className={`relative w-14 h-12 rounded-xl text-sm font-bold transition-all border-2 ${
                      !disponivel
                        ? "border-paizao-line text-paizao-ink-dim cursor-not-allowed opacity-40"
                        : selecionado
                        ? "border-paizao-gold bg-paizao-gold text-paizao-bg glow-gold"
                        : "border-paizao-line text-paizao-ink hover:border-paizao-gold/50"
                    }`}
                    disabled={!disponivel}
                    aria-label={`Tamanho ${tam}${!disponivel ? " — esgotado" : ""}`}
                  >
                    {tam}
                    {!disponivel && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-px bg-paizao-ink-dim/40 rotate-45 absolute" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <BuyOnWhatsApp
              nome={`${produto.nome}${selectedSize ? ` — Tamanho ${selectedSize}` : ""}`}
              preco={produto.precoVarejo}
              size="lg"
              className="w-full"
            />
            <button className="w-full py-4 border-2 border-paizao-gold text-paizao-gold hover:bg-paizao-gold hover:text-paizao-bg font-bold rounded-full transition-all duration-300">
              Adicionar à sacola
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-paizao-line">
            {[
              { icon: <Truck size={20} />, label: "Envio nacional" },
              { icon: <Shield size={20} />, label: "Compra segura" },
              { icon: <RotateCcw size={20} />, label: "Troca fácil" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="text-paizao-gold">{icon}</span>
                <span className="text-xs text-paizao-ink-dim">{label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="border-t border-paizao-line pt-12">
          <FadeIn className="mb-8">
            <h2
              className="text-3xl sm:text-4xl text-paizao-ink"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              VOCÊ TAMBÉM PODE GOSTAR
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relacionados.map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

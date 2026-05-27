import type { Metadata } from "next";
import { produtos, categorias } from "@/lib/data/produtos";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGrid } from "@/components/motion/StaggerChildren";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Loja — Moda Masculina Completa",
  description:
    "Catálogo completo de moda masculina. Camisetas, polos, conjuntos, bermudas e mais. Atacado e varejo com envio nacional.",
};

export default function LojaPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <FadeIn className="mb-10">
        <p className="text-paizao-gold text-sm tracking-[0.3em] uppercase font-medium mb-2">
          Catálogo
        </p>
        <h1
          className="text-5xl sm:text-7xl text-paizao-ink leading-none"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          TODOS OS PRODUTOS
        </h1>
        <p className="text-paizao-ink-dim mt-3">{produtos.length} produtos disponíveis</p>
      </FadeIn>

      {/* Category chips */}
      <FadeIn delay={0.1} className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/loja"
          className="px-4 py-2 rounded-full bg-paizao-gold text-paizao-bg text-sm font-semibold"
        >
          Todos
        </Link>
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            href={`/loja/${cat.slug}`}
            className="px-4 py-2 rounded-full border border-paizao-line text-paizao-ink-dim hover:border-paizao-gold hover:text-paizao-gold text-sm transition-all"
          >
            {cat.nome}
          </Link>
        ))}
      </FadeIn>

      {/* Grid */}
      <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {produtos.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </StaggerGrid>
    </div>
  );
}

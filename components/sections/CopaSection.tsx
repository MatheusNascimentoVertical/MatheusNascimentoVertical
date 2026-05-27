import Link from "next/link";
import Image from "next/image";
import { getProdutosCopa } from "@/lib/data/produtos";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGrid } from "@/components/motion/StaggerChildren";
import { ArrowRight } from "lucide-react";

export function CopaSection() {
  const produtos = getProdutosCopa();

  if (produtos.length === 0) return null;

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Brazilian flag-inspired background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-paizao-green/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-paizao-yellow/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🇧🇷</span>
              <p className="text-paizao-green text-sm tracking-[0.3em] uppercase font-semibold">
                Copa do Mundo 2026
              </p>
            </div>
            <h2
              className="text-5xl sm:text-6xl leading-none"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              <span className="text-paizao-yellow">VESTE</span>{" "}
              <span className="text-paizao-ink">A</span>{" "}
              <span className="text-paizao-green">SELEÇÃO</span>
            </h2>
            <p className="text-paizao-ink-dim mt-3 text-lg">
              Já no clima! Camisas e produtos temáticos para torcer com estilo.
            </p>
          </div>

          <Link
            href="/loja/times"
            className="group inline-flex items-center gap-2 bg-paizao-green hover:bg-paizao-green/80 text-white font-bold px-6 py-3 rounded-full transition-all shrink-0"
          >
            Ver coleção
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

        {/* Products */}
        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {produtos.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

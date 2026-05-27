import { getProdutosDestaque } from "@/lib/data/produtos";
import { ProductCard } from "@/components/shop/ProductCard";
import { StaggerGrid } from "@/components/motion/StaggerChildren";
import { FadeIn } from "@/components/motion/FadeIn";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BestSellers() {
  const produtos = getProdutosDestaque();

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <FadeIn className="flex items-end justify-between mb-12">
        <div>
          <p className="text-paizao-gold text-sm tracking-[0.3em] uppercase font-medium mb-2">
            Mais Vendidos
          </p>
          <h2
            className="text-5xl sm:text-6xl text-paizao-ink leading-none"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            MAIS VENDIDOS
          </h2>
        </div>
        <Link
          href="/loja"
          className="hidden sm:inline-flex items-center gap-2 text-paizao-gold hover:text-paizao-gold-bright transition-colors text-sm font-medium group"
        >
          Ver todos
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </FadeIn>

      {/* Grid */}
      <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {produtos.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </StaggerGrid>

      {/* Mobile CTA */}
      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/loja"
          className="inline-flex items-center gap-2 border border-paizao-line hover:border-paizao-gold text-paizao-ink hover:text-paizao-gold font-medium px-6 py-3 rounded-full transition-all duration-300 text-sm"
        >
          Ver todos os produtos
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProdutosByCategoria, categorias } from "@/lib/data/produtos";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGrid } from "@/components/motion/StaggerChildren";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ categoria: string }>;
}

export async function generateStaticParams() {
  return categorias.map((cat) => ({ categoria: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const cat = categorias.find((c) => c.slug === categoria);
  if (!cat) return {};
  return {
    title: `${cat.nome} — Moda Masculina`,
    description: `Confira nossa coleção de ${cat.nome.toLowerCase()}. ${cat.descricao}. Atacado e varejo.`,
  };
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params;
  const cat = categorias.find((c) => c.slug === categoria);
  if (!cat) notFound();

  const produtos = getProdutosByCategoria(categoria);

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      {/* Back */}
      <FadeIn className="mb-8">
        <Link
          href="/loja"
          className="inline-flex items-center gap-2 text-paizao-ink-dim hover:text-paizao-gold transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Voltar para loja
        </Link>
      </FadeIn>

      {/* Header */}
      <FadeIn className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-5xl">{cat.icone}</span>
          <p className="text-paizao-gold text-sm tracking-[0.3em] uppercase font-medium">
            Categoria
          </p>
        </div>
        <h1
          className="text-5xl sm:text-7xl text-paizao-ink leading-none"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          {cat.nome.toUpperCase()}
        </h1>
        <p className="text-paizao-ink-dim mt-2">
          {produtos.length > 0
            ? `${produtos.length} produto${produtos.length !== 1 ? "s" : ""} encontrado${produtos.length !== 1 ? "s" : ""}`
            : "Nenhum produto encontrado"}
        </p>
      </FadeIn>

      {produtos.length > 0 ? (
        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {produtos.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </StaggerGrid>
      ) : (
        <div className="text-center py-20 text-paizao-ink-dim">
          <p className="text-6xl mb-4">{cat.icone}</p>
          <p className="text-xl">Estamos abastecendo esta categoria.</p>
          <p className="text-sm mt-2">Volte em breve ou fale conosco pelo WhatsApp!</p>
          <a
            href="https://wa.me/5561999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-wa-green text-white font-bold px-6 py-3 rounded-full"
          >
            Falar no WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

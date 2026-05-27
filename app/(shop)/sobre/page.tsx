import type { Metadata } from "next";
import { LojaFisica } from "@/components/sections/LojaFisica";
import { FadeIn } from "@/components/motion/FadeIn";
import { Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre — Paizão Modas no Gama-DF",
  description:
    "Conheça a história da Paizão Modas. Loja de moda masculina no Gama Leste, Brasília-DF. Moda com preço que cabe no bolso.",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="text-paizao-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Nossa história
          </p>
          <h1
            className="text-6xl sm:text-8xl text-paizao-ink leading-none mb-8"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            MODA COM A{" "}
            <span className="text-paizao-gold">ALMA</span>{" "}
            DA RUA
          </h1>
          <p className="text-paizao-ink-dim text-xl leading-relaxed max-w-2xl mx-auto">
            Nascemos no Gama-DF com a missão de trazer looks estilosos com preço que cabe no
            bolso. Streetwear, camisas de time e conjuntos esportivos para quem quer se vestir
            bem sem pagar caro.
          </p>
        </FadeIn>
      </section>

      {/* Values */}
      <section className="py-16 px-4 max-w-7xl mx-auto border-t border-paizao-line">
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: "Preço justo", desc: "Trabalhar na faixa de preço que o cliente merece. Sem exploração, sem enganação." },
            { title: "Qualidade real", desc: "Selecionamos produtos que a gente mesmo usaria. Cada peça passa pelo nosso crivo." },
            { title: "Comunidade", desc: "Somos do Gama, crescemos aqui e reinvestimos aqui. Comprar na Paizão é apoiar o local." },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <div className="space-y-3">
                <div className="w-8 h-1 bg-paizao-gold rounded" />
                <h3 className="text-2xl font-bold text-paizao-ink">{item.title}</h3>
                <p className="text-paizao-ink-dim leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 px-4">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center bg-paizao-surface border border-paizao-line rounded-3xl p-12">
            <Instagram size={40} className="text-paizao-gold mx-auto mb-4" />
            <h2
              className="text-4xl text-paizao-ink mb-3"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              SIGA NO INSTAGRAM
            </h2>
            <p className="text-paizao-ink-dim mb-6">
              +8.300 seguidores acompanham nossos lançamentos, looks e promoções diárias.
            </p>
            <a
              href="https://instagram.com/paizaomodas2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-paizao-gold hover:bg-paizao-gold-bright text-paizao-bg font-bold px-8 py-3 rounded-full transition-all"
            >
              <Instagram size={18} />
              @paizaomodas2
            </a>
          </div>
        </FadeIn>
      </section>

      <LojaFisica />
    </div>
  );
}

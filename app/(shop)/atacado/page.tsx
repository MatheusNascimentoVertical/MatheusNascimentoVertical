import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowRight, Package, TrendingUp, Users, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Atacado — Seja um Revendedor Paizão",
  description:
    "Programa de revendedores Paizão Modas. Preços exclusivos de atacado, suporte dedicado e catálogo especial. Cadastre-se agora.",
};

const BENEFICIOS = [
  { icon: <TrendingUp size={24} />, titulo: "Até 40% de desconto", desc: "Preços exclusivos de atacado em toda a linha" },
  { icon: <Package size={24} />, titulo: "Mínimo de 10 peças", desc: "Comece com pouco e cresça no seu ritmo" },
  { icon: <Users size={24} />, titulo: "Suporte dedicado", desc: "Atendimento prioritário via WhatsApp" },
];

const COMO_FUNCIONA = [
  { num: "01", titulo: "Cadastro", desc: "Preencha o formulário com seus dados. Simples e rápido." },
  { num: "02", titulo: "Aprovação", desc: "Nossa equipe avalia e entra em contato em até 24h úteis." },
  { num: "03", titulo: "Acesso", desc: "Receba login para o catálogo exclusivo de revendedores." },
  { num: "04", titulo: "Pedido", desc: "Monte sua grade e finalize pelo WhatsApp. Simples assim." },
];

export default function AtacadoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, #1a265433 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-paizao-gold/10 border border-paizao-gold/30 rounded-full px-4 py-2 mb-6">
              <Package size={14} className="text-paizao-gold" />
              <span className="text-xs font-semibold text-paizao-gold tracking-widest uppercase">
                Programa de Revendedores
              </span>
            </div>
            <h1
              className="text-6xl sm:text-8xl text-paizao-ink leading-none mb-6"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              GANHE DINHEIRO COM{" "}
              <span className="text-paizao-gold">MODA</span>
            </h1>
            <p className="text-paizao-ink-dim text-xl max-w-2xl mx-auto mb-8">
              Compre no atacado com preço de fábrica e revenda com sua margem.
              Paizão Modas é parceiro do seu negócio.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#cadastro"
                className="group inline-flex items-center gap-2 bg-paizao-gold hover:bg-paizao-gold-bright text-paizao-bg font-bold px-8 py-4 rounded-full transition-all glow-gold"
              >
                Cadastrar agora
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/5561999999999?text=Ol%C3%A1!%20Tenho%20interesse%20em%20ser%20revendedor%20da%20Paiz%C3%A3o%20Modas."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-paizao-line hover:border-paizao-gold text-paizao-ink hover:text-paizao-gold font-medium px-8 py-4 rounded-full transition-all"
              >
                Falar no WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 px-4 max-w-7xl mx-auto" id="como-funciona">
        <div className="grid sm:grid-cols-3 gap-6">
          {BENEFICIOS.map((b, i) => (
            <ScrollReveal key={b.titulo} delay={i * 0.1}>
              <div className="bg-paizao-surface border border-paizao-line rounded-2xl p-8 text-center space-y-4 hover:border-paizao-gold/40 transition-colors">
                <div className="w-12 h-12 bg-paizao-gold/10 rounded-xl flex items-center justify-center mx-auto text-paizao-gold">
                  {b.icon}
                </div>
                <h3 className="font-bold text-paizao-ink text-lg">{b.titulo}</h3>
                <p className="text-paizao-ink-dim text-sm">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 px-4 max-w-7xl mx-auto border-t border-paizao-line">
        <FadeIn className="text-center mb-12">
          <h2
            className="text-4xl sm:text-5xl text-paizao-ink"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            COMO FUNCIONA
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMO_FUNCIONA.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.1}>
              <div className="space-y-3">
                <div
                  className="text-5xl font-heavy text-paizao-gold/30"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  {step.num}
                </div>
                <h3 className="font-bold text-paizao-ink">{step.titulo}</h3>
                <p className="text-paizao-ink-dim text-sm leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Formulário de cadastro */}
      <section className="py-16 px-4" id="cadastro">
        <div className="max-w-xl mx-auto">
          <FadeIn className="text-center mb-10">
            <h2
              className="text-4xl sm:text-5xl text-paizao-ink"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              CADASTRO DE REVENDEDOR
            </h2>
            <p className="text-paizao-ink-dim mt-3">
              Preencha os dados abaixo. Nossa equipe entrará em contato em até 24h.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form
              action={`https://wa.me/5561999999999`}
              className="bg-paizao-surface border border-paizao-line rounded-2xl p-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const msg = `🏪 *CADASTRO REVENDEDOR — PAIZÃO MODAS*\n\nNome: ${data.get("nome")}\nEmail: ${data.get("email")}\nWhatsApp: ${data.get("whatsapp")}\nCidade/UF: ${data.get("cidade")}\nCNPJ/CPF: ${data.get("documento") || "Não informado"}\n\nQuero ser revendedor!`;
                window.open(`https://wa.me/5561999999999?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              {[
                { name: "nome", label: "Nome completo", type: "text", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "whatsapp", label: "WhatsApp", type: "tel", required: true },
                { name: "cidade", label: "Cidade / UF", type: "text", required: true },
                { name: "documento", label: "CPF ou CNPJ (opcional)", type: "text", required: false },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-paizao-ink mb-2">
                    {field.label}{field.required && <span className="text-paizao-gold ml-1">*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    className="w-full bg-paizao-surface-2 border border-paizao-line rounded-xl px-4 py-3 text-paizao-ink placeholder-paizao-ink-dim focus:outline-none focus:border-paizao-gold transition-colors"
                    placeholder={field.label}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-paizao-gold hover:bg-paizao-gold-bright text-paizao-bg font-bold py-4 rounded-full transition-all glow-gold mt-2"
              >
                Enviar cadastro pelo WhatsApp
              </button>

              <p className="text-xs text-paizao-ink-dim text-center">
                Ao enviar, você será redirecionado para o WhatsApp com seus dados.
              </p>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

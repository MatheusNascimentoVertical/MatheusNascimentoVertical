"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Package, TrendingUp, Users } from "lucide-react";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

function AnimatedStat({ value, suffix = "", label, icon }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex justify-center mb-2 text-paizao-gold">{icon}</div>
      <div
        className="text-4xl font-heavy text-paizao-gold mb-1"
        style={{ fontFamily: "var(--font-archivo-black)" }}
      >
        {count}{suffix}
      </div>
      <p className="text-sm text-paizao-ink-dim">{label}</p>
    </div>
  );
}

export function AtacadoBanner() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-paizao-gold/20 bg-paizao-surface"
          style={{
            background:
              "linear-gradient(135deg, #0f1424 0%, #1a2654 50%, #0a0e1a 100%)",
          }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-paizao-gold/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-paizao-navy/50 blur-3xl" />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #d4a93a 0, #d4a93a 1px, transparent 0, transparent 50%)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-paizao-gold/10 border border-paizao-gold/30 rounded-full px-4 py-2">
                  <Package size={14} className="text-paizao-gold" />
                  <span className="text-xs font-semibold text-paizao-gold tracking-widest uppercase">
                    Programa de Atacado
                  </span>
                </div>

                <h2
                  className="text-5xl sm:text-6xl lg:text-7xl text-paizao-ink leading-none"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  SEJA UM<br />
                  <span className="text-paizao-gold">REVENDEDOR</span>
                </h2>

                <p className="text-paizao-ink-dim text-lg leading-relaxed max-w-md">
                  Compre no atacado com preço de fábrica e revenda na sua cidade.
                  Suporte completo da equipe Paizão Modas.
                </p>

                <ul className="space-y-3 text-sm text-paizao-ink-dim">
                  {[
                    "Preços exclusivos de atacado (até 40% off)",
                    "Mínimo de 10 peças por pedido",
                    "Desconto progressivo por volume",
                    "Catálogo digital exclusivo para revendedores",
                    "Suporte via WhatsApp dedicado",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-paizao-gold rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/atacado"
                    className="group inline-flex items-center gap-2 bg-paizao-gold hover:bg-paizao-gold-bright text-paizao-bg font-bold px-8 py-4 rounded-full transition-all duration-300 glow-gold"
                  >
                    Quero ser revendedor
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/atacado#como-funciona"
                    className="inline-flex items-center gap-2 text-paizao-gold hover:text-paizao-gold-bright font-medium px-4 py-4 transition-colors"
                  >
                    Saiba mais →
                  </Link>
                </div>
              </div>

              {/* Right — Stats */}
              <div className="grid grid-cols-3 gap-8">
                <AnimatedStat
                  value={40}
                  suffix="%"
                  label="de desconto no atacado"
                  icon={<TrendingUp size={24} />}
                />
                <AnimatedStat
                  value={10}
                  suffix="+"
                  label="peças mínimo"
                  icon={<Package size={24} />}
                />
                <AnimatedStat
                  value={200}
                  suffix="+"
                  label="revendedores ativos"
                  icon={<Users size={24} />}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CONFETTI_ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
  color: i % 3 === 0 ? "#ffdf00" : i % 3 === 1 ? "#009c3b" : "#d4a93a",
  size: 6 + Math.random() * 8,
  rotate: Math.random() * 360,
}));

export function HeroCopa() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, #1a2654 0%, #0a0e1a 60%), radial-gradient(ellipse at 80% 20%, #009c3b22 0%, transparent 50%)",
        }}
      />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#d4a93a 1px, transparent 1px), linear-gradient(90deg, #d4a93a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Confetti */}
      {!reduceMotion &&
        CONFETTI_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            className="absolute rounded-sm pointer-events-none"
            style={{
              left: `${item.x}%`,
              top: "-20px",
              width: item.size,
              height: item.size,
              backgroundColor: item.color,
              rotate: item.rotate,
            }}
            animate={{
              y: ["0vh", "110vh"],
              rotate: [item.rotate, item.rotate + 360],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div className="space-y-6">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 bg-paizao-green/20 border border-paizao-green/40 rounded-full px-4 py-2"
          >
            <motion.span
              animate={reduceMotion ? {} : { scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 bg-paizao-green rounded-full"
            />
            <span className="text-sm font-semibold text-paizao-green tracking-widest uppercase">
              Copa 2026 — Já no clima!
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="leading-none"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            <span className="block text-7xl sm:text-8xl lg:text-[120px] text-paizao-ink tracking-tight">
              VESTE A
            </span>
            <span
              className="block text-7xl sm:text-8xl lg:text-[120px] tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffdf00, #009c3b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SELEÇÃO
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-paizao-ink-dim text-lg max-w-md leading-relaxed"
          >
            Camisas do Brasil, conjuntos e muito mais. Envio nacional, preço de quem veio
            da rua.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link
              href="/loja/times"
              className="group relative inline-flex items-center gap-2 bg-paizao-gold hover:bg-paizao-gold-bright text-paizao-bg font-bold px-8 py-4 rounded-full transition-all duration-300 glow-gold"
            >
              Ver Coleção Copa
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/loja"
              className="inline-flex items-center gap-2 border border-paizao-line hover:border-paizao-gold text-paizao-ink hover:text-paizao-gold font-medium px-8 py-4 rounded-full transition-all duration-300"
            >
              Ver Tudo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex gap-8 pt-4 border-t border-paizao-line"
          >
            {[
              { num: "8.3K", label: "Seguidores" },
              { num: "793", label: "Posts" },
              { num: "★ 4.9", label: "Avaliação" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-heavy text-paizao-gold"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  {stat.num}
                </div>
                <div className="text-xs text-paizao-ink-dim tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Glow circle */}
          <div className="absolute w-80 h-80 rounded-full bg-paizao-green/10 blur-3xl" />
          <div className="absolute w-64 h-64 rounded-full bg-paizao-yellow/10 blur-3xl translate-x-12" />

          {/* Jersey shape */}
          <div className="relative w-64 h-80">
            <BrazilJerseySVG />
          </div>

          {/* Floating vuvuzela */}
          <motion.div
            className="absolute -bottom-4 -right-8 text-6xl"
            animate={reduceMotion ? {} : {
              rotate: [-5, 10, -5],
              scale: [1, 1.05, 1],
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            📯
          </motion.div>

          {/* Floating ball */}
          <motion.div
            className="absolute -top-4 -left-8 text-5xl"
            animate={reduceMotion ? {} : {
              y: [-8, 8, -8],
              rotate: [0, 20, 0],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            ⚽
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs text-paizao-ink-dim tracking-[0.3em] uppercase">
          Explorar
        </span>
        <motion.div
          className="w-0.5 h-8 bg-paizao-gold/50 rounded"
          animate={reduceMotion ? {} : { scaleY: [0, 1, 0], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </section>
  );
}

function BrazilJerseySVG() {
  return (
    <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      <defs>
        <linearGradient id="jersey-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffdf00" />
          <stop offset="50%" stopColor="#f0c64a" />
          <stop offset="100%" stopColor="#e6b800" />
        </linearGradient>
        <linearGradient id="collar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#009c3b" />
          <stop offset="100%" stopColor="#006d29" />
        </linearGradient>
      </defs>

      {/* Main body */}
      <path
        d="M30 60 L0 90 L20 100 L20 260 L180 260 L180 100 L200 90 L170 60 L140 40 C130 70 70 70 60 40 Z"
        fill="url(#jersey-grad)"
      />

      {/* Green diamond */}
      <path
        d="M100 90 L160 150 L100 210 L40 150 Z"
        fill="url(#collar-grad)"
        opacity="0.3"
      />

      {/* Collar */}
      <path
        d="M80 40 C80 50 90 58 100 58 C110 58 120 50 120 40"
        stroke="url(#collar-grad)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Sleeve left */}
      <path d="M30 60 L0 90 L20 100 L50 70 Z" fill="url(#jersey-grad)" opacity="0.9" />

      {/* Sleeve right */}
      <path d="M170 60 L200 90 L180 100 L150 70 Z" fill="url(#jersey-grad)" opacity="0.9" />

      {/* CBF badge placeholder */}
      <circle cx="75" cy="120" r="18" fill="url(#collar-grad)" opacity="0.8" />
      <text x="75" y="126" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CBF</text>

      {/* Stars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <text key={i} x={85 + i * 10} y="105" textAnchor="middle" fill="#ffdf00" fontSize="8">★</text>
      ))}

      {/* BRASIL text */}
      <text x="130" y="130" fill="#009c3b" fontSize="10" fontWeight="bold" fontFamily="Arial">BRASIL</text>
    </svg>
  );
}

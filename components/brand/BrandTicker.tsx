import { MarqueeText } from "@/components/motion/MarqueeText";

const TICKER_ITEMS = [
  "FRETE GRÁTIS ACIMA DE R$ 250",
  "PIX COM 10% DE DESCONTO",
  "ATACADO & VAREJO",
  "ENVIO NACIONAL",
  "COPA 2026 — VESTE A SELEÇÃO",
  "MODA MASCULINA NO GAMA-DF",
  "LOOKS ESTILOSOS COM PREÇO QUE CABE NO BOLSO",
];

export function BrandTicker() {
  return (
    <div className="bg-paizao-gold border-y border-paizao-gold-soft py-3">
      <MarqueeText
        items={TICKER_ITEMS}
        speed={60}
        textClassName="font-display text-paizao-bg text-sm tracking-[0.2em]"
      />
    </div>
  );
}

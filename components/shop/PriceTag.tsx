import { formatPrice } from "@/lib/utils";

interface PriceTagProps {
  preco: number;
  precoPromocional?: number;
  showInstallment?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { main: "text-lg", original: "text-xs", installment: "text-xs" },
  md: { main: "text-2xl", original: "text-sm", installment: "text-sm" },
  lg: { main: "text-4xl", original: "text-base", installment: "text-sm" },
};

export function PriceTag({ preco, precoPromocional, showInstallment = false, size = "md" }: PriceTagProps) {
  const s = sizes[size];
  const currentPrice = precoPromocional ?? preco;
  const discount = precoPromocional
    ? Math.round((1 - precoPromocional / preco) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-2 flex-wrap">
        <span
          className={`${s.main} font-heavy text-paizao-gold`}
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          {formatPrice(currentPrice)}
        </span>
        {precoPromocional && (
          <span className={`${s.original} text-paizao-ink-dim line-through`}>
            {formatPrice(preco)}
          </span>
        )}
        {discount > 0 && (
          <span className="text-xs font-bold bg-paizao-red/20 text-paizao-red px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>
      {showInstallment && (
        <span className={`${s.installment} text-paizao-ink-dim`}>
          ou 3x {formatPrice(currentPrice / 3)} sem juros
        </span>
      )}
      <span className={`${s.installment} text-paizao-green font-medium`}>
        PIX: {formatPrice(currentPrice * 0.9)} (10% off)
      </span>
    </div>
  );
}

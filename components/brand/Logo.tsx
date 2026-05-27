import { LogoMark } from "./LogoMark";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

const sizes = {
  sm: { mark: 32, title: "text-xl", sub: "text-[10px]" },
  md: { mark: 44, title: "text-2xl", sub: "text-xs" },
  lg: { mark: 64, title: "text-4xl", sub: "text-sm" },
};

export function Logo({ size = "md", className, showText = true }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <LogoMark size={s.mark} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-display ${s.title} tracking-[0.15em] text-paizao-gold`}
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            PAIZÃO
          </span>
          <span
            className={`${s.sub} tracking-[0.3em] text-paizao-ink-dim uppercase`}
          >
            Modas
          </span>
        </div>
      )}
    </div>
  );
}

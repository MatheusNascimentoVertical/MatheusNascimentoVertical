interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 40, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Paizão Modas logo"
    >
      <defs>
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a2654" />
          <stop offset="60%" stopColor="#1a2654" />
          <stop offset="100%" stopColor="#009c3b" />
        </linearGradient>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0c64a" />
          <stop offset="100%" stopColor="#b89030" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="50" cy="50" r="48" fill="url(#bg-grad)" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="url(#gold-grad)" strokeWidth="2.5" />

      {/* Shield shape */}
      <path
        d="M50 15 L72 26 L72 52 C72 65 62 75 50 80 C38 75 28 65 28 52 L28 26 Z"
        fill="url(#gold-grad)"
        opacity="0.15"
      />
      <path
        d="M50 15 L72 26 L72 52 C72 65 62 75 50 80 C38 75 28 65 28 52 L28 26 Z"
        fill="none"
        stroke="url(#gold-grad)"
        strokeWidth="2"
      />

      {/* P letter */}
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill="url(#gold-grad)"
        fontSize="36"
        fontWeight="700"
        fontFamily="serif"
      >
        P
      </text>

      {/* Stars */}
      <text x="35" y="20" fill="#f0c64a" fontSize="8" textAnchor="middle">★</text>
      <text x="50" y="14" fill="#f0c64a" fontSize="8" textAnchor="middle">★</text>
      <text x="65" y="20" fill="#f0c64a" fontSize="8" textAnchor="middle">★</text>
    </svg>
  );
}

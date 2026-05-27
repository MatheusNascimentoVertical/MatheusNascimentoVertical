import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

const LINKS_LOJA = [
  { href: "/loja", label: "Ver tudo" },
  { href: "/loja/camisetas", label: "Camisetas" },
  { href: "/loja/times", label: "Times" },
  { href: "/loja/conjuntos", label: "Conjuntos" },
  { href: "/loja/polos", label: "Polos" },
  { href: "/loja/bermudas", label: "Bermudas" },
];

const LINKS_EMPRESA = [
  { href: "/sobre", label: "A Loja" },
  { href: "/atacado", label: "Seja Revendedor" },
  { href: "/sobre#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="bg-paizao-surface border-t border-paizao-line mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-paizao-ink-dim text-sm leading-relaxed">
              Looks estilosos com preço que cabe no bolso. Moda masculina no coração do Gama-DF.
            </p>
            <a
              href="https://instagram.com/paizaomodas2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-paizao-gold hover:text-paizao-gold-bright transition-colors text-sm"
              aria-label="Seguir no Instagram"
            >
              <Instagram size={16} />
              @paizaomodas2
            </a>
          </div>

          {/* Loja */}
          <div>
            <h3 className="text-paizao-gold font-display tracking-widest text-sm mb-4">
              LOJA
            </h3>
            <ul className="space-y-2">
              {LINKS_LOJA.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paizao-ink-dim hover:text-paizao-ink text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-paizao-gold font-display tracking-widest text-sm mb-4">
              EMPRESA
            </h3>
            <ul className="space-y-2">
              {LINKS_EMPRESA.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paizao-ink-dim hover:text-paizao-ink text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div id="contato">
            <h3 className="text-paizao-gold font-display tracking-widest text-sm mb-4">
              ONDE ESTAMOS
            </h3>
            <ul className="space-y-3 text-sm text-paizao-ink-dim">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="shrink-0 mt-0.5 text-paizao-gold" />
                <span>Quadra 09 lote 70<br />Gama Leste, Brasília-DF</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-paizao-gold" />
                <a
                  href="https://wa.me/5561999999999"
                  className="hover:text-paizao-ink transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (61) 9 9999-9999
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="shrink-0 mt-0.5 text-paizao-gold" />
                <span>
                  Seg–Sáb: 9h às 19h<br />
                  Dom: Fechado
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-paizao-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paizao-ink-dim">
          <p>
            © {new Date().getFullYear()} Paizão Modas. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span>Pagamentos:</span>
            <span className="bg-paizao-surface-2 px-2 py-1 rounded text-[10px] font-medium">PIX</span>
            <span className="bg-paizao-surface-2 px-2 py-1 rounded text-[10px] font-medium">CARTÃO</span>
            <span className="bg-paizao-surface-2 px-2 py-1 rounded text-[10px] font-medium">BOLETO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

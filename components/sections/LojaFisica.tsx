import { FadeIn } from "@/components/motion/FadeIn";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

const HORARIOS = [
  { dia: "Segunda a Sexta", horario: "9h às 19h" },
  { dia: "Sábado", horario: "9h às 18h" },
  { dia: "Domingo", horario: "Fechado" },
];

export function LojaFisica() {
  return (
    <section className="py-20 px-4 bg-paizao-surface border-y border-paizao-line" id="loja-fisica">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="text-paizao-gold text-sm tracking-[0.3em] uppercase font-medium mb-2">
            Venha nos visitar
          </p>
          <h2
            className="text-5xl sm:text-6xl text-paizao-ink leading-none"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            LOJA FÍSICA
          </h2>
          <p className="text-paizao-ink-dim mt-3 max-w-md mx-auto">
            Venha conhecer nosso espaço no Gama-DF. Aqui você experimenta, escolhe e sai
            com o look completo.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Map placeholder */}
          <FadeIn direction="left" className="h-full">
            <div className="h-full min-h-[300px] bg-paizao-surface-2 rounded-2xl border border-paizao-line overflow-hidden relative">
              {/* Embedded Google Maps iframe would go here */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-paizao-ink-dim">
                <MapPin size={48} className="text-paizao-gold" />
                <div className="text-center">
                  <p className="font-semibold text-paizao-ink">Paizão Modas</p>
                  <p className="text-sm">Quadra 09 lote 70, Gama Leste</p>
                  <p className="text-sm">Brasília-DF</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Quadra+09+lote+70+Gama+Leste+Brasilia+DF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-paizao-gold hover:bg-paizao-gold-bright text-paizao-bg font-semibold px-6 py-3 rounded-full transition-colors text-sm"
                >
                  <Navigation size={16} />
                  Abrir no Maps
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Info */}
          <FadeIn direction="right" className="space-y-6">
            {/* Address */}
            <div className="bg-paizao-surface-2 rounded-2xl p-6 border border-paizao-line">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-paizao-gold/10 rounded-xl">
                  <MapPin size={24} className="text-paizao-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-paizao-ink mb-1">Endereço</h3>
                  <p className="text-paizao-ink-dim text-sm leading-relaxed">
                    Quadra 09 lote 70<br />
                    Gama Leste, Brasília-DF<br />
                    CEP: 72400-000
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-paizao-surface-2 rounded-2xl p-6 border border-paizao-line">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-paizao-gold/10 rounded-xl">
                  <Clock size={24} className="text-paizao-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-paizao-ink mb-3">Horários</h3>
                  <ul className="space-y-2">
                    {HORARIOS.map(({ dia, horario }) => (
                      <li key={dia} className="flex justify-between text-sm">
                        <span className="text-paizao-ink-dim">{dia}</span>
                        <span
                          className={
                            horario === "Fechado"
                              ? "text-paizao-red font-medium"
                              : "text-paizao-ink font-medium"
                          }
                        >
                          {horario}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-paizao-surface-2 rounded-2xl p-6 border border-paizao-line">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-paizao-gold/10 rounded-xl">
                  <Phone size={24} className="text-paizao-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-paizao-ink mb-1">Contato</h3>
                  <a
                    href="https://wa.me/5561999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paizao-gold hover:text-paizao-gold-bright transition-colors font-medium"
                  >
                    (61) 9 9999-9999 — WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

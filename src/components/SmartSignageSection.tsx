import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Wifi, Eye } from "lucide-react";
import nfcIcon from "@/assets/nfc-icon-v3.png";
import accesibilidadIcon from "@/assets/accesibilidad-icon.png";
import navilensLogo from "@/assets/navilens-logo.png";
import visualfyLogo from "@/assets/visualfy-logo.png";
import qrScanImg from "@/assets/qr-scan.png";
import accesibilidadImg from "@/assets/accesibilidad.jpg";

type Tab = {
  id: string;
  label: string;
  icon?: typeof QrCode;
  iconImage?: string;
  headline: string;
  desc: string;
  image?: string;
  cards?: { logo: string; title: string; desc: string }[];
};

const tabs: Tab[] = [
  {
    id: "qr",
    label: "QR",
    icon: QrCode,
    headline: "La información que quieras a un solo gesto",
    desc: "Añade vídeos e imágenes, chat soporte, encuestas de satisfacción, acciones sociales (seguir, compartir...), solicitud de cita previa, buzón de sugerencias, tablón de anuncios.",
    image: qrScanImg,
  },
  {
    id: "nfc",
    label: "NFC",
    iconImage: nfcIcon,
    headline: "Controla todo tu negocio en un mismo panel",
    desc: "Una solución Wi-Fi que permite a los clientes utilizar servicios digitales en un establecimiento y estar conectados.",
    image: "/Web/uploads/nfc-device.png",
  },
  {
    id: "accesibilidad",
    label: "Accesibilidad",
    iconImage: accesibilidadIcon,
    headline: "Ponérselo más sencillo a los que lo tienen más difícil",
    desc: "Soluciones tecnológicas que hacen los espacios más inclusivos, ayudando a personas con discapacidad visual y auditiva a interactuar con su entorno de forma autónoma.",
    image: accesibilidadImg,
    cards: [
      {
        logo: navilensLogo,
        title: "Discapacidad visual",
        desc: "NaviLens permite a personas con discapacidad visual guiarse en interiores de forma autónoma gracias a marcadores visuales de alcance y alta densidad.",
      },
      {
        logo: visualfyLogo,
        title: "Discapacidad auditiva",
        desc: "Visualfy convierte los sonidos del entorno en alertas visuales y vibraciones, mejorando la accesibilidad para personas con discapacidad auditiva.",
      },
    ],
  },
];

const SmartSignageSection = () => {
  const [active, setActive] = useState(0);
  const current = tabs[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const updatePill = useCallback(() => {
    if (tabRefs.current[active] && containerRef.current) {
      const btn = tabRefs.current[active]!;
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [active]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">Smart Signage</h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground w-full">
            El Smart Signage es la evolución del digital signage tradicional, que combina pantallas digitales con
            tecnologías inteligentes como sensores, analítica de datos, inteligencia artificial e integración con
            sistemas externos. Esto permite ofrecer contenidos dinámicos, contextuales y automatizados en función del
            entorno y del comportamiento del usuario.
          </p>
        </motion.div>

        {/* Tabs with sliding pill */}
        <div
          ref={containerRef}
          className="relative inline-flex gap-1 mb-10 p-1 rounded-full bg-muted/50"
        >
          {/* Sliding gradient pill */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-primary to-[hsl(190,80%,45%)] shadow-lg shadow-primary/20 pointer-events-none"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              transition: "left 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isHighlighted = active === i;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => setActive(i)}
                className={`relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-full text-[15px] font-semibold transition-colors duration-300 ${
                  isHighlighted ? "text-white" : "text-muted-foreground"
                }`}
              >
                {tab.iconImage ? (
                  <span
                    aria-hidden
                    className="w-7 h-7 bg-current transition-colors duration-300"
                    style={{
                      WebkitMaskImage: `url(${tab.iconImage})`,
                      maskImage: `url(${tab.iconImage})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                  />
                ) : Icon ? (
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${isHighlighted ? "text-white" : ""}`} />
                ) : null}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16 items-start"
          >
            {/* Left: image or info */}
            {current.image ? (
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img src={current.image} alt={current.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-5 leading-tight">
                  {current.headline}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{current.desc}</p>
              </div>
            )}

            {/* Right: info + optional cards */}
            <div>
              {current.cards ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {current.cards.map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                      className="group relative rounded-2xl p-5 bg-card/60 backdrop-blur-xl border border-border/40 shadow-[0_2px_20px_-8px_hsl(220_15%_15%/0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.25)] hover:border-primary/20"
                    >
                      <div className="relative mb-4 h-16 flex items-center">
                        <img src={card.logo} alt={card.title} className="relative w-20 h-16 object-contain" />
                      </div>
                      <h4 className="text-[15px] font-semibold text-foreground mb-1.5 tracking-tight">
                        {card.title}
                      </h4>
                      <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                        {card.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-5 leading-tight">
                    {current.headline}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{current.desc}</p>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default SmartSignageSection;

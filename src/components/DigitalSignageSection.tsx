import * as React from "react";
import { motion } from "framer-motion";
import gestionContenidoImg from "@/assets/gestion-contenido.png";
import integracionSoftwareImg from "@/assets/integracion-software.jpg";

const features = [
  {
    icon: gestionContenidoImg,
    isImage: true,
    title: "Gestión de contenido",
    desc: "Controla, programa y actualiza cualquier pantalla en tiempo real desde una única plataforma.",
  },
  {
    icon: integracionSoftwareImg,
    isImage: true,
    title: "Integración de software",
    desc: "Conecta Digital Signage con herramientas corporativas, APIs, dashboards y sistemas internos.",
  },
];

const DigitalSignageSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Soft ambient backdrop — minimal */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-40 w-[480px] h-[480px] rounded-full bg-primary/[0.06] blur-[160px]" />
        <div className="absolute bottom-0 -right-32 w-[420px] h-[420px] rounded-full bg-[hsl(190,80%,45%)]/[0.05] blur-[160px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left — Text + Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-tight">
              Digital Signage
            </h2>

            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Soluciones personalizadas que acercan tu marca a los usuarios de forma sencilla, creando
              experiencias únicas. Servicio integral que incluye instalación de pantallas, software
              y sistemas de gestión.
            </p>

            {/* Compact premium cards */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {features.map((feature, i) => {
                const Icon = feature.isImage ? null : (feature.icon as any);
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.08 }}
                    className="group relative rounded-2xl p-5 bg-card/60 backdrop-blur-xl border border-border/40 shadow-[0_2px_20px_-8px_hsl(220_15%_15%/0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.25)] hover:border-primary/20"
                  >
                    {feature.isImage ? (
                      <div className="relative mb-4 h-16 flex items-center">
                        <img src={feature.icon as string} alt={feature.title} className="relative w-20 h-16 object-contain" />
                      </div>
                    ) : (
                      <div className="relative w-12 h-12 rounded-2xl mb-4 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-[hsl(190,80%,45%)]/10 border border-primary/15 shadow-inner">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                        <Icon className="relative w-5 h-5 text-primary" strokeWidth={1.75} />
                        <div className="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    )}

                    <h3 className="text-[15px] font-semibold text-foreground mb-1.5 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Smaller floating image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[360px] mx-auto lg:max-w-[380px] lg:ml-auto"
          >
            <div className="absolute -inset-8 rounded-[2rem] bg-primary/10 blur-3xl opacity-60" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-[1.5rem] overflow-hidden border border-border/40 shadow-[0_20px_60px_-20px_hsl(220_15%_15%/0.25)]"
            >
              <img
                src="/Web/uploads/digital-signage.png"
                alt="Digital Signage"
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DigitalSignageSection;

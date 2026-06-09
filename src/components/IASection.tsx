import React from "react";
import { motion } from "framer-motion";
import { Bot, MessageSquare, Cpu, Sparkles } from "lucide-react";

import iaAdaptable from "@/assets/ia-adaptable.png";
import iaAvatar from "@/assets/ia-avatar.png";
import iaAgente from "@/assets/ia-agente.png";

const FEATURES = [
  {
    id: "adaptable",
    title: "IA Adaptable",
    text: "Modelos que aprenden, se ajustan y evolucionan con cada interacción.",
    icon: Cpu,
    image: iaAdaptable,
  },
  {
    id: "avatar",
    title: "Avatar IA",
    text: "Una presencia digital cercana, visual y siempre disponible.",
    icon: Bot,
    image: iaAvatar,
  },
  {
    id: "agente",
    title: "Agente IA",
    text: "Automatiza tareas, responde usuarios y trabaja en segundo plano.",
    icon: MessageSquare,
    image: iaAgente,
  },
];

const IASection = () => {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Fondo limpio */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-[hsl(190,80%,50%)]/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative max-w-[1180px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header centrado y más corto */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-5">
            <Sparkles size={13} className="text-[hsl(190,80%,45%)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Inteligencia Artificial
            </span>
          </div>

          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.05] tracking-tight">
            IA visual, útil y lista para conectar.
          </h2>

          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Avatares, agentes y modelos inteligentes para crear experiencias digitales más humanas.
          </p>
        </motion.div>

        {/* Imagen principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[520px] mx-auto mb-10 md:mb-14"
        >
          <div className="absolute inset-0 bg-[hsl(190,80%,50%)]/25 blur-[90px] rounded-full scale-90" />

          <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-[hsl(190,80%,55%)]/70 via-white/10 to-transparent shadow-[0_35px_100px_-45px_hsl(190,80%,40%,0.8)]">
            <div className="rounded-[2rem] bg-card overflow-hidden">
              <img
                src={iaAvatar}
                alt="Avatar IA"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Cards visuales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(190,80%,45%)]/40 hover:shadow-[0_20px_60px_-35px_hsl(190,80%,40%,0.7)]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[hsl(190,80%,50%)]/8 to-transparent" />

                <div className="relative flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl border border-border bg-background/70 flex items-center justify-center text-[hsl(190,80%,40%)]">
                    <Icon size={19} strokeWidth={1.9} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground text-base">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IASection;

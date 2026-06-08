import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageSquare, Cpu, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import iaAdaptable from "@/assets/ia-adaptable.png";
import iaAvatar from "@/assets/ia-avatar.png";
import iaAgente from "@/assets/ia-agente.png";

const FEATURES = [
  {
    id: "adaptable",
    label: "IA Adaptable",
    subtitle: "Inteligencia que se adapta a ti",
    icon: Cpu,
    tag: "Adaptive intelligence",
    image: iaAdaptable,
  },
  {
    id: "avatar",
    label: "Avatar IA",
    subtitle: "Tu compañero digital",
    icon: Bot,
    tag: "Digital presence",
    image: iaAvatar,
  },
  {
    id: "agente",
    label: "Agente IA",
    subtitle: "Trabajando por y para ti",
    icon: MessageSquare,
    tag: "Autonomous agent",
    image: iaAgente,
  },
];

const AUTO_PLAY_INTERVAL = 6500;

const IASection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % FEATURES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(t);
  }, [next, isPaused]);

  const active = FEATURES[activeIndex];

  return (
    <section className="relative py-20 md:py-24 bg-background overflow-hidden">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(190,80%,45%)]/8 blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(var(--primary))]/6 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-14 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm mb-5">
            <Sparkles size={13} className="text-[hsl(190,80%,45%)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Inteligencia Artificial
            </span>
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.05] tracking-tight">
            Soluciones IA que transforman experiencias.
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Desde agentes autónomos hasta avatares y modelos adaptables diseñados para conectar, entender y evolucionar contigo.
          </p>
        </motion.div>

        {/* Split asymmetric layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-center"
        >
          {/* LEFT — Compact selector */}
          <div className="flex flex-col gap-3 lg:pt-4">
            {FEATURES.map((f, i) => {
              const isActive = i === activeIndex;
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className={cn(
                    "group relative text-left rounded-xl p-[1px] transition-all duration-500 overflow-hidden",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl transition-opacity duration-500",
                      isActive
                        ? "opacity-100 bg-gradient-to-br from-[hsl(190,80%,45%)] via-[hsl(190,80%,45%)]/40 to-transparent"
                        : "opacity-100 bg-border/60 group-hover:bg-border",
                    )}
                  />
                  <div
                    className={cn(
                      "relative rounded-xl px-4 py-3.5 backdrop-blur-xl transition-all duration-500 flex items-center gap-3.5",
                      isActive
                        ? "bg-card shadow-[0_0_30px_-8px_hsl(190,80%,45%,0.4)]"
                        : "bg-card/80 group-hover:bg-card",
                    )}
                  >
                    {/* Active indicator bar */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="ia-active-indicator"
                          className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-[hsl(190,80%,55%)] to-[hsl(190,80%,40%)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    <div
                      className={cn(
                        "shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-500",
                        isActive
                          ? "bg-gradient-to-br from-[hsl(190,80%,45%)]/15 to-[hsl(190,80%,45%)]/5 border-[hsl(190,80%,45%)]/40 text-[hsl(190,80%,40%)]"
                          : "bg-muted/40 border-border text-muted-foreground group-hover:text-foreground group-hover:border-border",
                      )}
                    >
                      <Icon size={16} strokeWidth={1.9} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={cn(
                          "font-semibold text-[14px] tracking-tight leading-tight transition-colors",
                          isActive ? "text-foreground" : "text-foreground/80",
                        )}
                      >
                        {f.label}
                      </h3>
                      <p className="text-[11.5px] text-muted-foreground mt-0.5 leading-snug">{f.subtitle}</p>
                    </div>

                    <ArrowUpRight
                      size={14}
                      className={cn(
                        "shrink-0 transition-all duration-500",
                        isActive
                          ? "text-[hsl(190,80%,45%)] opacity-100"
                          : "text-muted-foreground opacity-0 group-hover:opacity-100",
                      )}
                    />
                  </div>
                </button>
              );
            })}

            {/* Progress dots */}
            <div className="flex items-center gap-1.5 mt-4 px-1">
              {FEATURES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="relative h-[3px] flex-1 rounded-full bg-border overflow-hidden"
                >
                  {i === activeIndex && (
                    <motion.div
                      key={`progress-${activeIndex}-${isPaused}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "100%" : "100%" }}
                      transition={{ duration: isPaused ? 0.3 : AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[hsl(190,80%,55%)] to-[hsl(190,80%,40%)]"
                    />
                  )}
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT — Cinematic showcase */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative"
          >
            {/* Glow halo behind image */}
            <div className="absolute inset-0 -m-8 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-glow"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full bg-[hsl(190,80%,50%)]/25 blur-[100px]" />
                  <div className="absolute top-1/3 left-1/3 w-[40%] h-[40%] rounded-full bg-[hsl(var(--primary))]/30 blur-[80px]" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating ambient particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {Array.from({ length: 14 }).map((_, i) => {
                const left = (i * 37 + 7) % 100;
                const top = (i * 53 + 11) % 100;
                const delay = (i % 5) * 0.7;
                const dur = 5 + (i % 4);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0], y: [0, -24, 0] }}
                    transition={{ duration: dur, repeat: Infinity, delay, ease: "easeInOut" }}
                    className="absolute w-1 h-1 rounded-full bg-[hsl(190,80%,75%)]"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  />
                );
              })}
            </div>

            {/* Image stage */}
            <div className="relative w-full max-w-[420px] mx-auto" style={{ aspectRatio: "3/4" }}>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -8 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Subtle floating */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-full max-h-full flex items-center justify-center"
                    style={{ aspectRatio: "3/4" }}
                  >
                    {/* Gradient border frame */}
                    <div className="absolute inset-0 rounded-3xl p-[1.5px] bg-gradient-to-br from-[hsl(190,80%,55%)]/60 via-white/10 to-[hsl(var(--primary))]/40">
                      <div className="w-full h-full rounded-3xl bg-[hsl(220,30%,6%)]" />
                    </div>
                    <img
                      src={active.image}
                      alt={active.label}
                      className="relative w-full h-full object-cover rounded-3xl shadow-[0_30px_80px_-20px_hsl(190,80%,40%,0.5)]"
                    />

                    {/* Floating tag */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/15"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(190,80%,65%)] animate-pulse" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                        {active.tag}
                      </span>
                    </motion.div>

                    {/* Corner accents */}
                    {[
                      "top-2 left-2 border-t border-l rounded-tl-2xl",
                      "top-2 right-2 border-t border-r rounded-tr-2xl",
                      "bottom-2 left-2 border-b border-l rounded-bl-2xl",
                      "bottom-2 right-2 border-b border-r rounded-br-2xl",
                    ].map((cls, i) => (
                      <span
                        key={i}
                        className={cn(
                          "absolute w-6 h-6 border-[hsl(190,80%,65%)]/50 pointer-events-none",
                          cls,
                        )}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IASection;

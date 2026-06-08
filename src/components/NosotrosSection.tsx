import { Component as Globe } from "@/components/ui/interactive-globe";
import { useRef, useState, useEffect } from "react";

const STATS = [
  { target: 150, suffix: "+", label: "Proyectos" },
  { target: 50, suffix: "+", label: "Clientes" },
  { target: 20, suffix: "+", label: "Colaboradores" },
];

const CLIENTS: { name: string; logo: string; sizeClass?: string }[] = [
  { name: "Vithas", logo: "/Web/uploads/clients/vithas.png", sizeClass: "h-12 max-w-[140px]" },
  { name: "Unicaja", logo: "/Web/uploads/clients/unicaja.png" },
  { name: "Oceanogràfic", logo: "/Web/uploads/clients/oceanografic.png", sizeClass: "h-12 max-w-[140px]" },
  { name: "Indra", logo: "/Web/uploads/clients/indra.png" },
  { name: "Fundació Visit Valencia", logo: "/Web/uploads/clients/visitvalencia.png", sizeClass: "h-14 max-w-[150px]" },
  { name: "Universitat de València", logo: "/Web/uploads/clients/uv.png" },
  { name: "Pelayo", logo: "/Web/uploads/clients/pelayo.png" },
  { name: "RIU Hotels & Resorts", logo: "/Web/uploads/clients/riu.png", sizeClass: "h-20 max-w-[160px]" },
  { name: "CaixaBank", logo: "/Web/uploads/clients/caixabank.png", sizeClass: "h-20 max-w-[160px]" },
  { name: "BBVA", logo: "/Web/uploads/clients/bbva.png" },
];

const DURATION = 1600;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const NosotrosSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<number[]>([0, 0, 0]);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          observer.disconnect();

          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / DURATION, 1);
            const eased = easeOutCubic(progress);
            setValues(STATS.map((s) => Math.round(eased * s.target)));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section id="nosotros" className="flex min-h-[520px] items-center justify-center py-16 md:py-24 bg-background">
      <div className="w-full max-w-6xl mx-auto rounded-2xl border border-border bg-card overflow-hidden relative">
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        {/* Decorative globe — absolute, right-aligned */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 w-[360px] h-[360px] items-center justify-center opacity-70 pointer-events-none">
          <Globe
            size={360}
            dotColor="rgba(20, 184, 166, 0.9)"
            arcColor="rgba(20, 184, 166, 0)"
            markerColor="rgba(20, 184, 166, 0)"
            autoRotateSpeed={0.0015}
            markers={[]}
            connections={[]}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-10 md:p-14 md:pr-[400px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
            Nuestra línea{" "}
            <span className="bg-gradient-to-r from-primary to-[hsl(190,80%,45%)] bg-clip-text text-transparent">
              digital
            </span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed mb-8">
            Un espacio tiene que poder conectar con el cliente. Gracias a digitalizarlo podemos ofrecer una
            experiencia única. ¡Conoce las distintas soluciones!
          </p>
          <div ref={statsRef} className="flex items-center gap-6">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6">
                <div>
                  <p className="text-2xl font-bold text-foreground tabular-nums">
                    {values[i]}
                    <span className="bg-gradient-to-r from-primary to-[hsl(190,80%,45%)] bg-clip-text text-transparent">
                      {stat.suffix}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
                {i < STATS.length - 1 && <div className="w-px h-8 bg-border" />}
              </div>
            ))}
          </div>

          {/* Subtle divider + clients marquee */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Confían en nosotros
            </p>
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-card to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-card to-transparent z-10" />
              <div className="flex items-center gap-12 w-max animate-carousel-infinite">
                {[...CLIENTS, ...CLIENTS].map((c, i) => (
                  <img
                    key={`${c.name}-${i}`}
                    src={c.logo}
                    alt={c.name}
                    loading="lazy"
                    className={`${c.sizeClass ?? "h-8 max-w-[110px]"} w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NosotrosSection;

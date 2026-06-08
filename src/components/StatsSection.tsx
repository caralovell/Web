import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 150, label: "Proyectos" },
  { value: 50, label: "Clientes" },
  { value: 20, label: "Colaboradores" },
];

const DURATION = 1600;

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const startedRef = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(elapsed / DURATION, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setCounts(stats.map((s) => Math.round(s.value * eased)));
              if (t < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-3 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center px-4 ${
                i > 0 ? "border-l border-border" : ""
              }`}
            >
              <div className="text-[56px] font-bold text-foreground leading-none">
                {counts[i]}
                <span className="text-primary">+</span>
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

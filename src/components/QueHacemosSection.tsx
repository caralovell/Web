import { Camera, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Conceptualización y diseño",
    desc: "Definimos la estrategia digital del espacio, desde la experiencia de usuario hasta la arquitectura de contenidos.",
    label: "Concepto & Diseño",
    className: "service-concept-visual",
    tags: ["UX", "Estrategia", "Branding"],
  },
  {
    title: "Fabricación e implantación",
    desc: "Producimos e instalamos soluciones integradas de señalización digital, pantallas y dispositivos IoT.",
    label: "Producción",
    className: "service-production-visual",
    tags: ["Hardware", "Instalación", "Integración"],
  },
  {
    title: "Gestión y mantenimiento",
    desc: "Operamos y mantenemos tu ecosistema digital para garantizar la máxima disponibilidad y rendimiento.",
    label: "Gestión",
    className: "service-management-visual",
    tags: ["CMS", "Soporte", "SLA"],
  },
  {
    title: "Tecnología e innovación",
    desc: "Investigamos y aplicamos las tecnologías más avanzadas: IA, IoT, realidad aumentada y más.",
    label: "Innovación",
    className: "service-innovation-visual",
    tags: ["IA", "IoT", "AR/VR"],
  },
];


const QueHacemosSection = () => {
  return (
    <>
      <section id="capacidades" className="py-28 bg-background relative">
        <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="mb-16 fade-up">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-primary uppercase mb-4">
              <span className="w-8 h-[1px] bg-primary" />
              CAPACIDADES
            </span>
            <h2 className="text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
              De la idea a la<br />experiencia digital.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group bg-card border border-border rounded-[4px] overflow-hidden card-hover fade-up relative"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={`h-[200px] premium-placeholder ${s.className} flex flex-col items-center justify-center gap-2 relative overflow-hidden`}>
                  <Camera className="w-7 h-7 text-white/40 relative z-10" strokeWidth={1.2} />
                  <span className="text-white/30 text-[11px] tracking-wider relative z-10">{s.label}</span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                      Explorar <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {s.tags.map(t => (
                      <span key={t} className="text-[10px] font-bold tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-foreground text-[17px] mb-2 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default QueHacemosSection;

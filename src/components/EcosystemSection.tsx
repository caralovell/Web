import { Camera, Monitor, Smartphone, MapPin, Cpu, Brain, Wifi, BarChart3, Users } from "lucide-react";

const modules = [
  { icon: Monitor, label: "Contenido", desc: "Digital Signage y contenido dinámico gestionado en tiempo real." },
  { icon: MapPin, label: "Navegación", desc: "Wayfinding indoor que guía a visitantes de forma intuitiva." },
  { icon: Smartphone, label: "Interacción", desc: "QR, NFC y Navilens para conectar con cualquier persona." },
  { icon: Cpu, label: "Sensores", desc: "IoT que captura datos del entorno y comportamiento." },
  { icon: Brain, label: "Inteligencia", desc: "IA que analiza, predice y personaliza experiencias." },
  { icon: Wifi, label: "Conectividad", desc: "Infraestructura que une todos los componentes del ecosistema." },
  { icon: BarChart3, label: "Analítica", desc: "Dashboards y métricas para decisiones basadas en datos." },
  { icon: Users, label: "Accesibilidad", desc: "Soluciones inclusivas que no dejan a nadie fuera." },
];

const EcosystemSection = () => {
  return (
    <section id="ecosistema" className="relative overflow-hidden">
      {/* Dark section */}
      <div className="py-20 md:py-28 relative" style={{ background: "linear-gradient(145deg, #53565A 0%, #2d2f32 100%)" }}>
        <div className="absolute inset-0 tech-grid-bg opacity-[0.06]" />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--brand-teal)), transparent 60%)" }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="text-center mb-20 fade-up">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-primary uppercase mb-4 mx-auto">
              <span className="w-8 h-[1px] bg-primary" />
              ECOSISTEMA DIGITAL
              <span className="w-8 h-[1px] bg-primary" />
            </span>
            <h2 className="text-[40px] lg:text-[56px] font-bold text-white leading-tight">
              Cuando el espacio<br />se convierte en <span className="text-primary">plataforma.</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto text-[17px]">
              Un ecosistema integrado donde comunicación, datos, navegación e IA trabajan juntos para crear experiencias inteligentes.
            </p>
          </div>

          {/* Central visual placeholder */}
          <div className="mb-20 fade-up">
            <div className="max-w-3xl mx-auto aspect-video premium-placeholder ecosystem-diagram-visual rounded-[4px] flex flex-col items-center justify-center gap-3 relative animate-pulse-glow"
              style={{ boxShadow: "0 0 60px hsla(177, 100%, 35%, 0.1)" }}>
              <Camera className="w-10 h-10 text-white/30" strokeWidth={1} />
              <span className="text-white/20 text-xs tracking-widest">DIAGRAMA DEL ECOSISTEMA</span>

              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-[4px]" />
              <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-[4px]" />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-[4px]" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-[4px]" />
            </div>
          </div>

          {/* Module cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m, i) => (
              <div
                key={m.label}
                className="group p-5 rounded-[4px] border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-primary/50 hover:bg-white/[0.06] transition-all duration-500 fade-up connected-module-visual"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <m.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.3} />
                <h3 className="font-bold text-white text-[15px] mb-1">{m.label}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;

import { useState } from "react";
import { Camera, ArrowRight } from "lucide-react";

const projects = [
  { name: "Vithas", sector: "Healthcare", desc: "Smart Signage para sala de espera de pediatría.", category: "Healthcare", featured: true },
  { name: "IGY Málaga Marina", sector: "Hospitality", desc: "Señalética y Smart Signage para marina deportiva.", category: "Hospitality", featured: true },
  { name: "Sabadell", sector: "Banca", desc: "Digital Signage para red nacional de oficinas.", category: "Retail", featured: true },
  { name: "Indra", sector: "Corporativo", desc: "Identidad visual e implantación corporativa.", category: "Corporativo", featured: false },
  { name: "Pelayo", sector: "Seguros", desc: "Señalética para red de oficinas a nivel nacional.", category: "Corporativo", featured: false },
  { name: "Emivasa", sector: "Utilities", desc: "Señalización corporativa integral.", category: "Corporativo", featured: false },
  { name: "Oceanogràfic", sector: "Ocio", desc: "Digital Wayfinding para entorno de ocio y turismo.", category: "Ocio", featured: false },
  { name: "Nokian Tyres", sector: "Automoción", desc: "Imagen de marca para red de distribuidores.", category: "Retail", featured: false },
  { name: "Telpark", sector: "Movilidad", desc: "Smart Signage para aparcamientos inteligentes.", category: "Retail", featured: false },
];

const filters = ["Todos", "Healthcare", "Retail", "Corporativo", "Hospitality", "Ocio"];

const ProyectosSection = () => {
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? projects : projects.filter(p => p.category === active);

  return (
    <section id="proyectos" className="py-28 bg-background relative">
      <div className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="mb-10 fade-up">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-primary uppercase mb-4">
            <span className="w-8 h-[1px] bg-primary" />
            PROYECTOS
          </span>
          <h2 className="text-[40px] lg:text-[52px] font-bold text-foreground leading-tight">
            Innovación aplicada<br />al mundo real.
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 fade-up">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                active === f
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsla(177,100%,35%,0.2)]"
                  : "bg-card border border-border text-foreground/60 hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured projects — larger */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {filtered.filter(p => p.featured).map((p, i) => (
            <div
              key={p.name}
              className="group bg-card border border-border rounded-[4px] overflow-hidden card-hover fade-up"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={`h-[300px] premium-placeholder project-featured-visual flex flex-col items-center justify-center gap-2 relative overflow-hidden`}>
                <Camera className="w-8 h-8 text-white/30 relative z-10" strokeWidth={1.2} />
                <span className="text-white/20 text-[11px] tracking-wider relative z-10">{p.name}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between p-6">
                  <div>
                    <span className="text-white font-bold text-lg">{p.name}</span>
                    <span className="block text-primary text-sm mt-1">{p.sector}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground text-[17px] group-hover:text-primary transition-colors duration-300">{p.name}</h3>
                <span className="inline-block text-[10px] font-bold tracking-wider text-primary bg-primary/5 px-3 py-1 rounded mt-2">
                  {p.sector}
                </span>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary projects — smaller */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.filter(p => !p.featured).map((p, i) => (
            <div
              key={p.name}
              className="group bg-card border border-border rounded-[4px] overflow-hidden card-hover fade-up"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="h-[180px] premium-placeholder project-card-visual flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                <Camera className="w-6 h-6 text-white/30" strokeWidth={1.2} />
                <span className="text-white/20 text-[10px] tracking-wider">{p.name}</span>
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-white font-bold text-sm flex items-center gap-2">Ver proyecto <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground text-[15px] group-hover:text-primary transition-colors">{p.name}</h3>
                <span className="text-[10px] font-bold tracking-wider text-primary">{p.sector}</span>
                <p className="text-[13px] text-muted-foreground mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProyectosSection;

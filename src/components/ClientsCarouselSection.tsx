import * as React from "react";

const clients = [
  { name: "Vithas", logo: "/uploads/clients/vithas.png" },
  { name: "Unicaja", logo: "/uploads/clients/unicaja.png" },
  { name: "Oceanogràfic", logo: "/uploads/clients/oceanografic.png" },
  { name: "Indra", logo: "/uploads/clients/indra.png" },
  { name: "Fundació Visit Valencia", logo: "/uploads/clients/visitvalencia.png" },
  { name: "Universitat de València", logo: "/uploads/clients/uv.png" },
  { name: "Pelayo", logo: "/uploads/clients/pelayo.png" },
  { name: "RIU Hotels & Resorts", logo: "/uploads/clients/riu.png" },
  { name: "CaixaBank", logo: "/uploads/clients/caixabank.png" },
  { name: "BBVA", logo: "/uploads/clients/bbva.png" },
];

const ClientsCarouselSection = () => {
  const loop = [...clients, ...clients];

  return (
    <section className="bg-muted/30 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12">
          Confían en nosotros
        </h2>

        <div className="relative">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="overflow-hidden">
            <div className="flex items-center gap-16 w-max animate-carousel-infinite">
              {loop.map((c, i) => (
                <img
                  key={`${c.name}-${i}`}
                  src={c.logo}
                  alt={c.name}
                  loading="lazy"
                  className="h-10 w-auto max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsCarouselSection;

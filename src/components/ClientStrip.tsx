const clients = [
  "SABADELL", "INDRA", "PELAYO", "EMIVASA", "VITHAS",
  "OCEANOGRÀFIC", "NOKIAN TYRES", "TELPARK", "IGY",
];

const ClientStrip = () => {
  const list = [...clients, ...clients, ...clients];

  return (
    <section id="clients" className="bg-secondary/50 overflow-hidden relative" style={{ height: 72 }}>
      <div className="absolute inset-0 tech-grid-bg opacity-30" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 h-full flex items-center relative z-10">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase whitespace-nowrap mr-10 shrink-0">
          CONFÍAN EN NOSOTROS
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
            {list.map((c, i) => (
              <span key={i} className="text-[13px] font-bold text-foreground/30 tracking-[0.15em] hover:text-primary/60 transition-colors duration-300 cursor-default">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientStrip;

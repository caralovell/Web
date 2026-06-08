import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "Llámanos",
    info: "(+34) 661 327 638",
    href: "tel:+34661327638",
  },
  {
    icon: Mail,
    title: "Escríbenos",
    info: "david.o@logopost.es",
    href: "mailto:david.o@logopost.es",
  },
  {
    icon: MapPin,
    title: "Visítanos",
    info: "Carrer del Carboner, 24\n46980 Paterna, Valencia",
    href: "https://maps.google.com/?q=Carrer+del+Carboner+24+46980+Paterna+Valencia",
  },
];

const ContactoSection = () => {
  return (
    <section id="contacto" className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
          Hablemos.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto mb-16">
          ¿Tienes un proyecto en mente? Nos encantaría conocerlo.
        </p>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.href}
                target={item.icon === MapPin ? "_blank" : undefined}
                rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 flex flex-col items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/10 to-[hsl(190,80%,45%)]/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">{item.title}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{item.info}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <a
          href="https://meetings-eu1.hubspot.com/davidochoa/david-ochoa"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base text-white transition-all duration-300 hover:shadow-[0_0_40px_hsla(177,100%,35%,0.3)] hover:scale-[1.03]"
          style={{
            background: "linear-gradient(135deg, hsl(177, 100%, 35%), hsl(190, 80%, 45%))",
          }}
        >
          <Calendar className="w-5 h-5" />
          <span>Agenda una reunión</span>
        </a>
      </div>
    </section>
  );
};

export default ContactoSection;
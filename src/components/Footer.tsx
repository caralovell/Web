const Footer = () => {
  return (
    <footer
      className="relative border-t border-white/10"
      style={{ background: "linear-gradient(145deg, #53565A 0%, #2d2f32 100%)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-4 gap-10 text-sm py-16">
        {/* Col 1 — Logo */}
        <div>
          <img
            src="https://logopost.es/wp-content/uploads/2020/05/Logotipo_blanco_Mesa_de_trabajo_1.png"
            alt="Logopost"
            className="h-8 w-auto mb-4 opacity-80"
          />
          <p className="text-white/40 text-sm leading-relaxed mb-5">
            Línea de innovación digital.
            <br />
            Espacios inteligentes, conectados y accesibles.
          </p>
          <img
            src="https://logopost.es/wp-content/uploads/2022/12/2018-EmpressaCertificada-Logo-White-L-701x1024.png"
            alt="B Corp"
            className="h-12 w-auto opacity-40"
          />
        </div>

        {/* Col 2 — Nav */}
        <div>
          <h4 className="font-semibold text-white/80 mb-4 text-xs tracking-widest uppercase">
            Navegación
          </h4>
          {["Nosotros", "Soluciones", "Contacto"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="block mb-2.5 text-sm text-white/50 hover:text-white transition-colors duration-300"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Col 3 — Solutions */}
        <div>
          <h4 className="font-semibold text-white/80 mb-4 text-xs tracking-widest uppercase">
            Soluciones
          </h4>
          {[
            "Digital Signage",
            "Smart Signage",
            "Digital Wayfinding",
            "IoT",
            "Experiencia Inmersiva",
            "Inteligencia Artificial",
          ].map((s) => (
            <span
              key={s}
              className="block mb-2.5 text-sm text-white/50"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Col 4 — Contact */}
        <div>
          <h4 className="font-semibold text-white/80 mb-4 text-xs tracking-widest uppercase">
            Contacto
          </h4>
          <a
            href="tel:+34661327638"
            className="block text-sm text-white/50 hover:text-white transition-colors mb-1.5"
          >
            (+34) 661 327 638
          </a>
          <a
            href="mailto:david.o@logopost.es"
            className="block text-sm text-white/50 hover:text-white transition-colors mb-1.5"
          >
            david.o@logopost.es
          </a>
          <a
            href="https://www.linkedin.com/company/logopost"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-white/50 hover:text-white transition-colors mb-1.5"
          >
            LinkedIn
          </a>
          <a
            href="https://www.logopost.es"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-white/50 hover:text-white transition-colors mb-4"
          >
            www.logopost.es
          </a>
          <p className="text-sm text-white/40 leading-relaxed">
            Carrer del Carboner, 24
            <br />
            46980 Paterna, Valencia
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-white/30 gap-3 border-t border-white/10">
        <span>© 2026 Logopost — Línea Digital</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white/60 transition-colors">
            Aviso legal
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

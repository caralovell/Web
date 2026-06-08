import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Layers,
  MessageCircle,
  Monitor,
  Sparkles,
  MapPin,
  Radio,
  Glasses,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const solutions = [
  { label: "Digital Signage", href: "#digital-signage", Icon: Monitor },
  { label: "Smart Signage", href: "#smart-signage", Icon: Sparkles },
  { label: "Digital Wayfinding", href: "#digital-wayfinding", Icon: MapPin },
  { label: "Soluciones IoT", href: "#soluciones-iot", Icon: Radio },
  { label: "Experiencia Inmersiva", href: "#experiencia-inmersiva", Icon: Glasses },
  { label: "Inteligencia Artificial", href: "#inteligencia-artificial", Icon: BrainCircuit },
];

const navLinks = [
  { label: "Nosotros", href: "#nosotros", Icon: Users, hasDropdown: false },
  { label: "Soluciones", href: "#soluciones", Icon: Layers, hasDropdown: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [clickedHash, setClickedHash] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = [...navLinks.map((l) => l.href.slice(1)), ...solutions.map((s) => s.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            // Map solution sections to "Soluciones"
            if (solutions.some((s) => s.href === id)) setActiveHash("#soluciones");
            else setActiveHash(id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const updatePill = useCallback(() => {
    const current = clickedHash || activeHash;
    const targetIdx = navLinks.findIndex((l) => l.href === current);
    if (targetIdx >= 0 && navRefs.current[targetIdx] && navGroupRef.current) {
      const btn = navRefs.current[targetIdx]!;
      const groupRect = navGroupRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - groupRect.left,
        width: btnRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeHash, clickedHash]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = (href: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      setDropdownOpen((prev) => !prev);
      return;
    }
    setClickedHash(href);
    scrollTo(href);
    setOpen(false);
    setDropdownOpen(false);
  };

  const handleSolutionClick = (href: string) => {
    setDropdownOpen(false);
    setOpen(false);
    setClickedHash("#soluciones");
    scrollTo(href);
  };

  const handleContactoClick = () => {
    // Do NOT set as active/clicked — it's a CTA, not a nav state
    scrollTo("#contacto");
    setOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header
      className={`fixed left-0 right-0 z-50 px-4 md:px-6 transition-all duration-500 ${
        scrolled ? "top-3" : "top-4"
      }`}
    >
      <div
        className="mx-auto w-full max-w-[1400px] flex items-center justify-between
          h-[64px] pl-3 pr-2 md:pl-5 md:pr-2.5 rounded-full
          bg-white/65 backdrop-blur-2xl backdrop-saturate-150
          border border-foreground/[0.06]
          shadow-[0_8px_30px_-12px_rgba(83,86,90,0.18),inset_0_1px_0_rgba(255,255,255,0.7)]"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setClickedHash("");
          }}
          className="group shrink-0 inline-flex items-center"
        >
          <img
            src="https://logopost.es/wp-content/uploads/2020/05/Logotipo_Mesa_de_trabajo_1.png"
            alt="Logopost"
            className="h-[32px] w-auto transition-all duration-300 group-hover:opacity-85 group-hover:scale-[1.03]"
          />
        </a>

        {/* Desktop nav (right side) */}
        <div ref={navGroupRef} className="hidden lg:flex relative items-center gap-0.5">
          {/* Sliding active pill */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[40px] rounded-full bg-foreground/[0.05] pointer-events-none"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
              transition:
                "left 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
            }}
          />

          {navLinks.map((link, i) => {
            const isActive = (clickedHash || activeHash) === link.href;
            const { Icon } = link;
            return (
              <div
                key={link.href}
                className="relative"
                ref={link.hasDropdown ? dropdownRef : undefined}
              >
                <button
                  ref={(el) => {
                    navRefs.current[i] = el;
                  }}
                  onClick={() => handleClick(link.href, link.hasDropdown)}
                  className={`group relative z-10 text-[14.5px] font-semibold tracking-tight px-3.5 h-[40px] rounded-full flex items-center gap-1.5
                    transition-all duration-300 ease-out
                    ${isActive ? "text-foreground" : "text-foreground/70 hover:text-primary"}
                  `}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className={`transition-all duration-300 group-hover:scale-110 ${isActive ? "text-primary" : ""}`}
                  />
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={13}
                      strokeWidth={2}
                      className={`transition-transform duration-300 opacity-60 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {link.hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[260px] bg-white/90 backdrop-blur-2xl border border-foreground/[0.06] rounded-2xl shadow-[0_20px_50px_-15px_rgba(83,86,90,0.28)] overflow-hidden z-50 p-1.5"
                      >
                        {solutions.map((s) => {
                          const SIcon = s.Icon;
                          return (
                            <button
                              key={s.href}
                              onClick={() => handleSolutionClick(s.href)}
                              className="group/item w-full text-left px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-foreground/80 hover:text-primary hover:bg-primary/[0.06] transition-all duration-200 flex items-center gap-3"
                            >
                              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-foreground/[0.04] group-hover/item:bg-primary/10 transition-colors">
                                <SIcon
                                  size={14}
                                  strokeWidth={1.75}
                                  className="text-foreground/60 group-hover/item:text-primary transition-colors"
                                />
                              </span>
                              {s.label}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}

          {/* Contacto CTA — clean, not "pressed" */}
          <button
            onClick={handleContactoClick}
            className="group ml-2 inline-flex items-center gap-1.5 h-[40px] pl-4 pr-3.5 rounded-full
              text-[14.5px] font-semibold text-primary
              bg-transparent border border-primary/35
              transition-all duration-300 ease-out
              hover:bg-primary/[0.06] hover:border-primary/60
              hover:shadow-[0_6px_18px_-8px_hsla(177,100%,35%,0.45)]
              active:scale-[0.97]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <MessageCircle size={15} strokeWidth={1.9} />
            <span>Contacto</span>
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden h-[44px] w-[44px] flex items-center justify-center rounded-full
            hover:bg-foreground/5 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute left-4 right-4 top-[78px] bg-white/95 backdrop-blur-2xl border border-foreground/[0.06] rounded-3xl shadow-[0_20px_50px_-15px_rgba(83,86,90,0.25)] overflow-hidden"
          >
            <div className="flex flex-col p-3 gap-1">
              {navLinks.map((link) => {
                const { Icon } = link;
                return (
                  <div key={link.href} className="flex flex-col">
                    <button
                      onClick={() => {
                        if (link.hasDropdown) setDropdownOpen((p) => !p);
                        else handleClick(link.href, false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Icon size={17} strokeWidth={1.75} />
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown
                          size={15}
                          className={`ml-auto transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>

                    {link.hasDropdown && dropdownOpen && (
                      <div className="flex flex-col gap-0.5 pl-3 pb-2">
                        {solutions.map((s) => {
                          const SIcon = s.Icon;
                          return (
                            <button
                              key={s.href}
                              onClick={() => handleSolutionClick(s.href)}
                              className="text-left px-3 py-2 rounded-xl text-[13.5px] text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2.5"
                            >
                              <SIcon size={14} strokeWidth={1.75} className="text-foreground/50" />
                              {s.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                onClick={handleContactoClick}
                className="mt-1 flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-primary border border-primary/35 hover:bg-primary/[0.06] transition-colors"
              >
                <MessageCircle size={17} strokeWidth={1.85} />
                Contacto
                <ArrowUpRight size={15} className="ml-auto" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

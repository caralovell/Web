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
  const [scrolled, setScrolled] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = [
      ...navLinks.map((link) => link.href.slice(1)),
      ...solutions.map((solution) => solution.href.slice(1)),
      "contacto",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const id = `#${visibleEntries[0].target.id}`;

        if (solutions.some((solution) => solution.href === id)) {
          setActiveHash("#soluciones");
          return;
        }

        if (id === "#contacto") {
          setActiveHash("");
          return;
        }

        setActiveHash(id);
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setDesktopDropdownOpen(false);
        setMobileDropdownOpen(false);
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopDropdownOpen(false);
        setMobileDropdownOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
        setMobileDropdownOpen(false);
      } else {
        setDesktopDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updatePill = useCallback(() => {
    const targetIdx = navLinks.findIndex((link) => link.href === activeHash);

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
  }, [activeHash]);

  useEffect(() => {
    requestAnimationFrame(updatePill);

    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;

    const yOffset = -92;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const handleNavClick = (href: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      setDesktopDropdownOpen((prev) => !prev);
      return;
    }

    setActiveHash(href);
    scrollTo(href);
    setOpen(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
  };

  const handleSolutionClick = (href: string) => {
    setActiveHash("#soluciones");
    scrollTo(href);
    setOpen(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
  };

  const handleContactoClick = () => {
    scrollTo("#contacto");
    setOpen(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 z-50 px-4 md:px-6 transition-all duration-500 ${
        scrolled ? "top-3" : "top-4"
      }`}
    >
      <div
        className="mx-auto w-full max-w-[1400px] flex items-center justify-between
          h-[64px] pl-3 pr-2 md:pl-5 md:pr-2.5 rounded-full
          bg-white/70 backdrop-blur-2xl backdrop-saturate-150
          border border-foreground/[0.06]
          shadow-[0_8px_30px_-12px_rgba(83,86,90,0.18),inset_0_1px_0_rgba(255,255,255,0.7)]"
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveHash("");
            setOpen(false);
            setDesktopDropdownOpen(false);
            setMobileDropdownOpen(false);
          }}
          className="group shrink-0 inline-flex items-center"
          aria-label="Ir al inicio"
        >
          <img
            src="https://logopost.es/wp-content/uploads/2020/05/Logotipo_Mesa_de_trabajo_1.png"
            alt="Logopost"
            className="h-[32px] w-auto transition-all duration-300 group-hover:opacity-85 group-hover:scale-[1.03]"
          />
        </a>

        {/* Desktop */}
        <div ref={navGroupRef} className="hidden lg:flex relative items-center gap-0.5">
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[40px] rounded-full bg-foreground/[0.05] pointer-events-none"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
              transition:
                "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
            }}
          />

          {navLinks.map((link, i) => {
            const isActive = activeHash === link.href;
            const { Icon } = link;

            return (
              <div key={link.href} className="relative">
                <button
                  type="button"
                  ref={(el) => {
                    navRefs.current[i] = el;
                  }}
                  onClick={() => handleNavClick(link.href, link.hasDropdown)}
                  aria-expanded={link.hasDropdown ? desktopDropdownOpen : undefined}
                  aria-haspopup={link.hasDropdown ? "menu" : undefined}
                  className={`group relative z-10 text-[14.5px] font-semibold tracking-tight px-3.5 h-[40px] rounded-full flex items-center gap-1.5
                    transition-all duration-300 ease-out
                    ${isActive ? "text-foreground" : "text-foreground/70 hover:text-primary"}
                  `}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className={`transition-all duration-300 group-hover:scale-110 ${
                      isActive ? "text-primary" : ""
                    }`}
                  />

                  {link.label}

                  {link.hasDropdown && (
                    <ChevronDown
                      size={13}
                      strokeWidth={2}
                      className={`transition-transform duration-300 opacity-60 ${
                        desktopDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {link.hasDropdown && (
                  <AnimatePresence>
                    {desktopDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[270px] 
                          bg-white/95 backdrop-blur-2xl border border-foreground/[0.06] rounded-2xl 
                          shadow-[0_20px_50px_-15px_rgba(83,86,90,0.28)] overflow-hidden z-50 p-1.5"
                      >
                        {solutions.map((solution) => {
                          const SIcon = solution.Icon;

                          return (
                            <button
                              type="button"
                              key={solution.href}
                              onClick={() => handleSolutionClick(solution.href)}
                              className="group/item w-full text-left px-3 py-2.5 rounded-xl text-[13.5px] font-medium 
                                text-foreground/80 hover:text-primary hover:bg-primary/[0.06] 
                                transition-all duration-200 flex items-center gap-3"
                            >
                              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-foreground/[0.04] group-hover/item:bg-primary/10 transition-colors">
                                <SIcon
                                  size={14}
                                  strokeWidth={1.75}
                                  className="text-foreground/60 group-hover/item:text-primary transition-colors"
                                />
                              </span>

                              {solution.label}
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

          <button
            type="button"
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
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
            setDesktopDropdownOpen(false);
          }}
          className="lg:hidden h-[44px] w-[44px] flex items-center justify-center rounded-full
            hover:bg-foreground/5 transition-colors"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute left-4 right-4 top-[78px] bg-white/95 backdrop-blur-2xl 
              border border-foreground/[0.06] rounded-3xl shadow-[0_20px_50px_-15px_rgba(83,86,90,0.25)] overflow-hidden"
          >
            <div className="flex flex-col p-3 gap-1">
              {navLinks.map((link) => {
                const { Icon } = link;
                const isActive = activeHash === link.href;

                return (
                  <div key={link.href} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => {
                        if (link.hasDropdown) {
                          setMobileDropdownOpen((prev) => !prev);
                        } else {
                          handleNavClick(link.href, false);
                        }
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-colors ${
                        isActive
                          ? "bg-primary/[0.06] text-primary"
                          : "text-foreground hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      <Icon size={17} strokeWidth={1.75} />
                      {link.label}

                      {link.hasDropdown && (
                        <ChevronDown
                          size={15}
                          className={`ml-auto transition-transform duration-300 ${
                            mobileDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {link.hasDropdown && (
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-0.5 pl-3 pb-2 pt-1">
                              {solutions.map((solution) => {
                                const SIcon = solution.Icon;

                                return (
                                  <button
                                    type="button"
                                    key={solution.href}
                                    onClick={() => handleSolutionClick(solution.href)}
                                    className="text-left px-3 py-2 rounded-xl text-[13.5px] text-foreground/70 
                                      hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2.5"
                                  >
                                    <SIcon
                                      size={14}
                                      strokeWidth={1.75}
                                      className="text-foreground/50"
                                    />
                                    {solution.label}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}

              <button
                type="button"
                onClick={handleContactoClick}
                className="mt-1 flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-primary 
                  border border-primary/35 hover:bg-primary/[0.06] transition-colors"
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

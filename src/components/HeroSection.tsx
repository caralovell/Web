import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";

const rotatingWords = ["inteligente", "conectado", "interactivo", "autónomo", "eficiente"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setTrigger(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
      },
      exit: {
        transition: { staggerChildren: 0.02, staggerDirection: 1 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: "blur(10px)",
        y: 10,
        color: "hsl(177,100%,35%)",
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        color: "hsl(177,100%,35%)",
        transition: { duration: 0.4 },
      },
      exit: {
        opacity: 0,
        y: -20,
        filter: "blur(10px)",
        color: "hsl(190,80%,45%)",
        transition: { duration: 0.3 },
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden pt-[78px]">
      {/* Subtle tech grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />

      {/* Animated glowing orbs */}
      <div
        className="orb-1 absolute top-[20%] left-[15%] w-[180px] h-[180px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(177,100%,35%,0.55) 0%, hsla(177,100%,35%,0) 70%)" }}
      />
      <div
        className="orb-2 absolute top-[18%] right-[20%] w-[150px] h-[150px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(190,80%,45%,0.50) 0%, hsla(190,80%,45%,0) 70%)" }}
      />
      <div
        className="orb-3 absolute top-[30%] left-[5%] w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(177,100%,35%,0.45) 0%, hsla(177,100%,35%,0) 70%)" }}
      />
      <div
        className="orb-4 absolute top-[25%] right-[10%] w-[160px] h-[160px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(190,80%,45%,0.50) 0%, hsla(190,80%,45%,0) 70%)" }}
      />
      <div
        className="orb-5 absolute top-[60%] left-[10%] w-[140px] h-[140px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(177,100%,35%,0.48) 0%, hsla(177,100%,35%,0) 70%)" }}
      />
      <div
        className="orb-6 absolute top-[55%] right-[25%] w-[190px] h-[190px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(190,80%,45%,0.42) 0%, hsla(190,80%,45%,0) 70%)" }}
      />
      <div
        className="orb-7 absolute top-[75%] left-[30%] w-[130px] h-[130px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(177,100%,35%,0.55) 0%, hsla(177,100%,35%,0) 70%)" }}
      />
      <div
        className="orb-8 absolute top-[22%] left-[50%] w-[170px] h-[170px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(190,80%,45%,0.40) 0%, hsla(190,80%,45%,0) 70%)" }}
      />
      <div
        className="orb-9 absolute top-[70%] right-[15%] w-[120px] h-[120px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(177,100%,35%,0.52) 0%, hsla(177,100%,35%,0) 70%)" }}
      />
      <div
        className="orb-10 absolute top-[45%] left-[40%] w-[150px] h-[150px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(190,80%,45%,0.45) 0%, hsla(190,80%,45%,0) 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 flex flex-col items-center">
        <div
          className="min-h-[220px] sm:min-h-[180px] lg:min-h-[240px] flex flex-col items-center justify-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
        >
          <h1 className="text-[30px] sm:text-[38px] lg:text-[50px] xl:text-[58px] font-bold text-foreground leading-[1.02] tracking-[-0.03em]">
            Transformamos tus espacios
            <br />
            en un ecosistema digital
          </h1>
          <div
            className="h-[1.3em] flex items-center justify-center text-[30px] sm:text-[38px] lg:text-[50px] xl:text-[58px] font-bold"
            style={{ minWidth: "300px" }}
          >
            <TextEffect
              per="char"
              as="span"
              variants={blurSlideVariants}
              trigger={trigger}
              className="inline-flex text-primary"
            >
              {rotatingWords[wordIndex]}
            </TextEffect>
          </div>
        </div>

        <p
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-7 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          Creamos experiencias únicas digitalizando espacios y procesos.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <button
            onClick={() => scrollTo("#soluciones")}
            className="group relative bg-gradient-to-r from-primary to-[hsl(190,80%,45%)] text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-[0_0_40px_hsla(177,100%,35%,0.3)] hover:scale-[1.03] flex items-center overflow-hidden"
          >
            <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">Explorar soluciones</span>
            <span className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid w-10 place-items-center transition-all duration-500 bg-white/20 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </button>
          <button
            onClick={() => scrollTo("#contacto")}
            className="group relative border border-foreground/20 text-foreground/80 px-7 py-3.5 rounded-full font-bold text-base transition-all duration-300 hover:border-primary hover:text-primary hover:scale-[1.03]"
          >
            <span className="relative z-10">Contáctanos</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const capabilities = ["Robótica", "VR / AR", "Hologramas", "Aromas", "Audio 360°"];

const stats = [
  { value: "360°", label: "Inmersión total" },
  { value: "5+", label: "Sentidos activados" },
  { value: "∞", label: "Posibilidades" },
  { value: "100%", label: "Personalizable" },
];

const ExperienciaInmersivaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Only mount + play the video when the section is near/in viewport.
  // Pause and unload when offscreen to free GPU/decoder resources.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respect reduced-motion / data-saver preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = !!conn?.saveData;
    const slowNet = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
    if (prefersReducedMotion || saveData || slowNet) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center justify-center bg-[hsl(222,47%,4%)]"
    >
      {/* Video background — lazy-mounted, paused offscreen */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-[opacity] motion-reduce:hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <source src="/Web/uploads/experiencia-inmersiva-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay for legibility (no blur — cheaper over video) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/55 to-black/75" />

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-xl rounded-[24px] border border-white/15 bg-white/[0.06] backdrop-blur-md p-6 md:p-8 text-center shadow-[0_30px_120px_-20px_rgba(0,0,0,0.6)]"
        >

          {/* Headline */}
          <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight">
            Experiencia <span className="text-white">Inmersiva</span>
          </h2>

          <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
            Tecnología sensorial que envuelve al visitante y transforma cualquier espacio en una experiencia
            memorable.
          </p>

          {/* Capability chips */}
          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {capabilities.map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.04 }}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
              >
                <span className="text-[12.5px] font-semibold text-white/90 tracking-wide">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-10 mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-[10px] mt-1.5 uppercase tracking-[0.15em] text-white/55">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienciaInmersivaSection;

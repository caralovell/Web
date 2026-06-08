import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Zap, Brain } from "lucide-react";

const wayfindingTypes = [
  {
    label: "Estático",
    icon: MapPin,
    delay: 0.2,
  },
  {
    label: "Dinámico",
    icon: Zap,
    delay: 0.35,
  },
  {
    label: "con IA",
    icon: Brain,
    delay: 0.5,
  },
];

const WayfindingSection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden min-h-[80vh] flex items-center">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/Web/uploads/wayfinding-bg.mp4" type="video/mp4" />
      </video>
      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 w-full flex">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="inline-block max-w-xl rounded-[20px] border border-white/10 bg-white/10 backdrop-blur-md p-8 md:p-10"
        >
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Digital Wayfinding
          </h2>
          <p className="mt-6 text-base md:text-lg text-white leading-relaxed">
            Plataforma de navegación enfocada al guiado para visitantes, empleados y soluciones de tracking y
            monitorización de facilities.
          </p>
          {/* Wayfinding type buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            {wayfindingTypes.map((type) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: type.delay }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
                >
                  <Icon size={16} className="text-white shrink-0" />
                  <span className="text-white font-semibold text-[15px] tracking-wide">{type.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WayfindingSection;

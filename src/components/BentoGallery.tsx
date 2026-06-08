import * as React from "react";
import { motion } from "framer-motion";

const cardBase =
  "relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/40 to-muted/10 border border-border/40 backdrop-blur-sm";

const Img = ({
  src,
  alt,
  fit = "contain",
}: {
  src: string;
  alt: string;
  fit?: "contain" | "cover";
}) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className={`w-full h-full ${fit === "contain" ? "object-contain p-3 md:p-4" : "object-cover"}`}
  />
);

const BentoGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] md:auto-rows-[180px] gap-4 md:gap-6"
        >
          {/* Left column top — Tótems (vertical) */}
          <div className={`${cardBase} lg:row-span-2 row-span-1`}>
            <Img src="/uploads/foto1.png" alt="Tótems digitales" />
          </div>

          {/* Center — Video (large, spans 2 cols x 3 rows) */}
          <div className={`${cardBase} col-span-2 row-span-2 lg:row-span-3 bg-black/5`}>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src="/uploads/showcase-video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Right column top — Robot (vertical) */}
          <div className={`${cardBase} lg:row-span-2 row-span-1`}>
            <Img src="/uploads/foto5.png" alt="Robot de servicio" />
          </div>

          {/* Left middle — Sensores IoT (horizontal) */}
          <div className={`${cardBase} row-span-1`}>
            <Img src="/uploads/foto4.png" alt="Sensores IoT" />
          </div>

          {/* Right middle — App wayfinding (vertical) */}
          <div className={`${cardBase} row-span-1`}>
            <Img src="/uploads/foto2.png" alt="App de wayfinding" />
          </div>

          {/* Bottom row */}
          <div className={`${cardBase} row-span-1`}>
            <Img src="/uploads/foto3.png" alt="Asistente digital" />
          </div>
          <div className={`${cardBase} col-span-2 row-span-1`}>
            <Img src="/uploads/foto6.png" alt="Digital signage retail" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGallery;

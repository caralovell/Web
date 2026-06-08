import { motion } from "framer-motion";
import { Activity, Wifi, Thermometer, Droplets } from "lucide-react";
const totemVideo = "/uploads/iot-totem.mp4";

/* --------------------------- Tótem (real photo) --------------------------- */
const TotemPhoto = () => {
  return (
    <div className="relative w-full max-w-[260px] mx-auto">
      <div className="absolute -inset-6 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--primary)/0.25),transparent_70%)] blur-2xl" />

      <div className="relative rounded-[28px] p-[1px] bg-gradient-to-b from-black/15 via-black/5 to-transparent">
        <div className="relative rounded-[27px] overflow-hidden aspect-[9/16] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] bg-muted">
          <video
            src={totemVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          <motion.div
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none"
            animate={{ y: ["-20%", "120%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

        </div>
      </div>

      <div className="mt-3 mx-auto w-2/3 h-2 rounded-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <div className="mt-1 mx-auto w-1/3 h-1.5 rounded-full bg-foreground/5" />
    </div>
  );
};

/* --------------------------- Sensor card (exaggerated vertical animated gradient) --------------------------- */
const FloatingSensor = () => {
  const temp = 22.4;
  const humidity = 48;
  const co2 = 612;


  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <div className="absolute -inset-6 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.18),transparent_70%)] blur-2xl" />

      <div className="relative rounded-[24px] p-[1px] bg-gradient-to-b from-black/10 via-black/5 to-transparent">
        <div className="relative rounded-[23px] bg-white border border-border/60 p-5 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)]">

          <div className="flex gap-5">
            {/* Static thermometer showing full color spectrum */}
            <div className="relative w-9 h-44 rounded-full bg-muted/60 border border-border overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #3b82f6, #22d3ee, #facc15, #f97316, #ef4444)",
                }}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                <Thermometer size={10} /> Temperatura
              </div>
              <motion.p
                className="text-4xl font-black text-foreground tracking-tight"
                key={temp.toFixed(1)}
                initial={{ opacity: 0.4, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {temp.toFixed(1)}<span className="text-muted-foreground text-2xl">°</span>
              </motion.p>

              <div className="mt-4">
                <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                  <Droplets size={10} /> Humedad
                </div>
                <motion.p
                  key={humidity}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(190,80%,45%)] bg-clip-text text-transparent"
                >
                  {humidity}%
                </motion.p>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                  <Activity size={10} /> CO₂
                </div>
                <motion.p
                  key={co2}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {co2}<span className="text-muted-foreground text-sm font-normal ml-1">ppm</span>
                </motion.p>
              </div>
            </div>
          </div>

          {/* Live blue sparkline */}
          <div className="mt-5 pt-4 border-t border-border/60">
            <div className="flex items-end gap-[3px] h-8">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-[hsl(var(--primary))]/40 to-[hsl(190,80%,50%)]"
                  animate={{ height: [`${20 + ((i * 7) % 60)}%`, `${30 + ((i * 11) % 70)}%`, `${20 + ((i * 7) % 60)}%`] }}
                  transition={{ duration: 2 + (i % 4) * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IoTSection = () => {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,hsl(var(--primary)/0.06),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_1.4fr_1fr] gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TotemPhoto />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
              Soluciones <span className="text-foreground">IoT</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Permite que tu espacio{" "}
              <em className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(190,80%,45%)] bg-clip-text text-transparent not-italic font-semibold">
                recopile, analice y ejecute
              </em>{" "}
              en consecuencia de los datos que recibe a través de{" "}
              <em className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(190,80%,45%)] bg-clip-text text-transparent not-italic font-semibold">
                diferentes dispositivos de analítica
              </em>
              . Sírvete de la IA para revolucionar tu espacio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FloatingSensor />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IoTSection;

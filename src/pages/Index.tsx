import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import NosotrosSection from "@/components/NosotrosSection";
import SolucionesSection from "@/components/SolucionesSection";
import DigitalSignageSection from "@/components/DigitalSignageSection";
import SmartSignageSection from "@/components/SmartSignageSection";
import WayfindingSection from "@/components/WayfindingSection";
import IoTSection from "@/components/IoTSection";
import ExperienciaInmersivaSection from "@/components/ExperienciaInmersivaSection";
import IASection from "@/components/IASection";

import ContactoSection from "@/components/ContactoSection";
import Footer from "@/components/Footer";
import useScrollFadeIn from "@/components/useScrollFadeIn";

const Index = () => {
  useScrollFadeIn();
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ZoomParallax
        items={[
          { src: "/Web/uploads/showcase-video.mp4", alt: "Showcase", type: "video" },
          { src: "/Web/uploads/ds.png", alt: "Tótems digitales", fit: "contain" },
          { src: "/Web/uploads/roobot.png", alt: "Robot de servicio", fit: "contain" },
          { src: "/Web/uploads/foto2.png", alt: "App de wayfinding", fit: "contain" },
          { src: "/Web/uploads/ioot.png", alt: "Sensores IoT", fit: "contain" },
          { src: "/Web/uploads/pant.png", alt: "Digital signage retail", fit: "contain" },
          { src: "/Web/uploads/persona.png", alt: "Asistente digital", fit: "contain" },
        ]}
      />
      <div id="nosotros">
        <NosotrosSection />
      </div>
      
      <div id="soluciones">
        <SolucionesSection />
        <div id="digital-signage">
          <DigitalSignageSection />
        </div>
        <div id="smart-signage">
          <SmartSignageSection />
        </div>
        <div id="digital-wayfinding">
          <WayfindingSection />
        </div>
        <div id="soluciones-iot">
          <IoTSection />
        </div>
        <div id="experiencia-inmersiva">
          <ExperienciaInmersivaSection />
        </div>
        <div id="inteligencia-artificial">
          <IASection />
        </div>
      </div>
      <div id="contacto">
        <ContactoSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;

import { useRef } from "react";
import { CtaFooter } from "@/components/CtaFooter";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Pourquoi } from "@/components/Pourquoi";
import { ServicesBento } from "@/components/ServicesBento";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";

export default function App() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />
      <main>
        <Hero scrollRef={heroRef} />
        <ServicesBento />
        <Pourquoi />
        <Process />
        <Stats />
        <Testimonials />
        <Faq />
        <CtaFooter />
      </main>
    </div>
  );
}

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
    <div className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(72%_58%_at_18%_10%,rgba(212,167,106,0.14),transparent_56%),radial-gradient(58%_44%_at_84%_18%,rgba(104,51,30,0.20),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%)]" />
        <div className="absolute -left-24 top-[18vh] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-[56vh] h-96 w-96 rounded-full bg-secondary/16 blur-3xl" />
        <div className="absolute inset-0 noise opacity-35" />
      </div>

      <div className="relative z-10">
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
    </div>
  );
}

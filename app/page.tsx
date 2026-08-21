import { About } from "@/components/home/About";
import { BuildLogs } from "@/components/home/BuildLogs";
import { Commissioned } from "@/components/home/Commissioned";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Lab } from "@/components/home/Lab";
import { Now } from "@/components/home/Now";
import { SelectedWork } from "@/components/home/SelectedWork";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <SelectedWork />
      <div className="order-1 md:order-none">
        <Commissioned />
      </div>
      {/* Mobile: NOW → Logs → LAB · Desktop: LAB → NOW → Logs */}
      <div className="order-4 md:order-none">
        <Lab />
      </div>
      <div className="order-2 md:order-none">
        <Now />
      </div>
      <div className="order-3 md:order-none">
        <BuildLogs />
      </div>
      <div className="order-5 md:order-none">
        <About />
      </div>
      <div className="order-6 md:order-none">
        <Contact />
      </div>
    </div>
  );
}

import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Nosotros } from "@/components/Nosotros";
import { Services } from "@/components/Servicios";
import Tecnologias from "@/components/Tecnologias";

export default function Home() {
  return (
    <>
      <Menu />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Services />
        <Tecnologias />
        <Nosotros />
        <Contact />
      </main>
    </>
  );
}

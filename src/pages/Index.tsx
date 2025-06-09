
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Jobs } from "@/components/Jobs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Jobs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

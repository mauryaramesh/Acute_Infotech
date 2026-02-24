import HeroSection from "@/src/HeroSection";
import AISolutions from "@/src/AISolutions";
import WorkingProcess from "@/src/WorkingProcess";
import BuildProduct from "@/src/BuildProduct";
import ScrollingImageShowcase from "@/src/ScrollingImageShowcase";
import ClientFeedback from "@/src/ClientFeedback";
import TechStackMarquee from "@/src/TechStackMarquee";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      {/* <AISolutions />
      <WorkingProcess />
      <BuildProduct />
      <ClientFeedback />
      <TechStackMarquee /> */}
    </div>
  );
}

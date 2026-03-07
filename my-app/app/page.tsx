import HeroSection from "@/src/HeroSection";
import AISolutions from "@/src/AISolutions";
import WorkingProcess from "@/src/WorkingProcess";
import BuildProduct from "@/src/BuildProduct";
import ClientFeedback from "@/src/ClientFeedback";
import TechStackMarquee from "@/src/TechStackMarquee";
import IndustriesSection from "@/src/Industriessection";
import StartProject from "@/src/Startproject";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <WorkingProcess />
       <BuildProduct />
       <ClientFeedback />
      <TechStackMarquee /> 
      <IndustriesSection/>
      <StartProject/>
    </div>
  );
}

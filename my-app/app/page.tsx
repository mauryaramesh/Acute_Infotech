import HeroSection from "@/src/components/home/HeroSection";
import AISolutions from "@/src/components/home/AISolutions";
import WorkingProcess from "@/src/components/home/WorkingProcess";
import BuildProduct from "@/src/components/home/BuildProduct";
import ClientFeedback from "@/src/components/home/ClientFeedback";
import TechStackMarquee from "@/src/components/shared/TechStackMarquee";
import IndustriesSection from "@/src/components/home/IndustriesSection";
import StartProject from "@/src/components/shared/StartProject";

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

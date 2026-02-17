import HeroSection from "@/src/HeroSection";
import ClientFeedback from "@/src/ClientFeedback";
import BuildProduct from "@/src/BuildProduct";
import WorkingProcess from "@/src/WorkingProcess";
import TechStackMarquee from "@/src/TechStackMarquee";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <WorkingProcess />

      <BuildProduct />

      <ClientFeedback />

      <TechStackMarquee />


    </div>
  );
}

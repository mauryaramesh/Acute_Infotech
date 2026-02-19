import HeroSection from "@/src/HeroSection";
import ClientFeedback from "@/src/ClientFeedback";
import BuildProduct from "@/src/BuildProduct";
import WorkingProcess from "@/src/WorkingProcess";
import TechStackMarquee from "@/src/TechStackMarquee";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ gap: '48px' }}>
      <HeroSection />
      <WorkingProcess />
      <BuildProduct />
      <ClientFeedback />
      <TechStackMarquee />
    </div>
  );
}

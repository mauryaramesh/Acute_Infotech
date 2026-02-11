import HeroSection from "@/src/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Additional content can go here */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome to Acute InfoSoft</h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
          We are a leading technology company specializing in innovative software solutions 
          that help businesses transform and grow in the digital age.
        </p>
      </div>
    </div>
  );
}

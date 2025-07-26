import CTASection from "@/components/home/CTA";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import ProblemVsTraditional from "@/components/home/ProblemVsTraditional";
import UniqueFeatures from "@/components/home/UniqueFeatures";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <ProblemVsTraditional />
      <UniqueFeatures />
      <CTASection />
    </main>
  );
}

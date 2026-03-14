import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Curriculum from "@/components/landing/Curriculum";
import Target from "@/components/landing/Target";
import ComingSoon from "@/components/landing/ComingSoon";
import PreRegisterSection from "@/components/pre-register/PreRegisterSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <Hero />
      <About />
      <Curriculum />
      <Target />
      <PreRegisterSection />
      <ComingSoon />
    </div>
  );
}

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Trusted from "../components/Trusted";
import Features from "../components/Features";
import AiDemo from "../components/AiDemo";
import Pricing from "../components/Pricing";

function LandingPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <AiDemo />
      <Pricing />
    </main>
  );
}

export default LandingPage;
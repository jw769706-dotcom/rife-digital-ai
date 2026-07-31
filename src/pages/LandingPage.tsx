import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Trusted from "../components/Trusted";
import Features from "../components/Features";
import AiDemo from "../components/AiDemo";

function LandingPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <AiDemo />
    </main>
  );
}

export default LandingPage;
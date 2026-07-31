import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Trusted from "../components/Trusted";
import Features from "../components/Features";

function LandingPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
    </main>
  );
}

export default LandingPage;
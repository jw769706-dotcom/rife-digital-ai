import PricingHero from "./pricing/PricingHero";
import PricingCard from "./pricing/PricingCard";
import PricingGuarantee from "./pricing/PricingGuarantee";
import PricingCTA from "./pricing/PricingCTA";

export default function Pricing() {
  return (
    <section id="pricing">
      <PricingHero />
      <PricingCard />
      <PricingGuarantee />
      <PricingCTA />
    </section>
  );
}
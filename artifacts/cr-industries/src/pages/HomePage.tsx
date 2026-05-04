import StrategicPartnersHero from "@/components/StrategicPartnersHero";
import Product3D from "@/components/Product3D";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatMakesUsDifferent from "@/components/WhatMakesUsDifferent";
import ContactForm from "@/components/ContactForm";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function HomePage() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <main>
      <StrategicPartnersHero />
      <Product3D />
      <WhyChooseUs />
      <WhatMakesUsDifferent />
      <ContactForm />
    </main>
  );
}

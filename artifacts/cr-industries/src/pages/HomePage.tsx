import HeroCarousel from "@/components/HeroCarousel";
import Product3D from "@/components/Product3D";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatMakesUsDifferent from "@/components/WhatMakesUsDifferent";
import Partners from "@/components/Partners";
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
      <HeroCarousel />
      <Product3D />
      <WhyChooseUs />
      <WhatMakesUsDifferent />
      <Partners />
      <ContactForm />
    </main>
  );
}

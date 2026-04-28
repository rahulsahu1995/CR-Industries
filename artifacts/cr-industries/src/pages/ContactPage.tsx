import { useEffect } from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <main className="pt-24 lg:pt-28 bg-background">
      <ContactForm />
    </main>
  );
}

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "919522222196";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello C R Industries, I'd like to chat about your products.",
)}`;

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 inline-flex items-center px-5 py-3 rounded-full font-bold text-sm sm:text-base text-white shadow-xl shadow-black/25 ring-1 ring-white/20"
      style={{ backgroundColor: "#25D366" }}
    >
      Chat with Us
    </motion.a>
  );
}

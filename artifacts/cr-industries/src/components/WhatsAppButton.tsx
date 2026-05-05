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
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-8 right-5 sm:bottom-10 sm:right-6 z-50 flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full shadow-xl shadow-black/30 ring-2 ring-white/40 dark:ring-white/15"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* Pulsing halo */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: "#25D366" }}
        animate={{ scale: [1, 1.45, 1.45], opacity: [0.55, 0, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />
      {/* Official WhatsApp glyph */}
      <svg
        viewBox="0 0 32 32"
        className="relative w-7 h-7 sm:w-8 sm:h-8 text-white"
        fill="currentColor"
        aria-hidden
      >
        <path d="M16.001 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.255.59 4.46 1.715 6.405L3.2 28.8l6.55-1.715a12.74 12.74 0 0 0 6.251 1.62h.005c7.067 0 12.799-5.73 12.799-12.8 0-3.42-1.331-6.635-3.751-9.054C22.633 4.531 19.42 3.2 16.001 3.2zm0 23.31h-.004a10.62 10.62 0 0 1-5.41-1.481l-.388-.231-4.025 1.055 1.075-3.923-.253-.402a10.566 10.566 0 0 1-1.62-5.628c.003-5.864 4.768-10.628 10.629-10.628 2.84 0 5.508 1.108 7.516 3.118a10.55 10.55 0 0 1 3.111 7.518c-.002 5.866-4.766 10.602-10.631 10.602zm5.831-7.951c-.319-.16-1.888-.932-2.18-1.038-.293-.107-.506-.16-.72.16-.213.32-.825 1.038-1.011 1.252-.187.213-.373.24-.692.08-.319-.16-1.348-.497-2.567-1.586-.949-.846-1.59-1.892-1.776-2.211-.187-.319-.02-.491.14-.65.144-.143.319-.373.479-.56.16-.187.213-.32.319-.534.107-.213.053-.4-.027-.56-.08-.16-.72-1.732-.986-2.371-.26-.625-.523-.54-.72-.55l-.613-.011a1.181 1.181 0 0 0-.853.4c-.293.32-1.118 1.092-1.118 2.664 0 1.572 1.144 3.092 1.304 3.305.16.213 2.252 3.44 5.456 4.823.762.329 1.357.525 1.82.672.766.243 1.463.21 2.014.127.614-.092 1.888-.771 2.156-1.516.266-.745.266-1.385.187-1.519-.08-.133-.293-.213-.612-.373z" />
      </svg>
    </motion.a>
  );
}

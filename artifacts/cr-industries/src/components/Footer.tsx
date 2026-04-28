import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#product" },
  { label: "About", href: "#about" },
  { label: "E-BROCHURES", href: "#ebrochures" },
  {
    label: "News",
    href: "#news",
    children: [
      { label: "Blogs", href: "#blogs" },
      { label: "Media", href: "#media" },
      { label: "Events", href: "#events" },
      { label: "Customer Reviews", href: "#reviews" },
    ],
  },
  { label: "Contact Us", href: "#contact" },
];

const SOCIAL_LINKS = [
  { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: FaWhatsapp, href: "https://wa.me/", label: "WhatsApp" },
];

function smoothScrollTo(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  const [newsExpanded, setNewsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const colVariant = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
    }),
  };

  return (
    <footer className="bg-card border-t border-border" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Brand */}
          <motion.div
            custom={0}
            variants={colVariant}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col items-center text-center"
          >
            <img
              src="/logo.jpeg"
              alt="C R Industries Logo"
              className="w-16 h-16 rounded-2xl object-cover mb-4"
            />
            <h3 className="text-2xl font-black tracking-widest text-foreground mb-4">
              C R INDUSTRIES
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              C R INDUSTRIES is committed to excellence, delivering high-performance products that our customers trust. Built on a foundation of quality and innovation, we ensure reliability in every solution we provide.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Operating since 2005</span>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            custom={1}
            variants={colVariant}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col items-center text-center"
          >
            <h4 className="font-black text-foreground text-lg mb-6 tracking-wider uppercase">
              Quick Links
            </h4>
            <nav className="w-full space-y-1 max-w-xs">
              {QUICK_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setNewsExpanded((v) => !v)}
                      className="flex items-center justify-center gap-2 w-full py-2 text-[#0096C7] font-semibold text-sm hover:text-primary/80 transition-colors"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${newsExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {newsExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-muted/50 rounded-xl py-2 mb-1">
                            {link.children.map((child) => (
                              <button
                                key={child.label}
                                onClick={() => smoothScrollTo(child.href)}
                                className="block w-full text-center py-1.5 text-muted-foreground hover:text-primary text-sm transition-colors"
                              >
                                {child.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => smoothScrollTo(link.href)}
                    className="block w-full py-2 text-[#0096C7] hover:text-primary/80 font-semibold text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>
          </motion.div>

          {/* Column 3: Contact & Social */}
          <motion.div
            custom={2}
            variants={colVariant}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col items-center text-center"
          >
            <h4 className="font-black text-foreground text-lg mb-6 tracking-wider uppercase">
              Contact Us
            </h4>
            <div className="space-y-4 mb-6 w-full max-w-xs">
              {[
                {
                  Icon: MapPin,
                  text: "Plot 45, Industrial Area Phase 2, Mumbai, MH 400001",
                },
                { Icon: Phone, text: "+91 98765 43210" },
                { Icon: Mail, text: "info@crindustries.com" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start justify-center gap-3">
                  <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-sm">{text}</span>
                </div>
              ))}
            </div>

            <h5 className="font-bold text-foreground text-sm mb-3 uppercase tracking-widest">
              Follow Us
            </h5>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-md hover:shadow-primary/30"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} C R INDUSTRIES. All rights reserved.</p>
          <p>Engineered for Excellence.</p>
        </div>
      </div>
    </footer>
  );
}

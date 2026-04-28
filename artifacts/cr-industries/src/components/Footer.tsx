import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, MapPin, Phone, Mail, Send } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";

type LinkItem = { label: string; href: string };

const COL_EXPLORE: LinkItem[] = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#product" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const COL_NEWS: LinkItem[] = [
  { label: "Blogs", href: "#blogs" },
  { label: "Media Coverage", href: "#media" },
  { label: "Events & Expos", href: "#events" },
  { label: "Customer Reviews", href: "#reviews" },
  { label: "Press Releases", href: "#press" },
];

const COL_COMPANY: LinkItem[] = [
  { label: "Our Story", href: "#story" },
  { label: "Careers", href: "#careers" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Certifications", href: "#certifications" },
  { label: "Partner With Us", href: "#partners" },
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

function FooterLink({ link }: { link: LinkItem }) {
  return (
    <li>
      <button
        onClick={() => smoothScrollTo(link.href)}
        className="group relative inline-flex items-center gap-1.5 py-1.5 text-muted-foreground hover:text-primary text-sm font-medium transition-all duration-300"
      >
        {/* Sliding accent dot */}
        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        <span className="transition-transform duration-300 group-hover:translate-x-2">
          {link.label}
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-2 transition-all duration-300" />
      </button>
    </li>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="font-black text-foreground text-sm tracking-[0.2em] uppercase">
        {children}
      </h4>
      <div className="mt-2.5 h-0.5 w-8 bg-primary rounded-full" />
    </div>
  );
}

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const colVariant = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
    }),
  };

  return (
    <footer ref={ref} className="relative bg-card border-t border-border overflow-hidden">
      {/* Subtle decorative orb */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(0,150,199,0.18) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(3,4,94,0.18) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── BRAND BAND ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-border">
          <div className="flex items-center gap-4">
            <img
              src="/logo.jpeg"
              alt="C R Industries Logo"
              className="w-14 h-14 rounded-2xl object-cover shadow-lg shadow-primary/20"
            />
            <div>
              <h3 className="text-xl font-black tracking-widest text-foreground leading-tight">
                C R INDUSTRIES
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">
                  Engineered for Excellence — Since 2005
                </span>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-xs font-bold text-muted-foreground tracking-widest uppercase mr-2">
              Follow
            </span>
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary hover:bg-primary transition-colors duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/30"
              >
                <Icon className="w-4 h-4 relative z-10" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── 4-COLUMN GRID ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1: Explore */}
          <motion.div
            custom={0}
            variants={colVariant}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="space-y-0.5 pl-3">
              {COL_EXPLORE.map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </ul>
          </motion.div>

          {/* Col 2: News & Updates */}
          <motion.div
            custom={1}
            variants={colVariant}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <ColumnHeading>News &amp; Updates</ColumnHeading>
            <ul className="space-y-0.5 pl-3">
              {COL_NEWS.map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Company */}
          <motion.div
            custom={2}
            variants={colVariant}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <ColumnHeading>Company</ColumnHeading>
            <ul className="space-y-0.5 pl-3">
              {COL_COMPANY.map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Contact */}
          <motion.div
            custom={3}
            variants={colVariant}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <ColumnHeading>Get in Touch</ColumnHeading>
            <ul className="space-y-3.5">
              {/* Address */}
              <li>
                <a
                  href="https://maps.google.com/?q=Plot+45+Industrial+Area+Phase+2+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors duration-300">
                    <MapPin className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="text-sm leading-relaxed pt-1.5 group-hover:translate-x-1 transition-transform duration-300">
                    Plot 45, Industrial Area Phase 2,<br />Mumbai, MH 400001
                  </span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+919876543210"
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors duration-300">
                    <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    +91 98765 43210
                  </span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:info@crindustries.com"
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors duration-300">
                    <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    info@crindustries.com
                  </span>
                </a>
              </li>
            </ul>

            {/* Mini CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => smoothScrollTo("#contact")}
              className="mt-6 group inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-[#00B4D8] text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-colors duration-200"
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              Send Inquiry
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-foreground">C R INDUSTRIES</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => smoothScrollTo("#privacy")}
              className="relative hover:text-primary transition-colors duration-200 group"
            >
              Privacy Policy
              <span className="absolute bottom-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => smoothScrollTo("#terms")}
              className="relative hover:text-primary transition-colors duration-200 group"
            >
              Terms of Service
              <span className="absolute bottom-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

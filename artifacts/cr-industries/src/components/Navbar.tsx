import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "About", href: "/about" },
  {
    label: "News",
    href: "/blogs",
    children: [
      { label: "Blogs", href: "/blogs" },
      { label: "Media", href: "/media" },
      { label: "Events", href: "/events" },
      { label: "Customer Reviews", href: "/reviews" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

function smoothScrollTo(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);
  const [desktopNewsOpen, setDesktopNewsOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setSidebarOpen(false);
    if (href.startsWith("/")) {
      // Route navigation
      navigate(href);
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    // Hash-based scroll
    if (location !== "/") {
      // Navigate to home first, then scroll after render
      navigate("/");
      setTimeout(() => smoothScrollTo(href), 350);
    } else {
      setTimeout(() => smoothScrollTo(href), 100);
    }
  };

  /* Brand mark click — go to Home and smoothly scroll to top.
     If already on Home, just smooth-scroll. */
  const handleBrandClick = () => {
    setSidebarOpen(false);
    if (location !== "/") {
      navigate("/");
      // Wait a tick for the route to mount, then smooth-scroll
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 80);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              type="button"
              onClick={handleBrandClick}
              aria-label="C R Industries — back to home"
              className="group flex items-center gap-3 rounded-lg "
            >
              <img
                src={theme === "dark" ? "/logo1.jpeg" : "/logo.jpeg"}
                alt="C R Industries Logo"
                className="w-30 h-30 sm:w-30 sm:h-12 lg:w-35 lg:h-35 mt-2 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
              />
              {/* <span
                className="font-black text-xl tracking-widest transition-colors duration-200 group-hover:text-primary"
                style={{ color: theme === "dark" ? "#e2e8f0" : "#03045E" }}
              >
                C R INDUSTRIES
              </span> */}
            </button>

            {/* Right cluster: nav + controls */}
            <div className="flex items-center gap-6">
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6">
                {NAV_LINKS.map((link) =>
                  link.children ? (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setDesktopNewsOpen(true)}
                      onMouseLeave={() => setDesktopNewsOpen(false)}
                    >
                      <button
                        className="flex items-center gap-1 text-sm font-semibold tracking-wide text-foreground hover:text-primary transition-colors"
                        onClick={() => setDesktopNewsOpen((v) => !v)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setDesktopNewsOpen(false);
                        }}
                        aria-haspopup="menu"
                        aria-expanded={desktopNewsOpen}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${desktopNewsOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {desktopNewsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                          >
                            {link.children.map((child) => (
                              <button
                                key={child.label}
                                onClick={() => handleNavClick(child.href)}
                                className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-primary hover:text-white transition-colors"
                              >
                                {child.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      className="group relative text-sm font-semibold tracking-wide text-foreground hover:text-primary transition-colors duration-200 pb-0.5"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
                    </button>
                  ),
                )}
              </nav>

              {/* Theme toggle + hamburger */}
              <div className="flex items-center gap-3 lg:border-l lg:border-border/60 lg:pl-5">
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-secondary hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60] lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 z-[70] flex flex-col lg:hidden"
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(180deg, #03045E 0%, #0096C7 100%)"
                    : "linear-gradient(180deg, #03045E 0%, #0096C7 100%)",
              }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/20">
                <button
                  type="button"
                  onClick={handleBrandClick}
                  aria-label="C R Industries — back to home"
                  className="text-white font-black text-lg tracking-widest hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md"
                >
                  C R INDUSTRIES
                </button>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-5">
                {NAV_LINKS.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileNewsOpen((v) => !v)}
                        className="flex items-center justify-between w-full py-3.5 text-white/90 hover:text-white font-semibold text-base tracking-wide border-b border-white/10"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${mobileNewsOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileNewsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            {link.children.map((child) => (
                              <button
                                key={child.label}
                                onClick={() => handleNavClick(child.href)}
                                className="block w-full text-left py-2.5 pl-6 text-white/75 hover:text-white text-sm font-medium border-b border-white/10"
                              >
                                {child.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      className="block w-full text-left py-3.5 text-white/90 hover:text-white font-semibold text-base tracking-wide border-b border-white/10"
                    >
                      {link.label}
                    </button>
                  ),
                )}
              </nav>

              {/* Social Icons */}
              <div className="p-5 border-t border-white/20">
                <p className="text-white/60 text-xs uppercase tracking-widest mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-4">
                  {[
                    { Icon: FaInstagram, href: "https://instagram.com" },
                    { Icon: FaFacebook, href: "https://facebook.com" },
                    { Icon: FaLinkedin, href: "https://linkedin.com" },
                    {
                      Icon: FaWhatsapp,
                      href: `https://wa.me/919522222196?text=${encodeURIComponent(
                        "Hello C R Industries, I'd like to chat about your products.",
                      )}`,
                    },
                  ].map(({ Icon, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

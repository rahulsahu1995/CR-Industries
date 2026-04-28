import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { X, Play, Image as ImageIcon, Maximize2 } from "lucide-react";
import PageHero from "@/components/PageHero";

const HERO_IMG =
  "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?fm=jpg&q=80&w=2400&auto=format&fit=crop";

interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  category: string;
  span?: "wide" | "tall" | "normal";
}

const GALLERY: MediaItem[] = [
  {
    id: "m1",
    type: "image",
    src: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    title: "Refinery Sealing Project",
    category: "On-Site",
    span: "wide",
  },
  {
    id: "m2",
    type: "image",
    src: "https://images.unsplash.com/photo-1602052577122-f73b9710adba?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    title: "QA Lab Tour",
    category: "R&D",
  },
  {
    id: "m3",
    type: "video",
    src: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    title: "Robotic Coating Demo",
    category: "Product",
  },
  {
    id: "m4",
    type: "image",
    src: "https://images.unsplash.com/photo-1646956141271-05281b4ef472?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    title: "Specialty Compound Formulation",
    category: "R&D",
    span: "tall",
  },
  {
    id: "m5",
    type: "image",
    src: "https://images.unsplash.com/photo-1610891015188-5369212db097?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    title: "Industrial Foam Production Line",
    category: "Manufacturing",
  },
  {
    id: "m6",
    type: "video",
    src: "https://images.unsplash.com/photo-1602056820935-316884c035f8?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    title: "24/7 Plant Operations",
    category: "Behind The Scenes",
  },
  {
    id: "m7",
    type: "image",
    src: "https://images.unsplash.com/photo-1547895749-888a559fc2a7?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    title: "Protective Coating Application",
    category: "On-Site",
  },
  {
    id: "m8",
    type: "image",
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    title: "Sealant Strength Testing Rig",
    category: "R&D",
    span: "wide",
  },
  {
    id: "m9",
    type: "image",
    src: "https://images.unsplash.com/photo-1668600418823-6d4dd4e74353?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    title: "Clean-Room Process",
    category: "Manufacturing",
  },
];

export default function MediaPage() {
  const [open, setOpen] = useState<MediaItem | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Lock body scroll, focus close button, and restore focus on close
  useEffect(() => {
    if (open) {
      lastFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      // Defer to next tick so the modal mounts first
      const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
        lastFocusRef.current?.focus?.();
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [open]);

  // ESC to close + simple focus trap (Tab keeps focus on close button)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(null);
      } else if (e.key === "Tab") {
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative bg-background overflow-hidden">
        <PageHero
          imageUrl={HERO_IMG}
          eyebrow="Our Digital Presence"
          title={
            <>
              See Us in{" "}
              <span className="bg-gradient-to-r from-[#48CAE4] to-[#90E0EF] bg-clip-text text-transparent">
                Action.
              </span>
            </>
          }
          subtitle={
            <>
              A curated visual archive of our brand — products in the field,
              labs in motion, and the people behind every formulation.
            </>
          }
          pills={["Press Kit", "HD Imagery", "Brand Assets"]}
        />

        {/* Resource Gallery */}
        <section
          aria-labelledby="media-grid-title"
          className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <span className="text-primary text-xs font-bold tracking-[0.35em] uppercase">
                Resource Gallery
              </span>
              <h2
                id="media-grid-title"
                className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-foreground"
              >
                Click any tile to{" "}
                <span className="brand-gradient-text">enlarge</span>.
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-4">
              {GALLERY.map((m, i) => {
                const spanClass =
                  m.span === "wide"
                    ? "md:col-span-2 row-span-1"
                    : m.span === "tall"
                    ? "row-span-2"
                    : "";
                return (
                  <motion.button
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: (i % 6) * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4 }}
                    onClick={() => setOpen(m)}
                    aria-label={`Open ${m.title}`}
                    className={`group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-400 ${spanClass}`}
                  >
                    <img
                      src={m.src}
                      alt={m.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#03045E]/85 via-[#03045E]/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400"
                    />

                    {m.type === "video" && (
                      <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 text-primary fill-primary ml-0.5" />
                      </span>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 backdrop-blur border border-white/25 text-[9px] font-black text-white tracking-widest uppercase mb-2">
                        {m.type === "video" ? (
                          <Play className="w-2.5 h-2.5" />
                        ) : (
                          <ImageIcon className="w-2.5 h-2.5" />
                        )}
                        {m.category}
                      </span>
                      <h3 className="text-white text-sm font-black leading-tight line-clamp-2">
                        {m.title}
                      </h3>
                    </div>

                    <span
                      aria-hidden
                      className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/0 group-hover:bg-white/95 backdrop-blur flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <Maximize2 className="w-4 h-4 text-primary" />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
              onClick={() => setOpen(null)}
              role="dialog"
              aria-modal="true"
              aria-label={open.title}
            >
              <motion.button
                ref={closeBtnRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(null);
                }}
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#48CAE4]"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-6xl max-h-[88vh] w-full"
              >
                <img
                  src={open.src}
                  alt={open.title}
                  className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-[10px] font-black tracking-widest uppercase mb-2">
                    {open.category}
                  </span>
                  <h3 className="text-white text-xl sm:text-2xl font-black">
                    {open.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}

import { useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import { useLocation } from "wouter";
import { Star, Quote, Building2, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";

const HERO_IMG =
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?fm=jpg&q=80&w=2400&auto=format&fit=crop";

interface Review {
  id: string;
  rating: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  highlight?: boolean;
}

const REVIEWS: Review[] = [
  {
    id: "r1",
    rating: 5,
    quote:
      "We replaced three competing sealants with C R Industries' Gum Hydra and saw downtime drop by 32% in our first quarter. The technical support team is what really sets them apart.",
    name: "Anil Kapoor",
    title: "Plant Operations Director",
    company: "Vishvas Refineries",
    industry: "Petrochemical",
    highlight: true,
  },
  {
    id: "r2",
    rating: 5,
    quote:
      "Their batch documentation is the cleanest I've audited in 22 years. ISO compliance has never been smoother.",
    name: "Marcus Bauer",
    title: "Quality Auditor",
    company: "Bauer & Klein GmbH",
    industry: "Quality Assurance",
  },
  {
    id: "r3",
    rating: 5,
    quote:
      "The Protective Coating performance in salt-spray testing exceeded the spec by nearly 40%. We're standardizing it across our fleet.",
    name: "Priya Iyer",
    title: "Lead Engineer",
    company: "OceanLine Marine",
    industry: "Marine",
  },
  {
    id: "r4",
    rating: 5,
    quote:
      "Custom specialty compound delivered in 18 days. The chemistry team treated our edge-case like it was their flagship product.",
    name: "Wei Chen",
    title: "Head of Procurement",
    company: "Beijing Precision Tools",
    industry: "Manufacturing",
  },
  {
    id: "r5",
    rating: 5,
    quote:
      "Industrial Foams that actually meet datasheet claims. Thermal performance has been consistent across 14 build sites.",
    name: "Sandra Oliveira",
    title: "Construction Director",
    company: "Atlas Construções",
    industry: "Construction",
    highlight: true,
  },
  {
    id: "r6",
    rating: 4,
    quote:
      "Adhesive bond strength is excellent and the cure time is exactly as advertised. Solid, dependable partner for our assembly lines.",
    name: "Tomás Reyes",
    title: "Production Manager",
    company: "Aurora Aerospace",
    industry: "Aerospace",
  },
];

const STATS = [
  { value: "4.9/5", label: "Avg. Rating" },
  { value: "1,200+", label: "Verified Reviews" },
  { value: "98%", label: "Repeat Order Rate" },
  { value: "18", label: "Industries Served" },
];

export default function ReviewsPage() {
  const [, navigate] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const goContact = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative bg-background overflow-hidden">
        <PageHero
          imageUrl={HERO_IMG}
          eyebrow="Trusted by the Best"
          title={
            <>
              Customer{" "}
              <span className="bg-gradient-to-r from-[#48CAE4] to-[#90E0EF] bg-clip-text text-transparent">
                Stories.
              </span>
            </>
          }
          subtitle={
            <>
              Hear directly from the engineers, plant managers, and procurement
              leaders who put C R Industries products to work every day.
            </>
          }
          pills={["4.9★ Average", "1,200+ Verified", "98% Repeat Buyers"]}
        />

        {/* Stats strip */}
        <section className="relative -mt-8 z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-7 rounded-2xl bg-card border border-border shadow-2xl"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                  <span className="brand-gradient-text">{s.value}</span>
                </div>
                <div className="text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials masonry */}
        <section
          aria-labelledby="reviews-grid-title"
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
                Client Testimonials
              </span>
              <h2
                id="reviews-grid-title"
                className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-foreground"
              >
                What partners are{" "}
                <span className="brand-gradient-text">saying</span>.
              </h2>
            </motion.div>

            {/* CSS columns for masonry feel */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {REVIEWS.map((r, i) => (
                <motion.figure
                  key={r.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.7,
                    delay: (i % 3) * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -8 }}
                  className={`group relative mb-6 break-inside-avoid p-7 rounded-2xl border transition-all duration-400 cursor-default ${
                    r.highlight
                      ? "bg-gradient-to-br from-primary to-[#03045E] text-white border-primary/30 hover:shadow-2xl hover:shadow-primary/30"
                      : "bg-card border-border text-foreground hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                  }`}
                >
                  <Quote
                    className={`w-8 h-8 mb-4 ${
                      r.highlight ? "text-[#48CAE4]" : "text-primary/30"
                    }`}
                  />

                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < r.rating
                            ? r.highlight
                              ? "fill-[#48CAE4] text-[#48CAE4]"
                              : "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote
                    className={`text-base leading-relaxed mb-6 ${
                      r.highlight ? "text-white/95" : "text-foreground"
                    }`}
                  >
                    "{r.quote}"
                  </blockquote>

                  <figcaption
                    className={`pt-5 border-t flex items-center gap-3 ${
                      r.highlight
                        ? "border-white/20"
                        : "border-border"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        r.highlight
                          ? "bg-white/15 text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-sm font-black truncate ${
                          r.highlight ? "text-white" : "text-foreground"
                        }`}
                      >
                        {r.name}
                      </div>
                      <div
                        className={`text-[11px] font-semibold truncate ${
                          r.highlight
                            ? "text-white/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {r.title} · {r.company}
                      </div>
                      <div
                        className={`text-[9px] font-black tracking-widest uppercase mt-0.5 ${
                          r.highlight ? "text-[#48CAE4]" : "text-primary"
                        }`}
                      >
                        {r.industry}
                      </div>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="mt-12 text-center"
            >
              <button
                onClick={goContact}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-black text-sm shadow-xl shadow-primary/30 hover:bg-[#03045E] transition-all"
              >
                Become Our Next Success Story
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}

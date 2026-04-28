import { useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, Tag } from "lucide-react";
import PageHero from "@/components/PageHero";

const HERO_IMG =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?fm=jpg&q=80&w=2400&auto=format&fit=crop";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured?: boolean;
}

const BLOGS: Blog[] = [
  {
    id: "1",
    title: "The Science of Gasket Sealing in High-Pressure Environments",
    excerpt:
      "An in-depth look at how molecular bonding and elastomer chemistry create seals that hold up under 5,000+ PSI in industrial pipelines.",
    category: "Sealants",
    date: "Apr 18, 2026",
    readTime: "8 min read",
    author: "Dr. R. Mehta",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Why Gum Hydra Is a Game-Changer for Underwater Bonding",
    excerpt:
      "Our flagship Gum Hydra formulation cures in fully submerged conditions — here's the chemistry that makes it possible.",
    category: "Adhesives",
    date: "Apr 11, 2026",
    readTime: "6 min read",
    author: "Eng. P. Singh",
    image:
      "https://images.unsplash.com/photo-1646956141271-05281b4ef472?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Closed-Cell vs Open-Cell Foams: Picking the Right Insulation",
    excerpt:
      "A practical guide to specifying industrial foams for thermal performance, acoustic damping, and structural reinforcement.",
    category: "Industrial Foams",
    date: "Apr 04, 2026",
    readTime: "7 min read",
    author: "S. Krishnan",
    image:
      "https://images.unsplash.com/photo-1610891015188-5369212db097?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Protective Coatings That Survive Marine and Coastal Conditions",
    excerpt:
      "Salt spray, UV degradation, biofouling — what to look for in coating systems built for harsh marine environments.",
    category: "Coatings",
    date: "Mar 27, 2026",
    readTime: "9 min read",
    author: "Eng. A. Verma",
    image:
      "https://images.unsplash.com/photo-1547895749-888a559fc2a7?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Quality Assurance: Inside Our 18-Step Batch Verification",
    excerpt:
      "Every batch passes 18 distinct chemical and mechanical tests. Tour the QA lab and learn what goes into ISO certification.",
    category: "Quality",
    date: "Mar 20, 2026",
    readTime: "5 min read",
    author: "QA Team",
    image:
      "https://images.unsplash.com/photo-1602052577122-f73b9710adba?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Specialty Compounds for Aerospace-Grade Vibration Damping",
    excerpt:
      "How tailored polymer chemistries reduce resonance failures in turbine and rotor assemblies — case studies included.",
    category: "Compounds",
    date: "Mar 13, 2026",
    readTime: "10 min read",
    author: "Dr. R. Mehta",
    image:
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
];

export default function BlogsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative bg-background overflow-hidden">
        <PageHero
          imageUrl={HERO_IMG}
          eyebrow="Industry Insights"
          title={
            <>
              Sealing Knowledge,{" "}
              <span className="bg-gradient-to-r from-[#48CAE4] to-[#90E0EF] bg-clip-text text-transparent">
                Shared.
              </span>
            </>
          }
          subtitle={
            <>
              Deep technical perspectives on sealant and adhesive chemistry,
              quality engineering, and the science behind every C R Industries
              compound.
            </>
          }
          pills={["Technical Articles", "Engineer-Authored", "Updated Weekly"]}
        />

        {/* Knowledge Hub */}
        <section
          aria-labelledby="blogs-grid-title"
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
                The Knowledge Hub
              </span>
              <h2
                id="blogs-grid-title"
                className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-foreground"
              >
                Latest from <span className="brand-gradient-text">our lab</span>
                .
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOGS.map((b, i) => (
                <motion.article
                  key={b.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: (i % 3) * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-400 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#03045E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-black text-primary tracking-widest uppercase">
                      <Tag className="w-3 h-3" />
                      {b.category}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-4 text-muted-foreground text-[11px] font-semibold mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {b.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {b.readTime}
                      </span>
                    </div>

                    <h3 className="text-foreground text-lg font-black leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                      {b.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <span className="text-foreground text-xs font-bold">
                        {b.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-primary text-xs font-black uppercase tracking-widest">
                        Read
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}

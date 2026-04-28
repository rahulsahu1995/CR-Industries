import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRoute, useLocation, Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { getCategoryBySlug, PRODUCT_CATEGORIES } from "@/data/productCategories";

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:slug");
  const [, navigate] = useLocation();
  const category = getCategoryBySlug(params?.slug ?? "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [params?.slug]);

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  if (!category) {
    return (
      <main className="min-h-screen pt-32 px-4 text-center bg-background">
        <h1 className="text-4xl font-black text-foreground mb-4">
          Category not found
        </h1>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#00B4D8] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all categories
        </Link>
      </main>
    );
  }

  const Icon = category.icon;

  // Sample products for this category (demo)
  const sampleProducts = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `${category.title.split(" ")[0]} ${["Pro", "Elite", "Max", "Plus", "Industrial", "Heavy-Duty"][i]}`,
    spec: ["50ml tube", "100ml tube", "250ml cartridge", "500ml bottle", "1L can", "5L bucket"][i],
    image: PRODUCT_CATEGORIES[(i + PRODUCT_CATEGORIES.indexOf(category)) % PRODUCT_CATEGORIES.length].image,
  }));

  return (
    <main className="relative bg-background overflow-hidden">
      {/* Hero header */}
      <section
        className="relative pt-32 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${category.accent}10 0%, transparent 60%)`,
        }}
      >
        {/* Decorative orb */}
        <div
          aria-hidden
          className="absolute top-20 -right-32 w-[28rem] h-[28rem] rounded-full pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(circle, ${category.accent}30 0%, transparent 65%)`,
            filter: "blur(50px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            href="/product"
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Categories
          </Link>

          <div ref={headingRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Title block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
                  Product Category
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.05] mb-6">
                {category.title}
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-8">
                {category.description}
              </p>

              {/* Highlights as feature list */}
              <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
                {category.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2">
                    <CheckCircle2
                      className="w-5 h-5 shrink-0"
                      style={{ color: category.accent }}
                    />
                    <span className="text-foreground text-sm font-semibold">{h}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-[#00B4D8] text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" /> Request a Quote
                </motion.button>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={headingInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto w-full max-w-[460px] aspect-square">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-[42%_58%_70%_30%/45%_45%_55%_55%] opacity-25 blur-2xl scale-105`}
                />
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-card shadow-2xl">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-30`}
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl px-5 py-3 shadow-xl">
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-0.5"
                    style={{ color: category.accent }}
                  >
                    {category.productsCount} SKUs Available
                  </p>
                  <p className="text-foreground text-sm font-bold">
                    Industrial-Grade
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-3">
                Featured SKUs
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                Top {category.title}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-foreground text-lg font-black mb-1">
                    {p.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{p.spec}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto bg-card border border-border rounded-3xl p-10 text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4">
            Need help selecting the right {category.title.toLowerCase()}?
          </h3>
          <p className="text-muted-foreground mb-7 max-w-xl mx-auto">
            Our specialists will guide you to the perfect formulation for your application.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-[#00B4D8] text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-colors"
          >
            Talk to an Expert <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </main>
  );
}

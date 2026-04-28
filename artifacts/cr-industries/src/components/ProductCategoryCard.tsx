import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { ProductCategory } from "@/data/productCategories";

export default function ProductCategoryCard({
  category,
  index,
}: {
  category: ProductCategory;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group relative bg-card border border-border rounded-3xl overflow-hidden cursor-pointer transition-shadow duration-400"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
    >
      <Link href={`/product/${category.slug}`} className="block">
        {/* Hover ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20"
          style={{
            boxShadow: `0 0 0 1.5px ${category.accent}55, 0 24px 48px -12px ${category.accent}33`,
          }}
        />

        {/* Image area */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={category.image}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-50 transition-opacity duration-400`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Icon badge */}
          <motion.div
            whileHover={{ rotate: -6, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="absolute top-5 left-5 w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl"
          >
            <Icon className="w-7 h-7" style={{ color: category.accent }} />
          </motion.div>

          {/* Products count badge */}
          <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30">
            <span className="text-white text-xs font-bold tracking-wider">
              {category.productsCount} PRODUCTS
            </span>
          </div>

          {/* Title overlay on image */}
          <div className="absolute bottom-4 left-5 right-5">
            <h3 className="text-white text-2xl font-black leading-tight drop-shadow-lg">
              {category.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-muted-foreground text-sm leading-relaxed mb-5 min-h-[80px]">
            {category.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {category.highlights.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-[11px] font-semibold tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Explore All button */}
          <div
            className="group/btn relative inline-flex items-center justify-between w-full px-5 py-3 rounded-xl border-2 border-border bg-background hover:border-transparent transition-all duration-300 overflow-hidden"
          >
            {/* Sliding fill background */}
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out"
              style={{
                background: `linear-gradient(90deg, ${category.accent}, ${category.accent}cc)`,
              }}
            />
            <span className="relative font-bold text-sm text-foreground group-hover:text-white transition-colors duration-300">
              Explore All
            </span>
            <ArrowRight className="relative w-4 h-4 text-foreground group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          className="h-1 w-0 group-hover:w-full transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, ${category.accent}, transparent)`,
          }}
        />
      </Link>
    </motion.div>
  );
}

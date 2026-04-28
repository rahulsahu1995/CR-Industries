import {
  Droplets,
  Layers,
  Cloud,
  Anchor,
  PaintRoller,
  Beaker,
  SprayCan,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProductCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  gradient: string;
  accent: string;
  productsCount: number;
  highlights: string[];
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "sealants",
    title: "Sealants",
    description:
      "High-performance industrial sealants engineered for leak-proof joints across pipes, fittings, and threaded assemblies in harsh environments.",
    image: "/steps/step2.png",
    icon: Droplets,
    gradient: "from-[#0096C7] to-[#48CAE4]",
    accent: "#0096C7",
    productsCount: 24,
    highlights: ["PTFE Compounds", "Anaerobic", "Hydrophobic", "Multi-standard"],
  },
  {
    slug: "adhesives",
    title: "Adhesives",
    description:
      "Structural and instant adhesives formulated to bond metals, ceramics, and composites under extreme load, vibration, and temperature.",
    image: "/steps/step3.png",
    icon: Layers,
    gradient: "from-[#03045E] to-[#023E8A]",
    accent: "#023E8A",
    productsCount: 18,
    highlights: ["Cyanoacrylate", "Epoxy", "Methacrylate", "UV-Cure"],
  },
  {
    slug: "expanding-foam",
    title: "Expanding Foam",
    description:
      "Polyurethane expanding foams that fill, insulate, and seal cavities — fire-rated and acoustic options for construction and industrial use.",
    image: "/steps/step5.png",
    icon: Cloud,
    gradient: "from-[#0077B6] to-[#0096C7]",
    accent: "#0077B6",
    productsCount: 12,
    highlights: ["Fire-Rated", "Low-Expansion", "Acoustic", "All-Season"],
  },
  {
    slug: "fillers-anchors",
    title: "Fillers & Chemical Anchors",
    description:
      "High-strength chemical anchors and structural fillers designed for heavy-load anchoring in concrete, masonry, and rock substrates.",
    image: "/steps/step6.png",
    icon: Anchor,
    gradient: "from-[#03045E] to-[#0077B6]",
    accent: "#03045E",
    productsCount: 16,
    highlights: ["Vinyl Ester", "Hybrid Resin", "Pure Epoxy", "Seismic-Rated"],
  },
  {
    slug: "coatings",
    title: "Coatings",
    description:
      "Protective industrial coatings offering corrosion resistance, chemical inertness, and durability for pipelines, tanks, and structural steel.",
    image: "/steps/step4.png",
    icon: PaintRoller,
    gradient: "from-[#48CAE4] to-[#0096C7]",
    accent: "#0096C7",
    productsCount: 22,
    highlights: ["Epoxy Coats", "Polyurethane", "Anti-Corrosive", "Heat-Resist"],
  },
  {
    slug: "gums-accessories",
    title: "Gums & Accessories",
    description:
      "Specialty gums, applicators, and accessories that complete the toolkit — from cure-on-contact gums to professional dispensing equipment.",
    image: "/steps/step1.png",
    icon: Beaker,
    gradient: "from-[#0096C7] to-[#03045E]",
    accent: "#0096C7",
    productsCount: 14,
    highlights: ["Gum Hydra", "Dispensers", "Mixing Tips", "Surface Prep"],
  },
  {
    slug: "cleaners-sprays-primers",
    title: "Cleaners, Sprays & Primers",
    description:
      "Pre-application cleaners, activators, and primers that ensure peak adhesion performance across every substrate and bonding scenario.",
    image: "/steps/step4.png",
    icon: SprayCan,
    gradient: "from-[#023E8A] to-[#48CAE4]",
    accent: "#023E8A",
    productsCount: 19,
    highlights: ["Surface Activators", "Degreasers", "Adhesion Primers", "Sprays"],
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

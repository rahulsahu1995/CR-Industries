import {
  Calendar,
  MapPin,
  Users,
  Award,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import soudalLogo from "@assets/SOUDAL_1777887969287.webp";
import cumiLogo from "@assets/CUMI_1777888092659.png";
import averyDennisonLogo from "@assets/AVERY_DENNISON_1777888167310.png";
import kiplLogo from "@assets/Screenshot_2026-05-04_152249_1777888385161.png";

export type Fact = { icon: LucideIcon; label: string; value: string };
export type Section = { heading: string; body: string };

export type Partner = {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  monogram: string;
  /** Optional brand logo. When set, replaces the monogram tile on the slide and modal. */
  logo?: string;
  accent: string;
  accent2: string;
  facts: Fact[];
  detail: {
    intro: string;
    sections: Section[];
    cta: string;
  };
};

export const PARTNERS: Partner[] = [
  {
    id: "soudal",
    name: "SOUDAL",
    shortName: "Soudal Group",
    tagline: "Building the Future of Sealants",
    summary:
      "The largest independent European manufacturer of sealants, adhesives and polyurethane foams. A Belgian family powerhouse delivering chemical construction specialities across 5 continents.",
    monogram: "S",
    logo: soudalLogo,
    accent: "#003594",
    accent2: "#FFD100",
    facts: [
      { icon: Calendar, label: "Founded", value: "1966" },
      { icon: MapPin, label: "HQ", value: "Turnhout, BE" },
      { icon: Users, label: "People", value: "3,100+" },
    ],
    detail: {
      intro:
        "The Soudal Group is the largest independent European manufacturer of sealants, adhesives and polyurethane foams for both professional and private users. Founded in 1966 by Vic Swerts in Turnhout, Belgium, this family business has grown into a true international expert in chemical construction specialities.",
      sections: [
        {
          heading: "Global Footprint",
          body: "19 production branches across 5 continents, sales offices in 44 countries, and a workforce of around 3,100 people worldwide.",
        },
        {
          heading: "Innovation in Our Genes",
          body: "A continuous R&D investment culture — qualified researchers, engineers and technicians develop pioneering products tailored to local market requirements.",
        },
        {
          heading: "Facts & Figures",
          body: "Consolidated turnover of €835 million; 350 million sealant and polyurethane foam units produced annually; nearly €59 million invested every year.",
        },
        {
          heading: "Sustainability",
          body: "Pioneering products for sustainable construction that are safe for people and the environment, manufactured with state-of-the-art energy- and water-efficient technology.",
        },
        {
          heading: "Why This Partnership",
          body: "Soudal's global scale and chemical expertise complements C R Industries' on-the-ground reach in India — together we deliver world-class sealing solutions to every project, large or small.",
        },
      ],
      cta: "Discover Soudal",
    },
  },
  {
    id: "cumi",
    name: "CUMI",
    shortName: "Carborundum Universal Ltd.",
    tagline: "Materials Sciences Engineering Excellence",
    summary:
      "Carborundum Universal Limited — a leading materials sciences engineering solutions provider, part of the 125-year-old Murugappa Group, listed on NSE and BSE.",
    monogram: "C",
    logo: cumiLogo,
    accent: "#C8102E",
    accent2: "#1B1B1B",
    facts: [
      { icon: Calendar, label: "Established", value: "1954" },
      { icon: Building2, label: "Group", value: "Murugappa" },
      { icon: Award, label: "Revenue", value: "₹4,834 Cr" },
    ],
    detail: {
      intro:
        "Carborundum Universal Limited (CUMI) was established in 1954 as a tripartite joint venture between Carborundum Co. (USA), Universal Grinding Wheel (UK) and the Murugappa Group (India). Today CUMI is a leading materials sciences engineering solutions provider with consolidated revenue of ₹4,834 crores and PAT of ₹293 crores in FY 2024-25.",
      sections: [
        {
          heading: "Mines to Market",
          body: "Integrated operations spanning mining, power generation, fusion, manufacturing, marketing and distribution — a uniquely vertically integrated model.",
        },
        {
          heading: "Pioneering Plants",
          body: "Brown Fused Alumina (1964, Edappally), Bauxite Mining (1965, Gujarat), Silicon Carbide (1984, Koratty), AzureS Sol-Gel (2006), Alumina Zirconia (2013) — decades of breakthrough manufacturing.",
        },
        {
          heading: "Global Acquisitions",
          body: "Volzhsky Abrasive Works, Russia (2007) — the world's 2nd largest SiC manufacturer. Foskor Zirconia, South Africa (2008) — strategic Zirconia segment leadership.",
        },
        {
          heading: "Energy Independence",
          body: "Mini-hydel plant at Maniyar (1994) generates over 30% of CUMI's captive power needs — sustainable, secure and self-reliant.",
        },
        {
          heading: "Why This Partnership",
          body: "CUMI's deep mineral and abrasive expertise powers C R Industries' precision surface-preparation and bonding solutions across India's most demanding industrial sectors.",
        },
      ],
      cta: "Discover CUMI",
    },
  },
  {
    id: "avery-dennison",
    name: "AVERY DENNISON",
    shortName: "Avery Dennison",
    tagline: "Making Possible™ — Materials Science & Digital Identity",
    summary:
      "A global materials science and digital identification solutions company with ~35,000 employees in 50+ countries — inventor of the world's first self-adhesive label nearly 90 years ago.",
    monogram: "AD",
    logo: averyDennisonLogo,
    accent: "#CC0000",
    accent2: "#1A1A1A",
    facts: [
      { icon: Calendar, label: "Heritage", value: "~90 years" },
      { icon: MapPin, label: "Countries", value: "50+" },
      { icon: Users, label: "Employees", value: "35,000" },
    ],
    detail: {
      intro:
        "Avery Dennison is a global materials science and digital identification solutions company with approximately 35,000 employees in more than 50 countries. We design and develop labelling and functional materials, RFID inlays and tags, software applications and packaging solutions that connect the physical and digital worlds.",
      sections: [
        {
          heading: "A Legacy of Invention",
          body: "Born nearly 90 years ago with the invention of the world's first self-adhesive label — and we've been asking 'What if?' ever since.",
        },
        {
          heading: "Industries We Serve",
          body: "Home and personal care, apparel, general retail, e-commerce, logistics, food and grocery, pharmaceuticals and automotive — connecting brands with consumers.",
        },
        {
          heading: "Branding & Information",
          body: "Solutions that optimise labour and supply-chain efficiency, reduce waste, mitigate loss, and advance sustainability, circularity and transparency.",
        },
        {
          heading: "Connecting Physical & Digital",
          body: "RFID inlays, intelligent labels and connected packaging that bring transparency to supply chains and richer experiences to consumers.",
        },
        {
          heading: "Why This Partnership",
          body: "Avery Dennison's labelling and adhesive science aligns perfectly with C R Industries' bonding solutions — enabling integrated branding, identification and assembly capabilities for our shared customers.",
        },
      ],
      cta: "Discover Avery Dennison",
    },
  },
  {
    id: "kipl",
    name: "KIPL",
    shortName: "Keshav Innovations Pvt. Ltd.",
    tagline: "Leading India's Transformation in Adhesive Technology",
    summary:
      "Keshav Innovations Pvt Ltd — one of India's leading manufacturers of industrial adhesive tapes, abrasives and surface protection products. ISO 9001:2015 certified with 14+ years of production and export experience.",
    monogram: "K",
    logo: kiplLogo,
    accent: "#0A66B7",
    accent2: "#F08C00",
    facts: [
      { icon: Calendar, label: "Founded", value: "2006" },
      { icon: Award, label: "Certified", value: "ISO 9001:2015" },
      { icon: Building2, label: "Specialty", value: "Adhesive Tapes" },
    ],
    detail: {
      intro:
        "Founded in 2006 as Keshav Enterprises and rebranded as KIPL in 2022, our journey reflects a legacy of growth, innovation and trust. KIPL has evolved into one of India's leading manufacturers of industrial adhesive tapes, abrasives and surface protection products — delivering excellence across a wide range of applications and industries.",
      sections: [
        {
          heading: "What We Do",
          body: "Manufacturing customisable adhesive solutions for leading industries — combining innovation, technology and precision through a controlled process from material selection to final quality checks.",
        },
        {
          heading: "Experienced Team",
          body: "Extensive experience in adhesive tape conversion. Highly trained professionals ensure precise and consistent production quality at every step.",
        },
        {
          heading: "Customised Solutions",
          body: "Free samples are provided until the application is fully approved. Both OEM and ODM customisation requirements are fully supported.",
        },
        {
          heading: "Original & Reliable",
          body: "All branded tapes and materials are 100% authentic. Standard materials are stocked for quick dispatch, with strong production capability for rapid order completion.",
        },
        {
          heading: "Why This Partnership",
          body: "KIPL is C R Industries' trusted Indian manufacturing partner — together we deliver custom adhesive engineering, fast turnaround, and world-class quality across the network.",
        },
      ],
      cta: "Discover KIPL",
    },
  },
];

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
import soudalBuilding from "@assets/SOUDAL_image_1_1777891254847.webp";
import soudalProducts from "@assets/fe3854ab-07d5-45f5-8e48-b608c1992e93_1777891257643.webp";
import soudalGlobe from "@assets/SOUDAL_image_3_1777891266326.webp";

export type Fact = { icon: LucideIcon; label: string; value: string };
export type Section = { heading: string; body: string };
export type GalleryImage = { src: string; alt: string; caption?: string };

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
    /** Optional override for the intro-band heading. Falls back to tagline. */
    heading?: string;
    intro: string;
    sections: Section[];
    cta: string;
  };
  /** Optional editorial gallery rendered on the detail page. */
  gallery?: GalleryImage[];
  /** Optional official partner website (external). Renders a "Visit Website" CTA. */
  website?: string;
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
      heading: "The Soudal Group is Building the Future",
      intro:
        "The Soudal Group is the largest independent European manufacturer of sealants, adhesives and polyurethane foams for professional and private users. This Belgian family business, based in Turnhout and founded by Vic Swerts in 1966, has developed into an international player and expert in chemical construction specialities. The group operates 19 production branches on 5 continents, sales offices in 44 countries and employs around 3,100 people worldwide. A long-term vision for innovation — with substantial investment in R&D — and adaptations to local market requirements have driven the success of the Soudal Group.",
      sections: [
        {
          heading: "Innovation",
          body: "The research and development of new products, product technologies and production methods is in our genes. A team of highly qualified researchers, engineers and technicians is continuously working on the development of new products and applications adapted to the specific requirements of customers in various countries — resulting in pioneering innovative products that strengthen Soudal's market position. Innovation is the driver for organic growth at the Soudal Group.",
        },
        {
          heading: "Facts & Figures",
          body: "A consolidated turnover of €835 million in 2018; 350 million sealant and polyurethane foam units produced across 19 production branches; around 3,100 employees worldwide; almost €59 million in investment in 2018 — those are the impressive facts and figures of the Soudal Group.",
        },
        {
          heading: "Our Activities",
          body: "The Soudal Group manufactures products for its own brands and private labels covering 7 groups: silicones and other sealants, polyurethane foams, adhesives, hybrid polymers, technical aerosols and chemical building products. With its own brands, the Soudal Group focuses on 3 market segments: construction, industrial and retail.",
        },
        {
          heading: "Sustainability",
          body: "The Soudal Group is leading the way in the development of products for sustainable construction, which are safe for people and the environment. As a result of the most modern production technology, energy, water usage, and residual waste are limited. The welfare of employees is another key priority.",
        },
        {
          heading: "Sponsoring",
          body: "From 2023 onwards, the Soudal-Quick Step team represents Soudal at all large international cycling competitions and provides publicity in 190 countries (especially via the Tour de France). The basic values propagated by Soudal — hard work, perseverance and being better than your competitors — are also found in cycling, leading to a positive image transfer to the Soudal brand. Soudal also sponsors KVC Westerlo (football), Soudal Classics (cyclocross) and the Soudal Open (Belgian Open Golf).",
        },
        {
          heading: "Why This Partnership",
          body: "Soudal's global scale and chemical expertise complements C R Industries' on-the-ground reach in India — together we deliver world-class sealing solutions to every project, large or small.",
        },
      ],
      cta: "Discover Soudal",
    },
    gallery: [
      {
        src: soudalBuilding,
        alt: "Soudal headquarters building exterior with the Soudal logo",
        caption:
          "Soudal HQ — Turnhout, Belgium. The home of a Belgian family powerhouse in chemical construction specialities.",
      },
      {
        src: soudalProducts,
        alt: "Rows of Soudal Silirub silicone sealant cartridges in a display",
        caption:
          "Silirub® and Soudal's broader product family — silicones, polyurethane foams, adhesives and hybrid polymers across 7 product groups.",
      },
      {
        src: soudalGlobe,
        alt: "Stylised globe with the Soudal logo overlaid, illustrating global presence",
        caption:
          "19 production branches across 5 continents, 44 sales offices, 3,100 people — a truly global Belgian family business.",
      },
    ],
    website: "https://soudal.in/",
  },
  {
    id: "cumi",
    name: "CUMI",
    shortName: "Carborundum Universal Ltd.",
    tagline: "Materials Sciences Engineering Excellence",
    summary:
      "A leading materials sciences engineering solutions provider — part of the 125-year-old Murugappa Group, listed on NSE and BSE, with operations spanning six continents and exports to 60+ countries.",
    monogram: "C",
    logo: cumiLogo,
    accent: "#C8102E",
    accent2: "#1B1B1B",
    facts: [
      { icon: Calendar, label: "Established", value: "1954" },
      { icon: MapPin, label: "HQ", value: "Chennai, IN" },
      { icon: Users, label: "People", value: "10,000+" },
    ],
    detail: {
      heading: "CUMI is Engineering Materials Science Excellence",
      intro:
        "Carborundum Universal Limited (CUMI) was established in 1954 as a tripartite joint venture between Carborundum Co. (USA), Universal Grinding Wheel (UK) and the Murugappa Group of India. Today CUMI is a leading materials sciences engineering solutions provider with consolidated revenue of ₹4,834 crores and PAT of ₹293 crores in FY 2024-25. As part of the 125-year-old Murugappa Group and listed on the NSE and BSE, CUMI operates a uniquely integrated 'Mines to Market' model — spanning mining, power generation, fusion, manufacturing, marketing and distribution. Over 10,000 employees worldwide collaborate to deliver world-class solutions across Abrasives, Electrominerals, Ceramics and Refractories — serving customers in engineering, auto, infrastructure, steel, glass, power, mining and aerospace across six continents and 60+ countries.",
      sections: [
        {
          heading: "Heritage & Legacy",
          body: "Incorporated in 1954 with a Coated Abrasives facility acquired from Ajax Products, a Bonded Abrasives plant set up at Chennai and Bauxite mining at Bhatia, Gujarat. Seven decades of disciplined growth — through landmark plants in Edappally, Koratty, Hosur and Sriperumbudur and a string of strategic acquisitions across Russia, South Africa, India and beyond — have made CUMI a publicly listed materials sciences leader on India's NSE and BSE.",
        },
        {
          heading: "Mines to Market",
          body: "CUMI operates a uniquely vertically integrated model — from owned mining and captive power generation, to fusion processing, advanced manufacturing, and direct global marketing and distribution. This end-to-end control delivers consistent quality, supply security and cost competitiveness that few peers in the materials sciences space can match.",
        },
        {
          heading: "Facts & Figures",
          body: "Consolidated revenue of ₹4,834 crores and PAT of ₹293 crores in FY 2024-25. Over 10,000 employees worldwide. A geographical footprint spanning six continents with exports to more than 60 countries. Plants and subsidiaries across India, Russia, South Africa, China, the USA, Australia, Europe and the Middle East — a truly global Indian materials science powerhouse.",
        },
        {
          heading: "Product Portfolio",
          body: "World-class solutions across four pillars — Abrasives (bonded, coated, super-abrasives, thin wheels and power tools), Electrominerals (silicon carbide, fused alumina, zirconia), Ceramics (industrial, technical and advanced) and Refractories (super, monolithic and anti-corrosive). Serving engineering, fabrication, auto and auto components, infrastructure, steel, glass, power generation and distribution, mining and aerospace.",
        },
        {
          heading: "The Murugappa Group",
          body: "CUMI is part of the 124-year-old Murugappa Group — an INR 778 billion (₹77,881 crore) conglomerate with 9 listed companies including Tube Investments of India, Cholamandalam Investment & Finance, Coromandel International, CG Power, E.I.D Parry, Shanthi Gears and Wendt (India). Guided by the five lights — integrity, passion, quality, respect and responsibility — and powered by over 83,500 employees across agriculture, engineering, financial services and more.",
        },
        {
          heading: "Why This Partnership",
          body: "CUMI's deep mineral and abrasive expertise — backed by 'Mines to Market' integration and seven decades of materials science leadership — powers C R Industries' precision surface-preparation, grinding and bonding solutions across India's most demanding industrial sectors.",
        },
      ],
      cta: "Discover CUMI",
    },
    website: "https://www.cumi-murugappa.com/",
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

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
import stanAvery from "@assets/avery_image_-1_1777893004010.jpg";
import kiplTapes from "@assets/Self_Adhesive_Tapes_1777894838466.png";
import kiplAbrasives from "@assets/Abrasives_1777894859206.jpg";
import kiplButyl from "@assets/Butyl_Rubber_Products_1777894893448.jpg";
import kiplFilters from "@assets/Air_&_Liquid_Filters_1777894918740.jpg";
import kiplPneumatic from "@assets/Pneumatic_Tools_1777894939109.jpg";
import soudalSilirubSsw from "@assets/Soudal_image_-1_1777895435896.webp";
import soudalGasketSeal from "@assets/Soudal_image_-2_1777895468706.webp";
import soudalFirecrylFr from "@assets/Soudal_image_-3_1777895500308.webp";
import soudalFireSiliconeB1 from "@assets/Soudal_image_-4_1777895535292.webp";
import soudalSoudagumHydro from "@assets/Soudal_image_-5_1777895584925.webp";
import soudalApplicator from "@assets/Soudal_image_-6_1777895650520.webp";
import cumiAjaxCloth from "@assets/cumi_image_-1_1777896116859.jpg";
import cumiHandPads from "@assets/cumi_image_-2_1777896152568.jpg";
import cumiCenterless from "@assets/cumi_image_-3_1777896202485.webp";
import cumiSandmaster from "@assets/cumi_image_-4_1777896272078.jpg";
import cumiToolRoom from "@assets/cumi_image_-5_1777896308315.webp";
import cumiZon from "@assets/cumi_image_-6_1777896346471.webp";

export type Fact = { icon: LucideIcon; label: string; value: string };
export type Section = { heading: string; body: string };
export type GalleryImage = { src: string; alt: string; caption?: string };
export type Product = { name: string; description: string; image: string };

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
  /** Optional product range — renders a Products grid section on the detail page. */
  products?: Product[];
  /** Optional official partner website (external). Renders a "Visit Website" CTA. */
  website?: string;
  /** Optional external "see more products" catalogue URL. Renders a "More Products" button under the products grid. */
  moreProductsUrl?: string;
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
        "Founded by Vic Swerts in Turnhout, Belgium in 1966, the Soudal Group is the largest independent European manufacturer of sealants, adhesives and polyurethane foams. With 19 production branches across 5 continents, sales offices in 44 countries and around 3,100 people worldwide, Soudal is a Belgian family business and global expert in chemical construction specialities — driven by long-term innovation and deep R&D investment.",
      sections: [
        {
          heading: "Our Activities",
          body: "The Soudal Group manufactures products for its own brands and private labels covering 7 groups: silicones and other sealants, polyurethane foams, adhesives, hybrid polymers, technical aerosols and chemical building products — focused on three market segments: construction, industrial and retail.",
        },
        {
          heading: "Innovation & Sustainability",
          body: "Research and development is in our genes — a team of qualified researchers, engineers and technicians continuously develops pioneering products adapted to local requirements. The group leads in sustainable construction, with modern production technology that limits energy use, water consumption and residual waste.",
        },
        {
          heading: "Why This Partnership",
          body: "Soudal's global scale and chemical expertise complements C R Industries' on-the-ground reach in India — together we deliver world-class sealing solutions to every project, large or small.",
        },
      ],
      cta: "Discover Soudal",
    },
    products: [
      {
        name: "Silirub SSW",
        description:
          "A one-part, premium neutral cure, high-modulus silicone sealant for a wide variety of glazing applications in facades and fenestration. Cures into a durable, permanently flexible silicone rubber upon exposure to atmospheric moisture — its exceptional tensile strength and aging resistance makes it ideal for architectural glazing and bonding.",
        image: soudalSilirubSsw,
      },
      {
        name: "Gasket Seal — RTV Silicone Gasket Maker",
        description:
          "A temperature-resistant, elastic, one-component silicone sealant that replaces all cork, felt, fiber, paper and rubber gaskets in all thicknesses and widths — the dependable RTV gasket-making solution for engines and machinery.",
        image: soudalGasketSeal,
      },
      {
        name: "Firecryl FR — Fire Retardant Paintable Acrylic Sealant",
        description:
          "A fire-rated acrylic sealant and filler with up to 4 hours fire rating. Intumescent at temperatures above 120°C, it prevents the penetration of smoke and fire through joints and gaps. Fully paintable for clean architectural finishes.",
        image: soudalFirecrylFr,
      },
      {
        name: "Firesilicone B1 FR — Fire Retardant B1 Silicone Sealant",
        description:
          "A high-quality, neutral, elastic, one-component silicone sealant conforming to the DIN 4102 B1 standard for fire retardancy — with a fire rating of up to 4 hours in certain joint configurations (EN 1366 Part 4 — NN713.020 — BS 476/20).",
        image: soudalFireSiliconeB1,
      },
      {
        name: "Soudagum Hydro",
        description:
          "A one-component, solvent-free waterproofing product for horizontal and vertical surfaces — a flexible, watertight membrane with excellent adhesion to most common substrates, even old or humid, without the use of a primer.",
        image: soudalSoudagumHydro,
      },
      {
        name: "Sealant Applicators",
        description:
          "A complete range of professional applicators — including the MS 168 C (Camel) manual applicator, the Trent pneumatic applicator (600 ml) and the Tyne pneumatic applicator (300 ml) — engineered for smooth, consistent dispensing of sealants and adhesives on every job.",
        image: soudalApplicator,
      },
    ],
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
    moreProductsUrl: "https://soudal.in/professional-product-category/",
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
    accent: "#0077B6",
    accent2: "#48CAE4",
    facts: [
      { icon: Calendar, label: "Established", value: "1954" },
      { icon: MapPin, label: "HQ", value: "Chennai, IN" },
      { icon: Users, label: "People", value: "10,000+" },
    ],
    detail: {
      heading: "CUMI is Engineering Materials Science Excellence",
      intro:
        "Established in 1954 and part of the 125-year-old Murugappa Group, Carborundum Universal Limited (CUMI) is a leading materials sciences engineering solutions provider listed on the NSE and BSE. With over 10,000 employees, a uniquely integrated 'Mines to Market' model and a footprint spanning six continents and 60+ countries, CUMI delivers world-class Abrasives, Electrominerals, Ceramics and Refractories to engineering, auto, infrastructure, steel, glass, power, mining and aerospace.",
      sections: [
        {
          heading: "Mines to Market",
          body: "CUMI operates a uniquely vertically integrated model — from owned mining and captive power generation, to fusion processing, advanced manufacturing, and direct global marketing and distribution. This end-to-end control delivers consistent quality, supply security and cost competitiveness that few peers in the materials sciences space can match.",
        },
        {
          heading: "Product Portfolio",
          body: "World-class solutions across four pillars — Abrasives (bonded, coated, super-abrasives, thin wheels and power tools), Electrominerals (silicon carbide, fused alumina, zirconia), Ceramics (industrial, technical and advanced) and Refractories (super, monolithic and anti-corrosive).",
        },
        {
          heading: "Why This Partnership",
          body: "CUMI's deep mineral and abrasive expertise — backed by 'Mines to Market' integration and seven decades of materials science leadership — powers C R Industries' precision surface-preparation, grinding and bonding solutions across India's most demanding industrial sectors.",
        },
      ],
      cta: "Discover CUMI",
    },
    products: [
      {
        name: "Ajax Cloth Roll",
        description:
          "Made with a unique bond and a flexible cloth backing carrying aluminum oxide grains — ideal for light material removal and finishing of metal and non-metal parts. The flexible cloth backing enables contour sanding on wood, making it best-in-class for plywood and furniture sanding.",
        image: cumiAjaxCloth,
      },
      {
        name: "Ajax DX13 Hand Pads",
        description:
          "Durable abrasive hand pads engineered for controlled sanding and surface preparation. Manufactured with premium aluminum oxide grain on a fibre backing, they provide consistent cutting action and uniform surface refinement — suitable for hand and light machine sanding on metal and wood finishing tasks.",
        image: cumiHandPads,
      },
      {
        name: "Centerless Grinding Wheels",
        description:
          "Precision wheels for the most demanding bright bar steel applications. Built with advanced manufacturing, premium abrasive grains and specially designed vitrified, resin and rubber bond systems — engineered to hold extremely tight tolerances in geometry and density for uniform wear across the spindle. Customised for through-feed, end-feed and in-feed configurations.",
        image: cumiCenterless,
      },
      {
        name: "Sandmaster 12T Wood Cutter",
        description:
          "A precision-engineered cutting blade for clean, controlled cutting of wood and wood-based materials. High-quality carbide teeth and a balanced blade design deliver reliable performance on hardwood, softwood, plywood, MDF and laminated boards — compatible with angle grinders and tile cutters for efficient woodworking and fitting applications.",
        image: cumiSandmaster,
      },
      {
        name: "Tool Room Grinding Wheels",
        description:
          "Used extensively in the manufacture and regrinding of cutting tools like drills, reamers and milling cutters. Available as plain wheels (type 1), cup wheels (types 6 & 11), dish wheels (type 12) and saucer wheels (type 13) — for both dry and wet grinding applications.",
        image: cumiToolRoom,
      },
      {
        name: "CUMI Zon Ultra-Thin Wheel",
        description:
          "Built for industrial metal cutting and fabrication — delivers fast, smooth cutting action with premium grains and a high-strength double-fabric mesh for maximum safety and stability. The advanced abrasive formulation ensures longer wheel life and more cuts per wheel, making it ideal for automotive repair, shipbuilding and structural steel applications.",
        image: cumiZon,
      },
    ],
    website: "https://www.cumi-murugappa.com/",
    moreProductsUrl: "https://cumiabrasive.in/shop-abrasives/",
  },
  {
    id: "avery-dennison",
    name: "AVERY DENNISON",
    shortName: "Avery Dennison",
    tagline: "Making Possible™ — Materials Science & Digital Identity",
    summary:
      "A global materials science and digital identification solutions company with approximately 35,000 employees in more than 50 countries — inventor of the world's first self-adhesive label and a Fortune 500® corporation 90 years in the making.",
    monogram: "AD",
    logo: averyDennisonLogo,
    accent: "#CC0000",
    accent2: "#1A1A1A",
    facts: [
      { icon: Calendar, label: "Founded", value: "1935" },
      { icon: MapPin, label: "Countries", value: "50+" },
      { icon: Users, label: "Employees", value: "35,000" },
    ],
    detail: {
      heading: "Avery Dennison is Making Possible™",
      intro:
        "Avery Dennison is a global materials science and digital identification solutions company with approximately 35,000 employees in more than 50 countries. The company was founded in 1935 by Ray Stanton 'Stan' Avery, who invented the world's first self-adhesive label in downtown Los Angeles with a few spare parts, one bright idea and a $100 loan. Following a 1990 merger with Dennison Manufacturing, the company has grown into a Fortune 500® corporation that designs and develops labelling and functional materials, RFID inlays and tags, software applications and offerings that enhance branded packaging — connecting the physical and digital worlds and serving industries from apparel and retail to logistics, food, pharmaceuticals and automotive.",
      sections: [
        {
          heading: "Heritage & Legacy",
          body: "Our story begins in 1935 with just a few spare parts, one very bright idea and a $100 loan. Ray Stanton 'Stan' Avery invented the world's first self-adhesive label as a way to merchandise objects, founding Avery Adhesives in downtown Los Angeles. In 1990 the company merged with Dennison Manufacturing to form Avery Dennison. Over 90 years later, we've grown from one bright idea into a global Fortune 500® corporation that continues to advance quality and innovation in materials science.",
        },
        {
          heading: "What We Do",
          body: "We design and develop labelling and functional materials, radio frequency identification (RFID) inlays and tags, software applications that connect the physical and digital, and offerings that enhance branded packaging and carry or display information that improves the customer experience. We are Making Possible™ products and solutions that help advance the industries we serve.",
        },
        {
          heading: "Industries Served",
          body: "We serve industries worldwide — home and personal care, apparel, general retail, e-commerce, logistics, food and grocery, pharmaceuticals and automotive — providing branding and information solutions that optimise labour and supply-chain efficiency, reduce waste and mitigate loss, advance sustainability, circularity and transparency, and better connect brands with consumers.",
        },
        {
          heading: "Connecting Physical & Digital",
          body: "RFID inlays, intelligent labels, software applications and connected packaging that bring transparency to supply chains and richer experiences to consumers. We are everywhere you look — but so much more than what you see — bridging the physical and digital with materials science engineered for scale.",
        },
        {
          heading: "Maker Culture & Venture Capital",
          body: "A strong 'maker' culture drives innovation and collaboration as our teams solve some of the world's most complex challenges. The Avery Dennison corporate venture capital programme actively invests and commercially partners with emerging technology and materials science companies — supporting entrepreneurs working on disruptive innovations that strengthen our offering and create value for our customers and strategic partners.",
        },
        {
          heading: "Why This Partnership",
          body: "Avery Dennison's labelling and adhesive science aligns perfectly with C R Industries' bonding and surface solutions — together we deliver integrated branding, identification, RFID-enabled traceability and assembly capabilities for our shared customers across India and beyond.",
        },
      ],
      cta: "Discover Avery Dennison",
    },
    gallery: [
      {
        src: stanAvery,
        alt: "Black and white archive photo of Ray Stanton 'Stan' Avery — founder of Avery Dennison — at his desk with early label dispensers in 1935",
        caption:
          "Ray Stanton 'Stan' Avery in 1935 — inventor of the world's first self-adhesive label. With a few spare parts, one bright idea and a $100 loan, he founded Avery Adhesives in downtown Los Angeles.",
      },
    ],
    website: "https://www.averydennison.com/en/home.html",
  },
  {
    id: "kipl",
    name: "KIPL",
    shortName: "Keshav Innovations Pvt. Ltd.",
    tagline: "Holding Industries Together",
    summary:
      "One of India's leading manufacturers of industrial adhesive tapes, abrasives and surface protection products — ISO 9001:2015 certified with 14+ years of production and export experience, and an authorised distributor for ORAFOL and other renowned global brands.",
    monogram: "K",
    logo: kiplLogo,
    accent: "#0A66B7",
    accent2: "#F08C00",
    facts: [
      { icon: Calendar, label: "Founded", value: "2006" },
      { icon: Award, label: "Certified", value: "ISO 9001:2015" },
      { icon: Building2, label: "Experience", value: "14+ Years" },
    ],
    detail: {
      heading: "KIPL is Holding Industries Together",
      intro:
        "Founded in 2006 and rebranded as KIPL in 2022, we are one of India's leading manufacturers of industrial adhesive tapes, abrasives and surface protection products — and an authorised distributor for ORAFOL and other renowned global brands. As an ISO 9001:2015 certified organisation, we deliver quality-assured solutions across automotive, electronics, packaging, construction, renewable energy and general industrial applications.",
      sections: [
        {
          heading: "What We Do",
          body: "We manufacture customisable adhesive solutions — combining innovation, technology and precision through a tightly controlled process from material selection to final quality checks. Backed by ISO 9001:2015 standards, we engineer adhesive solutions that hold industries together with consistent performance under the most demanding conditions.",
        },
        {
          heading: "The KIPL Difference",
          body: "An experienced team highly trained in adhesive tape conversion, a one-stop partner from coating and die-cutting to printing, free samples until the application is fully approved (OEM and ODM), 100% authentic branded materials, and ready stock plus strong production capability for fast, reliable dispatch.",
        },
        {
          heading: "Why This Partnership",
          body: "KIPL is C R Industries' trusted Indian manufacturing partner — together we deliver custom adhesive engineering, ORAFOL-grade reflective materials, fast turnaround and world-class quality, holding our customers' projects together one bond at a time.",
        },
      ],
      cta: "Discover KIPL",
    },
    products: [
      {
        name: "Self Adhesive Tapes",
        description:
          "A wide range of pressure-sensitive tapes that bond instantly without heat, water or solvent — ideal for bonding, sealing, masking, insulation and surface protection across industrial and general-purpose applications.",
        image: kiplTapes,
      },
      {
        name: "Abrasives",
        description:
          "High-quality sanding and grinding products designed for surface preparation, finishing, polishing and material removal — suitable for metal, wood, automotive and industrial applications.",
        image: kiplAbrasives,
      },
      {
        name: "Butyl Rubber Products",
        description:
          "Manufactured for superior sealing and moisture resistance — ideal for roofing, glazing, insulation and vibration control applications where long-term durability is essential.",
        image: kiplButyl,
      },
      {
        name: "Air & Liquid Filters",
        description:
          "Engineered for efficient filtration, this range removes dust, particles and contaminants from air and liquid systems in demanding industrial environments.",
        image: kiplFilters,
      },
      {
        name: "Pneumatic Tools",
        description:
          "Powered by compressed air, these tools deliver reliable performance for cutting, fastening, grinding and assembly — built for continuous industrial and workshop use.",
        image: kiplPneumatic,
      },
    ],
    website: "https://kipl.co.in/",
    moreProductsUrl: "https://kipl.co.in/products/",
  },
];

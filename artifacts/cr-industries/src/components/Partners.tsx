import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PARTNERS = [
  { name: "TechCorp Industrial", tagline: "Trusted partner for 8+ years in pipeline sealing." },
  { name: "BuildMaster Pro", tagline: "Exclusive supplier of thread sealants since 2018." },
  { name: "AquaFlow Systems", tagline: "Delivering leak-free hydraulic joints worldwide." },
  { name: "MetalFab Solutions", tagline: "Premier adhesive partner for fabrication projects." },
  { name: "IndusPipes Ltd", tagline: "Sealing critical infrastructure with our compounds." },
  { name: "GlobalConst Group", tagline: "Partnership spanning 6 continents." },
  { name: "Precision Valves Co", tagline: "Zero-leak assurance on every joint." },
  { name: "EnergyFlow Inc", tagline: "Trusted for high-pressure gas line sealing." },
  { name: "ProBuild Corp", tagline: "Official distributor in 12 states." },
  { name: "FlexPipe Industries", tagline: "Flexible solutions for dynamic pipeline systems." },
  { name: "SafeJoint Ltd", tagline: "Safety-certified compounds for nuclear facilities." },
  { name: "RapidSeal Tech", tagline: "Fast-cure partner for emergency maintenance." },
];

function PartnerCard({ partner }: { partner: (typeof PARTNERS)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="flex-none w-60 mx-3 bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-primary/40 hover:shadow-primary/5 transition-all duration-300 group cursor-default"
    >
      <div className="w-11 h-11 rounded-xl brand-gradient flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300 shadow-md">
        <span className="text-white font-black text-sm">
          {partner.name
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </span>
      </div>
      <h4 className="font-bold text-foreground text-sm mb-1">{partner.name}</h4>
      <p className="text-muted-foreground text-xs leading-relaxed">{partner.tagline}</p>
    </motion.div>
  );
}

export default function Partners() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true });

  const row1 = [...PARTNERS, ...PARTNERS];
  const row2 = [...PARTNERS].reverse();
  const row2doubled = [...row2, ...row2];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase rounded-full mb-4">
            Trusted By
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-2">
            Our Partners
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-primary mx-auto rounded-full mb-4"
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Empowering Businesses That Shape the Future of Industry
          </p>
          <p className="text-primary font-bold text-xl mt-2">Our Clients</p>
        </motion.div>
      </div>

      {/* Row 1 — right to left */}
      <div className="relative w-full overflow-hidden mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-ticker hover:[animation-play-state:paused]">
          {row1.map((partner, i) => (
            <PartnerCard key={`r1-${partner.name}-${i}`} partner={partner} />
          ))}
        </div>
      </div>

      {/* Row 2 — left to right (reversed) */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-ticker-reverse hover:[animation-play-state:paused]">
          {row2doubled.map((partner, i) => (
            <PartnerCard key={`r2-${partner.name}-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}

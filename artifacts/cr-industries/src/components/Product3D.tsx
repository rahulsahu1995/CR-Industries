import { useRef, useEffect, useState, Component, ErrorInfo, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import * as THREE from "three";
import { Droplets, ShieldCheck, Wrench, Zap } from "lucide-react";

/* ── WebGL detection (before any Three.js code runs) ─────────────── */
function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* ── Error Boundary ───────────────────────────────────────────────── */
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(e: Error) { console.warn("WebGL fallback:", e.message); }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── Polished Caulk Cartridge ─────────────────────────────────────── */
/* Local-space bounds: bottom ≈ -1.65, nozzle tip ≈ 3.66, center ≈ 1.0
   scale=0.9, position=[0,-0.9,0] → world top≈2.39, bottom≈-2.39        */
function CaulkCartridge({ scrollProgressRef }: { scrollProgressRef: { current: number } }) {
  const rootRef  = useRef<THREE.Group>(null);
  const prevRef  = useRef(0);
  const tiltRef  = useRef(0);

  useFrame(() => {
    if (!rootRef.current || !scrollProgressRef) return;
    const p = scrollProgressRef.current ?? 0;

    /* scroll velocity → gentle left/right tilt */
    const delta = p - prevRef.current;
    prevRef.current = p;
    tiltRef.current = tiltRef.current * 0.86 + delta * 10;
    tiltRef.current = Math.max(-0.18, Math.min(0.18, tiltRef.current));

    /* smooth x pitch from overall progress; z tilt from scroll velocity */
    const targetX = p * Math.PI * 0.08;
    rootRef.current.rotation.x += (targetX - rootRef.current.rotation.x) * 0.06;
    rootRef.current.rotation.z += (tiltRef.current - rootRef.current.rotation.z) * 0.09;
  });

  return (
    <group ref={rootRef} scale={0.9} position={[0, -0.9, 0]}>
      <group>

        {/* ── Main body — clearcoat gloss plastic ── */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.42, 3.2, 64]} />
          <meshPhysicalMaterial
            color="#f2f0ec"
            metalness={0.0}
            roughness={0.25}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            reflectivity={0.6}
          />
        </mesh>

        {/* ── Bottom cap — dark metallic ── */}
        <mesh castShadow position={[0, -1.62, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.07, 64]} />
          <meshPhysicalMaterial color="#0d0e1a" metalness={0.85} roughness={0.18} clearcoat={0.5} />
        </mesh>

        {/* ── Bottom piston lip ring ── */}
        <mesh position={[0, -1.535, 0]}>
          <torusGeometry args={[0.42, 0.032, 20, 80]} />
          <meshPhysicalMaterial color="#0096C7" metalness={0.85} roughness={0.12} clearcoat={1.0} clearcoatRoughness={0.05} />
        </mesh>

        {/* ── Bottom body accent band ── */}
        <mesh position={[0, -1.28, 0]}>
          <cylinderGeometry args={[0.424, 0.424, 0.08, 64]} />
          <meshStandardMaterial color="#0096C7" metalness={0.8} roughness={0.15} />
        </mesh>

        {/* ── Shoulder reducer ── */}
        <mesh castShadow position={[0, 1.74, 0]}>
          <cylinderGeometry args={[0.18, 0.42, 0.62, 64]} />
          <meshPhysicalMaterial
            color="#f2f0ec"
            metalness={0.0}
            roughness={0.25}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* ── Shoulder-top ring ── */}
        <mesh position={[0, 1.46, 0]}>
          <torusGeometry args={[0.42, 0.018, 16, 80]} />
          <meshPhysicalMaterial color="#0096C7" metalness={0.85} roughness={0.12} clearcoat={1.0} clearcoatRoughness={0.05} />
        </mesh>

        {/* ── Nozzle collar ── */}
        <mesh castShadow position={[0, 2.14, 0]}>
          <cylinderGeometry args={[0.145, 0.185, 0.18, 40]} />
          <meshPhysicalMaterial color="#0096C7" metalness={0.85} roughness={0.12} clearcoat={1.0} clearcoatRoughness={0.05} />
        </mesh>

        {/* ── Nozzle thread ring ── */}
        <mesh position={[0, 2.24, 0]}>
          <torusGeometry args={[0.155, 0.014, 12, 40]} />
          <meshStandardMaterial color="#03045E" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* ── Long tapered nozzle ── */}
        <mesh castShadow position={[0, 2.9, 0]}>
          <cylinderGeometry args={[0.024, 0.122, 1.35, 32]} />
          <meshPhysicalMaterial
            color="#dcdad6"
            metalness={0.0}
            roughness={0.3}
            clearcoat={0.7}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* ── Nozzle tip cone ── */}
        <mesh castShadow position={[0, 3.61, 0]}>
          <coneGeometry args={[0.024, 0.12, 20]} />
          <meshPhysicalMaterial color="#dcdad6" metalness={0.0} roughness={0.3} clearcoat={0.7} />
        </mesh>

        {/* ── White label background cylinder ── */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.427, 0.427, 1.65, 64]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.0} transparent opacity={0.97} />
        </mesh>

        {/* ── Top label blue band ── */}
        <mesh position={[0, 0.89, 0]}>
          <cylinderGeometry args={[0.429, 0.429, 0.14, 64]} />
          <meshStandardMaterial color="#0096C7" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* ── Bottom label blue band ── */}
        <mesh position={[0, -0.77, 0]}>
          <cylinderGeometry args={[0.429, 0.429, 0.12, 64]} />
          <meshStandardMaterial color="#0096C7" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* ── Label accent stripe (thin, mid) ── */}
        <mesh position={[0, 0.16, 0]}>
          <torusGeometry args={[0.432, 0.008, 10, 80]} />
          <meshStandardMaterial color="#03045E" metalness={0.4} roughness={0.4} transparent opacity={0.5} />
        </mesh>

        {/* ── "C·R INDUSTRIES" brand line ── */}
        <Text
          position={[0, 0.6, 0.435]}
          fontSize={0.056}
          color="#03045E"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.18}
          font={undefined}
        >
          C·R INDUSTRIES
        </Text>

        {/* ── "SEALANT" main label ── */}
        {/* @ts-ignore */}
        <Text
          position={[0, 0.25, 0.435]}
          fontSize={0.155}
          color="#0096C7"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
          outlineWidth={0.004}
          outlineColor="#03045E"
        >
          SEALANT
        </Text>

        {/* ── "INDUSTRIAL GRADE" sub-line ── */}
        <Text
          position={[0, -0.12, 0.435]}
          fontSize={0.044}
          color="#555555"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
          font={undefined}
        >
          INDUSTRIAL GRADE
        </Text>

        {/* ── Volume text ── */}
        <Text
          position={[0, -0.34, 0.435]}
          fontSize={0.038}
          color="#888888"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
          font={undefined}
        >
          300 ML / 10.1 FL OZ
        </Text>

        {/* ── Top accent stripes ── */}
        {[1.04, 1.1].map((y, i) => (
          <mesh key={`top-${i}`} position={[0, y, 0]}>
            <torusGeometry args={[0.432, 0.007, 10, 80]} />
            <meshStandardMaterial color="#0096C7" metalness={0.6} roughness={0.2} />
          </mesh>
        ))}

        {/* ── Bottom accent stripes ── */}
        {[-0.64, -0.7].map((y, i) => (
          <mesh key={`bot-${i}`} position={[0, y, 0]}>
            <torusGeometry args={[0.432, 0.007, 10, 80]} />
            <meshStandardMaterial color="#0096C7" metalness={0.6} roughness={0.2} />
          </mesh>
        ))}

      </group>
    </group>
  );
}

/* ── Step data (4 steps — CR Industries product range) ───────────── */
const STEPS = [
  {
    side: "right" as const,
    tag: "01",
    icon: Droplets,
    title: "Gum Hydra Waterproof Compound",
    desc: "Gum Hydra is C R Industries' hydrophilic expanding sealant — injected into wet or actively leaking concrete joints to form a permanent water-stop seal, even under hydrostatic pressure.",
    img: "/steps/step1.png",
    imgAlt: "Gum Hydra compound applied into concrete expansion joint",
  },
  {
    side: "left" as const,
    tag: "02",
    icon: ShieldCheck,
    title: "Industrial Sealants",
    desc: "Our PTFE-based pipe and joint sealants deliver a chemically resistant, vibration-proof seal on metal and plastic threads. Rated up to 200 bar across a full spectrum of gases, oils, and aggressive media.",
    img: "/steps/step2.png",
    imgAlt: "Industrial sealant compound on pipe threads",
  },
  {
    side: "right" as const,
    tag: "03",
    icon: Wrench,
    title: "Precision Taps & Fittings",
    desc: "C R Industries supplies high-tolerance chrome and brass taps engineered for industrial pipeline systems. Each fitting is pressure-tested and compatible with standard ISO thread forms.",
    img: "/steps/step3.png",
    imgAlt: "Precision chrome industrial tap fitting",
  },
  {
    side: "left" as const,
    tag: "04",
    icon: Zap,
    title: "Industrial Grinders",
    desc: "Our range of industrial angle grinders and abrasive discs prepare metal surfaces for sealing and bonding. Engineered for heavy-duty continuous use in manufacturing and maintenance environments.",
    img: "/steps/step4.png",
    imgAlt: "Industrial angle grinder with sparks on metal",
  },
];

/* ── Full card (used by fallback section) ─────────────────────────── */
function StepCard({ step }: { step: typeof STEPS[0] }) {
  const Icon = step.icon;
  return (
    <div className="bg-card/90 backdrop-blur-md border border-border/70 rounded-2xl overflow-hidden shadow-xl w-full">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        <img src={step.img} alt={step.imgAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg brand-gradient flex items-center justify-center shrink-0">
            <Icon className="w-3 h-3 text-white" />
          </div>
          <h3 className="text-sm font-bold text-foreground leading-snug">{step.title}</h3>
        </div>
        <p className="text-muted-foreground text-[11px] leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

/* ── Stacking card — "dimensional emergence" reveal ──────────────── */
/* Sophisticated entrance: horizontal slit opens from centre while card
   pushes forward on the Z axis, cyan border-light pulses around the
   perimeter, image emerges from a soft-focus desaturated state, content
   rises with a subtle letter-spacing settle. */

const cardVariants = {
  hidden: {
    opacity: 0,
    z: -120,
    scale: 0.92,
    clipPath: "inset(48% 0% 48% 0% round 16px)",
    filter: "brightness(1.35) blur(2px)",
  },
  show: {
    opacity: 1,
    z: 0,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    filter: "brightness(1) blur(0px)",
    transition: {
      duration: 0.78,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
      delayChildren: 0.18,
      clipPath: { duration: 0.78, ease: [0.65, 0, 0.25, 1] },
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.10, filter: "blur(10px) saturate(0.45) brightness(0.85)" },
  show: {
    opacity: 1,
    scale: 1.04,
    filter: "blur(0px) saturate(1) brightness(1)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 10, letterSpacing: "0.06em" },
  show: {
    opacity: 1,
    y: 0,
    letterSpacing: "0em",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  show: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 20, mass: 0.6 },
  },
};

/* Border light — a horizontal beam that flashes across the centre,
   then fades — represents the slit "closing" into a fully formed card. */
const beamVariants = {
  hidden: { opacity: 0, scaleX: 0.2 },
  show: {
    opacity: [0, 0.9, 0.9, 0],
    scaleX: [0.2, 1.05, 1.05, 1.05],
    transition: {
      duration: 0.78,
      ease: [0.22, 1, 0.36, 1],
      times: [0, 0.4, 0.7, 1],
    },
  },
};

/* Cyan corner-light flash — pulses from top-left corner once after card lands. */
const cornerVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: [0, 0.55, 0],
    scale: [0.6, 1.4, 1.6],
    transition: { duration: 0.95, delay: 0.45, ease: "easeOut", times: [0, 0.35, 1] },
  },
};

function StackCard({ step, isNewest, fromSide: _fromSide }: {
  step: typeof STEPS[0];
  isNewest: boolean;
  fromSide: "left" | "right";
}) {
  const Icon = step.icon;
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      style={{
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter, clip-path",
      }}
      className={`relative rounded-2xl overflow-hidden border transition-[opacity,box-shadow,border-color,transform] duration-500 ${
        isNewest
          ? "border-primary/60 shadow-2xl shadow-primary/25 bg-card"
          : "border-border/35 shadow-md bg-card/70 opacity-60 scale-[0.97]"
      }`}
    >
      {/* Brand-tinted radial sheen — newest card only */}
      {isNewest && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl z-[1]"
          style={{
            background:
              "radial-gradient(130% 90% at 0% 0%, rgba(0,150,199,0.14), transparent 55%), radial-gradient(120% 80% at 100% 100%, rgba(3,4,94,0.10), transparent 60%)",
          }}
        />
      )}

      {/* Centre-line beam — the moment the slit closes */}
      {isNewest && (
        <motion.span
          aria-hidden
          variants={beamVariants}
          className="pointer-events-none absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 origin-center z-[3]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(72,202,228,0.0) 8%, rgba(72,202,228,0.95) 50%, rgba(72,202,228,0.0) 92%, transparent 100%)",
            filter: "blur(0.5px)",
            boxShadow:
              "0 0 14px rgba(0,180,216,0.55), 0 0 28px rgba(0,150,199,0.35)",
          }}
        />
      )}

      {/* Corner-light flash — top-left */}
      {isNewest && (
        <motion.span
          aria-hidden
          variants={cornerVariants}
          className="pointer-events-none absolute -top-3 -left-3 w-20 h-20 rounded-full z-[2]"
          style={{
            background:
              "radial-gradient(circle, rgba(72,202,228,0.55) 0%, rgba(72,202,228,0.18) 35%, transparent 70%)",
            filter: "blur(8px)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* Image */}
      <div className="relative w-full aspect-[5/3] overflow-hidden">
        <motion.img
          src={step.img}
          alt={step.imgAlt}
          variants={imageVariants}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transformOrigin: "center", willChange: "transform, filter, opacity" }}
        />
        {!isNewest && <div className="absolute inset-0 bg-background/30" />}
        {isNewest && (
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-card/5 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="relative px-3.5 pt-3 pb-3.5 md:px-4 md:pt-3.5 md:pb-4 lg:px-5 lg:pt-4 lg:pb-5">
        <div className="flex items-center gap-2 md:gap-2.5 mb-1.5 md:mb-2">
          <motion.div
            variants={iconVariants}
            className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isNewest ? "brand-gradient shadow-md shadow-primary/30" : "bg-muted"
            }`}
          >
            <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isNewest ? "text-white" : "text-muted-foreground"}`} />
          </motion.div>
          <motion.p
            variants={titleVariants}
            className="text-[12.5px] md:text-sm lg:text-[15px] font-bold text-foreground leading-snug line-clamp-2 min-w-0"
          >
            {step.title}
          </motion.p>
        </div>

        <motion.p
          variants={descVariants}
          className={`text-[11px] md:text-[12px] lg:text-[13px] leading-relaxed line-clamp-3 ${
            isNewest ? "text-muted-foreground" : "text-muted-foreground/45"
          }`}
        >
          {step.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ── Fallback card (hooks at component level) ────────────────────── */
function FallbackCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const Icon = step.icon;
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-50px" });
  return (
    <motion.div ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-[16/7] overflow-hidden">
        <img src={step.img} alt={step.imgAlt} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Fallback (no WebGL) ─────────────────────────────────────────── */
function FallbackSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="product" className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase rounded-full mb-4">Product Range</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">Industrial Sealant Solutions</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STEPS.map((step, i) => (
            <FallbackCard key={step.tag} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Product plaque — horizontal label affixed below the 3D model ── */
function ProductPlaque() {
  return (
    <div
      className="relative flex items-center gap-4 bg-card border border-border/60 rounded-lg px-5 py-2.5 overflow-hidden"
      style={{
        boxShadow:
          "0 -3px 10px rgba(0,0,0,0.12), 0 4px 14px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Horizontal rule paper texture */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,#000 0,transparent 1px,transparent 4px)" }}
      />
      {/* Left barcode */}
      <div className="relative flex items-end gap-px shrink-0">
        {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1].map((w, i) => (
          <div
            key={i}
            className="bg-foreground/45 rounded-[1px]"
            style={{ width: `${w}px`, height: i % 3 === 0 ? "11px" : "7px" }}
          />
        ))}
      </div>
      {/* Centre text */}
      <div className="relative text-center flex-1">
        <p className="text-[8px] font-black tracking-[0.32em] uppercase text-primary leading-none">
          C · R  Industries
        </p>
        <h2 className="text-[15px] font-black text-foreground tracking-[0.13em] uppercase leading-snug mt-0.5">
          3D Showcase
        </h2>
        <p className="text-[6.5px] text-muted-foreground tracking-[0.28em] mt-0.5">
          CR-PROD · 2026
        </p>
      </div>
      {/* Right barcode */}
      <div className="relative flex items-end gap-px shrink-0">
        {[1, 3, 1, 2, 1, 3, 1, 2, 1, 3].map((w, i) => (
          <div
            key={i}
            className="bg-foreground/45 rounded-[1px]"
            style={{ width: `${w}px`, height: i % 3 === 0 ? "11px" : "7px" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MOBILE & TABLET LAYOUT
   Below the `lg` breakpoint the sticky scroll-stack collapses into a
   natural-flow section: header → canvas → plaque → all 4 cards in a
   1-col (mobile) / 2-col (tablet) grid, every card always visible and
   scroll-revealed. Section height is intrinsic, so cards can never be
   clipped no matter how tall their content grows.
   ───────────────────────────────────────────────────────────────────── */

function MobileProductCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const Icon = step.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay: index * 0.05 }}
      style={{
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter, clip-path",
      }}
      className="relative rounded-2xl overflow-hidden border border-primary/40 shadow-xl shadow-primary/15 bg-card"
    >
      {/* Brand radial sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl z-[1]"
        style={{
          background:
            "radial-gradient(130% 90% at 0% 0%, rgba(0,150,199,0.12), transparent 55%), radial-gradient(120% 80% at 100% 100%, rgba(3,4,94,0.08), transparent 60%)",
        }}
      />

      {/* Image */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[5/3] overflow-hidden">
        <motion.img
          src={step.img}
          alt={step.imgAlt}
          variants={imageVariants}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transformOrigin: "center", willChange: "transform, filter, opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-card/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-5">
        <div className="flex items-center gap-3 mb-2.5">
          <motion.div
            variants={iconVariants}
            className="w-10 h-10 rounded-lg brand-gradient shadow-md shadow-primary/30 flex items-center justify-center shrink-0"
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <motion.h3
            variants={titleVariants}
            className="text-base sm:text-lg font-bold text-foreground leading-snug min-w-0"
          >
            {step.title}
          </motion.h3>
        </div>
        <motion.p
          variants={descVariants}
          className="text-sm text-muted-foreground leading-relaxed"
        >
          {step.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

function Product3DMobileTablet() {
  /* Mobile cartridge gets a slow auto-tick so it has a gentle idle
     motion — no sticky scroll progress to drive it on this layout. */
  const cartridgeRef = useRef(0.25);
  useEffect(() => {
    let rafId = 0;
    let t = 0.25;
    let dir = 1;
    const tick = () => {
      t += 0.0006 * dir;
      if (t > 0.85) dir = -1;
      else if (t < 0.15) dir = 1;
      cartridgeRef.current = t;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      id="product"
      className="relative overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6"
    >
      {/* Background — matches desktop ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/40 to-muted -z-10" />
      <div
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#0096C7 0,transparent 1px,transparent 56px),repeating-linear-gradient(90deg,#0096C7 0,transparent 1px,transparent 56px)",
        }}
      />

      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-bold tracking-widest uppercase rounded-full mb-4">
          Product Range
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3 leading-tight">
          Industrial Sealant Solutions
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </div>

      {/* Canvas + plaque */}
      <div className="max-w-md sm:max-w-lg mx-auto mb-10 sm:mb-12">
        <div className="h-[40vh] sm:h-[46vh] min-h-[260px] max-h-[420px] mb-3">
          <Canvas
            camera={{ position: [0, 0, 7], fov: 42 }}
            shadows={{ type: THREE.PCFShadowMap }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 5]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} />
            <directionalLight position={[-4, 2, -3]} intensity={0.55} color="#48CAE4" />
            <directionalLight position={[0, -4, 2]} intensity={0.25} color="#ffffff" />
            <pointLight position={[2, 3, 2]} intensity={0.6} color="#ffffff" />
            <pointLight position={[-2, -1, 3]} intensity={0.35} color="#0096C7" />
            <CaulkCartridge scrollProgressRef={cartridgeRef} />
            <Environment preset="studio" />
          </Canvas>
        </div>
        <div className="flex justify-center">
          <ProductPlaque />
        </div>
      </div>

      {/* All 4 cards — always visible, scroll-revealed individually */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto"
        style={{ perspective: "1400px" }}
      >
        {STEPS.map((step, i) => (
          <MobileProductCard key={step.tag} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── 3D inner section (DESKTOP ONLY — lg and up) ──────────────────── */
function Product3DInner() {
  const wrapRef       = useRef<HTMLDivElement>(null);
  const progressRef   = useRef(0);              // always-fresh ref for useFrame
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const rect  = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const p     = Math.min(1, Math.max(0, -rect.top) / total);
      progressRef.current = p;
      setStep(
        p < 0.02 ? -1 : p < 0.26 ? 0 : p < 0.50 ? 1 :
        p < 0.74 ? 2  : 3
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* All revealed cards per side — accumulate, never discard */
  const revealedLeft  = STEPS.filter((s, i) => s.side === "left"  && step >= i);
  const revealedRight = STEPS.filter((s, i) => s.side === "right" && step >= i);

  /* Mobile: all revealed steps in order */
  const revealedAll = STEPS.filter((_, i) => step >= i);

  return (
    <section id="product" ref={wrapRef} className="relative h-[200vh]">
      {/* sticky panel — strictly h-screen, nothing escapes */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/40 to-muted" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#0096C7 0,transparent 1px,transparent 56px),repeating-linear-gradient(90deg,#0096C7 0,transparent 1px,transparent 56px)" }} />

        {/*
          Content wrapper:
          - pt-16  = clears the sticky 64px navbar
          - pb-3   = small bottom breathing room
          - overflow-hidden = hard clip — nothing leaks out
        */}
        <div className="relative h-full overflow-hidden flex flex-col pt-16 pb-3 px-3 md:px-5 lg:px-8">

          {/* Scroll hint ── tiny, never grows */}
          <motion.p
            animate={{ opacity: [0.3, 0.85, 0.3] }}
            transition={{ duration: 2.6, repeat: Infinity }}
            className="flex-none text-center text-[9px] text-muted-foreground tracking-widest mb-1"
          >
            ↓ scroll to explore
          </motion.p>

          {/*
            Unified column container:
            - mobile  → flex-col (canvas stacks above cards)
            - desktop → flex-row (side columns flank the canvas)
            Narrower columns (160–190px) pull panels visually closer to center.
          */}
          <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-4 overflow-hidden md:max-w-7xl md:mx-auto md:w-full">

            {/* ── Left column — desktop only ── */}
            <div className="hidden md:flex w-[230px] lg:w-[270px] xl:w-[300px] shrink-0
                            flex-col gap-3 lg:gap-4 overflow-hidden pt-2"
                 style={{ perspective: "1400px" }}>
              {revealedLeft.map((s, i) => (
                <StackCard
                  key={s.tag}
                  step={s}
                  isNewest={i === revealedLeft.length - 1}
                  fromSide="left"
                />
              ))}
            </div>

            {/* ── Centre: canvas + plaque + mobile cards ── */}
            <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">

              {/*
                Canvas height:
                  mobile  → h-[44vh]  (explicit, leaves room for cards below)
                  desktop → flex-1 min-h-0  (fills remaining column height)
              */}
              <div className="shrink-0 h-[44vh] md:h-auto md:flex-1 md:min-h-0 overflow-hidden">
                <Canvas
                  camera={{ position: [0, 0, 7], fov: 42 }}
                  shadows={{ type: THREE.PCFShadowMap }}
                  gl={{ antialias: true, powerPreference: "high-performance" }}
                  style={{ width: "100%", height: "100%", display: "block" }}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[4, 6, 5]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} />
                  <directionalLight position={[-4, 2, -3]} intensity={0.55} color="#48CAE4" />
                  <directionalLight position={[0, -4, 2]} intensity={0.25} color="#ffffff" />
                  <pointLight position={[2, 3, 2]} intensity={0.6} color="#ffffff" />
                  <pointLight position={[-2, -1, 3]} intensity={0.35} color="#0096C7" />
                  <CaulkCartridge scrollProgressRef={progressRef} />
                  <Environment preset="studio" />
                </Canvas>
              </div>

              {/* Plaque — always below the canvas */}
              <div className="shrink-0 py-1.5 md:py-2 flex justify-center">
                <ProductPlaque />
              </div>

              {/* Mobile card grid — 2 columns, scrollable, only visible < md */}
              <div className="md:hidden flex-1 min-h-0 overflow-y-auto
                              grid grid-cols-2 gap-3 pb-2 content-start"
                   style={{ perspective: "1400px" }}>
                {revealedAll.map((s, i) => (
                  <StackCard
                    key={s.tag}
                    step={s}
                    isNewest={i === revealedAll.length - 1}
                    fromSide={s.side}
                  />
                ))}
              </div>

            </div>

            {/* ── Right column — desktop only ── */}
            <div className="hidden md:flex w-[230px] lg:w-[270px] xl:w-[300px] shrink-0
                            flex-col gap-3 lg:gap-4 overflow-hidden pt-2"
                 style={{ perspective: "1400px" }}>
              {revealedRight.map((s, i) => (
                <StackCard
                  key={s.tag}
                  step={s}
                  isNewest={i === revealedRight.length - 1}
                  fromSide="right"
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Export ───────────────────────────────────────────────────────── */
/* Switches between the desktop sticky-scroll layout (lg+) and the
   natural-flow mobile/tablet layout via matchMedia. Only one tree is
   ever mounted, so a single WebGL context is created. Desktop logic
   above is unchanged. */
export default function Product3D() {
  const [webgl] = useState(isWebGLAvailable);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!webgl) return <FallbackSection />;

  return (
    <WebGLErrorBoundary fallback={<FallbackSection />}>
      {isDesktop ? <Product3DInner /> : <Product3DMobileTablet />}
    </WebGLErrorBoundary>
  );
}

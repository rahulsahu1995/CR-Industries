import { useRef, useEffect, useState, Suspense, Component, ErrorInfo, ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, MotionValue } from "framer-motion";
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
  componentDidCatch(e: Error, info: ErrorInfo) { console.warn("WebGL fallback:", e?.message, e?.stack, info?.componentStack); }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── Polished Caulk Cartridge ─────────────────────────────────────── */
function CaulkCartridge({ scrollProgressRef }: { scrollProgressRef: { current: number } }) {
  const rootRef  = useRef<THREE.Group>(null);
  const prevRef  = useRef(0);
  const tiltRef  = useRef(0);

  useFrame(() => {
    if (!rootRef.current || !scrollProgressRef) return;
    const p = scrollProgressRef.current ?? 0;

    const delta = p - prevRef.current;
    prevRef.current = p;
    tiltRef.current = tiltRef.current * 0.86 + delta * 10;
    tiltRef.current = Math.max(-0.18, Math.min(0.18, tiltRef.current));

    const targetX = p * Math.PI * 0.08;
    rootRef.current.rotation.x += (targetX - rootRef.current.rotation.x) * 0.06;
    rootRef.current.rotation.z += (tiltRef.current - rootRef.current.rotation.z) * 0.09;
  });

  return (
    <group ref={rootRef} scale={0.9} position={[0, -0.9, 0]}>
      <group>
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

        <mesh castShadow position={[0, -1.62, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.07, 64]} />
          <meshPhysicalMaterial color="#0d0e1a" metalness={0.85} roughness={0.18} clearcoat={0.5} />
        </mesh>

        <mesh position={[0, -1.535, 0]}>
          <torusGeometry args={[0.42, 0.032, 20, 80]} />
          <meshPhysicalMaterial color="#0096C7" metalness={0.85} roughness={0.12} clearcoat={1.0} clearcoatRoughness={0.05} />
        </mesh>

        <mesh position={[0, -1.28, 0]}>
          <cylinderGeometry args={[0.424, 0.424, 0.08, 64]} />
          <meshStandardMaterial color="#0096C7" metalness={0.8} roughness={0.15} />
        </mesh>

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

        <mesh position={[0, 1.46, 0]}>
          <torusGeometry args={[0.42, 0.018, 16, 80]} />
          <meshPhysicalMaterial color="#0096C7" metalness={0.85} roughness={0.12} clearcoat={1.0} clearcoatRoughness={0.05} />
        </mesh>

        <mesh castShadow position={[0, 2.14, 0]}>
          <cylinderGeometry args={[0.145, 0.185, 0.18, 40]} />
          <meshPhysicalMaterial color="#0096C7" metalness={0.85} roughness={0.12} clearcoat={1.0} clearcoatRoughness={0.05} />
        </mesh>

        <mesh position={[0, 2.24, 0]}>
          <torusGeometry args={[0.155, 0.014, 12, 40]} />
          <meshStandardMaterial color="#03045E" metalness={0.7} roughness={0.2} />
        </mesh>

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

        <mesh castShadow position={[0, 3.61, 0]}>
          <coneGeometry args={[0.024, 0.12, 20]} />
          <meshPhysicalMaterial color="#dcdad6" metalness={0.0} roughness={0.3} clearcoat={0.7} />
        </mesh>

        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.427, 0.427, 1.65, 64]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.0} transparent opacity={0.97} />
        </mesh>

        <mesh position={[0, 0.89, 0]}>
          <cylinderGeometry args={[0.429, 0.429, 0.14, 64]} />
          <meshStandardMaterial color="#0096C7" metalness={0.5} roughness={0.3} />
        </mesh>

        <mesh position={[0, -0.77, 0]}>
          <cylinderGeometry args={[0.429, 0.429, 0.12, 64]} />
          <meshStandardMaterial color="#0096C7" metalness={0.5} roughness={0.3} />
        </mesh>

        <mesh position={[0, 0.16, 0]}>
          <torusGeometry args={[0.432, 0.008, 10, 80]} />
          <meshStandardMaterial color="#03045E" metalness={0.4} roughness={0.4} transparent opacity={0.5} />
        </mesh>

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

        {[1.04, 1.1].map((y, i) => (
          <mesh key={`top-${i}`} position={[0, y, 0]}>
            <torusGeometry args={[0.432, 0.007, 10, 80]} />
            <meshStandardMaterial color="#0096C7" metalness={0.6} roughness={0.2} />
          </mesh>
        ))}

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
    tag: "01",
    icon: Droplets,
    title: "Gum Hydra Waterproof Compound",
    desc: "Gum Hydra is C R Industries' hydrophilic expanding sealant — injected into wet or actively leaking concrete joints to form a permanent water-stop seal, even under hydrostatic pressure.",
    img: "/steps/step1.png",
    imgAlt: "Gum Hydra compound applied into concrete expansion joint",
  },
  {
    tag: "02",
    icon: ShieldCheck,
    title: "Industrial Sealants",
    desc: "Our PTFE-based pipe and joint sealants deliver a chemically resistant, vibration-proof seal on metal and plastic threads. Rated up to 200 bar across a full spectrum of gases, oils, and aggressive media.",
    img: "/steps/step2.png",
    imgAlt: "Industrial sealant compound on pipe threads",
  },
  {
    tag: "03",
    icon: Wrench,
    title: "Precision Taps & Fittings",
    desc: "C R Industries supplies high-tolerance chrome and brass taps engineered for industrial pipeline systems. Each fitting is pressure-tested and compatible with standard ISO thread forms.",
    img: "/steps/step3.png",
    imgAlt: "Precision chrome industrial tap fitting",
  },
  {
    tag: "04",
    icon: Zap,
    title: "Industrial Grinders",
    desc: "Our range of industrial angle grinders and abrasive discs prepare metal surfaces for sealing and bonding. Engineered for heavy-duty continuous use in manufacturing and maintenance environments.",
    img: "/steps/step4.png",
    imgAlt: "Industrial angle grinder with sparks on metal",
  },
];

/* Position mapping — STEPS order [TL, TR, BR, BL] follows the
   clockwise arrow flow: Top-Left → Top-Right → Bottom-Right → Bottom-Left. */
type Corner = "TL" | "TR" | "BL" | "BR";
const CORNERS: Corner[] = ["TL", "TR", "BR", "BL"];

const cornerEnterOffset: Record<Corner, { x: number; y: number }> = {
  TL: { x: -28, y: -22 },
  TR: { x:  28, y: -22 },
  BL: { x: -28, y:  22 },
  BR: { x:  28, y:  22 },
};

/* ── Product Card — image on top, title + description outside the image ── */
function ProductCard({
  step,
  index,
  position,
  compact = false,
  scrollProgress,
  revealRange,
}: {
  step: typeof STEPS[0];
  index: number;
  position: Corner;
  compact?: boolean;
  scrollProgress?: MotionValue<number>;
  revealRange?: [number, number];
}) {
  const Icon = step.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const off = cornerEnterOffset[position];

  /* Scroll-driven reveal (used on desktop sticky flow). When scrollProgress
     + revealRange are provided, the card's opacity/translate are bound to
     scroll position instead of useInView. */
  const driven = !!scrollProgress && !!revealRange;
  const fallbackMV = useMotionValue(0);
  const baseProgress = scrollProgress ?? fallbackMV;
  const r0 = revealRange?.[0] ?? 0;
  const r1 = revealRange?.[1] ?? 1;
  const opacityMV = useTransform(baseProgress, [r0, r0 + (r1 - r0) * 0.6, r1], [0, 1, 1], { clamp: true });
  const xMV = useTransform(baseProgress, [r0, r1], [off.x, 0], { clamp: true });
  const yMV = useTransform(baseProgress, [r0, r1], [off.y, 0], { clamp: true });

  const drivenStyle = driven
    ? ({ opacity: opacityMV, x: xMV, y: yMV } as unknown as React.CSSProperties)
    : undefined;

  return (
    <motion.div
      ref={ref}
      initial={driven ? false : { opacity: 0, x: off.x, y: off.y }}
      animate={!driven && inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={
        driven
          ? undefined
          : { duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }
      }
      style={drivenStyle}
      className="group relative w-full"
    >
      {/* Image (on top, separate container) */}
      <div
        className={`relative w-full overflow-hidden rounded-xl shadow-md ring-1 ring-border/50 bg-muted ${
          compact ? "aspect-[20/9]" : "aspect-[10/7]"
        }`}
      >
        <img
          src={step.img}
          alt={step.imgAlt}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
      </div>

      {/* Title + description (outside the image container) */}
      <div className={compact ? "pt-1.5" : "pt-3.5"}>
        <div className={`flex items-center gap-2 ${compact ? "mb-0.5" : "mb-1.5"}`}>
          <div
            className={`rounded-md brand-gradient shadow shadow-primary/30 flex items-center justify-center shrink-0 ${
              compact ? "w-6 h-6" : "w-9 h-9"
            }`}
          >
            <Icon className={`text-white ${compact ? "w-3 h-3" : "w-4 h-4"}`} />
          </div>
          <h3
            className={`font-bold text-foreground leading-tight ${
              compact
                ? "text-[12px] xl:text-[13px]"
                : "text-[15px] sm:text-base lg:text-[15.5px] xl:text-base"
            }`}
          >
            {step.title}
          </h3>
        </div>
        <p
          className={`text-muted-foreground leading-snug ${
            compact ? "text-[10.5px] xl:text-[11px] line-clamp-2" : "text-[13px] leading-relaxed"
          }`}
        >
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Animated red flow arrows — draw-on-scroll TL → TR → BR → BL ──
   Each arrow's `pathLength` is bound to a slice of the section's scroll
   progress, so the lines visibly draw themselves toward the next image
   as the user scrolls through the (sticky) section. */
function FlowArrows({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const arrows = [
    { d: "M 26 12 Q 50 -2 74 12",  range: [0.12, 0.24] as [number, number] }, // TL → TR
    { d: "M 88 26 Q 102 50 88 74", range: [0.36, 0.48] as [number, number] }, // TR → BR
    { d: "M 74 88 Q 50 102 26 88", range: [0.60, 0.72] as [number, number] }, // BR → BL
  ];

  const len0 = useTransform(scrollProgress, arrows[0].range, [0, 1], { clamp: true });
  const len1 = useTransform(scrollProgress, arrows[1].range, [0, 1], { clamp: true });
  const len2 = useTransform(scrollProgress, arrows[2].range, [0, 1], { clamp: true });
  const lengths = [len0, len1, len2];

  /* Hide the arrowhead until the line is at least slightly drawn,
     otherwise the marker would float at the start position. */
  const op0 = useTransform(len0, [0, 0.05, 1], [0, 1, 1]);
  const op1 = useTransform(len1, [0, 0.05, 1], [0, 1, 1]);
  const op2 = useTransform(len2, [0, 0.05, 1], [0, 1, 1]);
  const opacities = [op0, op1, op2];

  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="cr-arrowhead-red"
          markerWidth="6"
          markerHeight="6"
          refX="4.5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L6,3 L0,6 z" fill="#ef4444" />
        </marker>
      </defs>

      {arrows.map((a, i) => (
        <motion.path
          key={i}
          d={a.d}
          stroke="#ef4444"
          strokeWidth={1.8}
          fill="none"
          strokeLinecap="round"
          markerEnd="url(#cr-arrowhead-red)"
          /* keep stroke visually unscaled despite preserveAspectRatio="none" */
          style={{
            vectorEffect: "non-scaling-stroke",
            pathLength: lengths[i],
            opacity: opacities[i],
          } as unknown as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

/* ── Fallback card (used by the no-WebGL section) ────────────────── */
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
      <div className="aspect-[10/7] overflow-hidden">
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
    <section id="product" className="py-10 sm:py-14 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase rounded-full mb-3">Product Range</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3">Industrial Sealant Solutions</h2>
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
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,#000 0,transparent 1px,transparent 4px)" }}
      />
      <div className="relative flex items-end gap-px shrink-0">
        {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1].map((w, i) => (
          <div
            key={i}
            className="bg-foreground/45 rounded-[1px]"
            style={{ width: `${w}px`, height: i % 3 === 0 ? "11px" : "7px" }}
          />
        ))}
      </div>
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

/* ── Static fallback for the centre cartridge (no WebGL) ─────────── */
function CentreCartridgeFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(0,150,199,0.20) 0%, rgba(0,150,199,0.07) 45%, transparent 75%)",
        }}
      />
      <div
        className="relative flex items-center justify-center w-[55%] aspect-[3/5] rounded-[18px] overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg,#03045E 0%,#0077B6 45%,#0096C7 100%)",
          boxShadow:
            "0 30px 60px -20px rgba(3,4,94,0.55), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <span className="text-white font-black tracking-[0.28em] text-sm sm:text-base lg:text-lg [writing-mode:vertical-rl] rotate-180 select-none">
          SEALANT
        </span>
      </div>
    </div>
  );
}

/* ── Reusable centre-stage 3D canvas (wrapped in its own boundary) ─ */
function CentreCartridge3D({ scrollProgressRef }: { scrollProgressRef: { current: number } }) {
  return (
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
      <CaulkCartridge scrollProgressRef={scrollProgressRef} />
      <Suspense fallback={null}>
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}

/* Smart wrapper: tries the WebGL cartridge, falls back to a static
   centrepiece if WebGL is unavailable or the renderer crashes. The
   boundary is scoped to JUST the 3D so the surrounding circular-flow
   layout (cards + arrows) is never replaced. */
function CentreCartridge({ scrollProgressRef }: { scrollProgressRef: { current: number } }) {
  const [webgl] = useState(isWebGLAvailable);
  if (!webgl) return <CentreCartridgeFallback />;
  return (
    <WebGLErrorBoundary fallback={<CentreCartridgeFallback />}>
      <CentreCartridge3D scrollProgressRef={scrollProgressRef} />
    </WebGLErrorBoundary>
  );
}

/* ── Halo / glow behind the 3D centre piece ──────────────────────── */
function CentreHalo() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[1]"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 50%, rgba(0,150,199,0.18) 0%, rgba(0,150,199,0.06) 45%, transparent 75%)",
        filter: "blur(2px)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Circular Flow Layout — desktop & mobile
   - Desktop (lg+): 3-col CSS grid with cards in TL / TR / BL / BR and
     the 3D cartridge centred. SVG overlay draws animated red arrows
     showing the clockwise flow TL → TR → BR → BL.
   - Mobile: 3D cartridge stacks above a 1-col / 2-col grid of cards.
   ───────────────────────────────────────────────────────────────────── */
function Product3DCircularFlow() {
  /* Scroll progress through the section — drives the red flow-arrow dashes
     so they visibly march along the path while scrolling. */
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* gentle idle motion for the cartridge so it never feels static */
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

  /* JS-driven breakpoint: ensures only ONE <Canvas> (= one WebGL
     context) is ever mounted at a time. Hiding the other branch
     purely via CSS would mount two Canvas instances and crash the
     second WebGL context. */
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

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative overflow-hidden px-4 sm:px-6"
    >
      {/* Background ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/40 to-muted -z-10" />
      <div
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#0096C7 0,transparent 1px,transparent 56px),repeating-linear-gradient(90deg,#0096C7 0,transparent 1px,transparent 56px)",
        }}
      />

      {/* ─────────────── Mobile / tablet (< lg) — vertical stack ─────────────── */}
      {!isDesktop && (
        <div className="py-10 sm:py-14">
          <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-bold tracking-widest uppercase rounded-full mb-4">
              Product Range
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3 leading-tight">
              Industrial Sealant Solutions
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            <div className="mx-auto w-full max-w-sm">
              <div className="h-[34vh] min-h-[220px] max-h-[320px]">
                <CentreCartridge scrollProgressRef={cartridgeRef} />
              </div>
              <div className="mt-3 flex justify-center">
                <ProductPlaque />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {STEPS.map((s, i) => (
                <ProductCard key={s.tag} step={s} index={i} position={CORNERS[i]} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────── Desktop (lg+) — sticky viewport-fit circular flow ───────────────
          Outer wrapper provides the scroll distance; the inner sticky panel
          stays pinned at h-screen while the user scrolls through, driving the
          arrow draw-on-scroll animation. */}
      {isDesktop && (
        <div className="relative h-[200vh]">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            {/* Section header (compact) */}
            <div className="text-center mb-4 xl:mb-5 max-w-3xl mx-auto">
              <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] xl:text-[11px] font-bold tracking-widest uppercase rounded-full mb-1.5">
                Product Range
              </span>
              <h2 className="text-2xl xl:text-3xl font-black text-foreground mb-1.5 leading-tight">
                Industrial Sealant Solutions
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto rounded-full" />
            </div>

            <div className="max-w-3xl xl:max-w-4xl w-full mx-auto relative">
              {/* Animated red flow arrows — overlaid across the whole grid */}
              <FlowArrows scrollProgress={scrollYProgress} />

              <div
                className="
                  relative
                  grid
                  grid-cols-[minmax(0,1fr)_170px_minmax(0,1fr)]
                  xl:grid-cols-[minmax(0,1fr)_190px_minmax(0,1fr)]
                  grid-rows-[auto_auto_auto]
                  gap-x-6 xl:gap-x-10
                  gap-y-3 xl:gap-y-4
                  items-start
                "
              >
                {/* Sequential reveal ranges (matched to the FlowArrows ranges):
                     TL  reveal 0.00–0.12
                     →   arrow 0.12–0.24
                     TR  reveal 0.24–0.36
                     →   arrow 0.36–0.48
                     BR  reveal 0.48–0.60
                     →   arrow 0.60–0.72
                     BL  reveal 0.72–0.84                                       */}

                {/* TL */}
                <div className="col-start-1 row-start-1">
                  <ProductCard
                    step={STEPS[0]}
                    index={0}
                    position="TL"
                    compact
                    scrollProgress={scrollYProgress}
                    revealRange={[0.0, 0.12]}
                  />
                </div>

                {/* TR */}
                <div className="col-start-3 row-start-1">
                  <ProductCard
                    step={STEPS[1]}
                    index={1}
                    position="TR"
                    compact
                    scrollProgress={scrollYProgress}
                    revealRange={[0.24, 0.36]}
                  />
                </div>

                {/* Centre 3D — spans the middle row, focal point */}
                <div className="col-start-2 row-start-1 row-span-3 self-center flex flex-col items-center justify-center relative">
                  <CentreHalo />
                  <div className="w-full h-[220px] xl:h-[250px]">
                    <CentreCartridge scrollProgressRef={cartridgeRef} />
                  </div>
                  <div className="mt-1.5">
                    <ProductPlaque />
                  </div>
                </div>

                {/* BL */}
                <div className="col-start-1 row-start-3">
                  <ProductCard
                    step={STEPS[3]}
                    index={3}
                    position="BL"
                    compact
                    scrollProgress={scrollYProgress}
                    revealRange={[0.72, 0.84]}
                  />
                </div>

                {/* BR */}
                <div className="col-start-3 row-start-3">
                  <ProductCard
                    step={STEPS[2]}
                    index={2}
                    position="BR"
                    compact
                    scrollProgress={scrollYProgress}
                    revealRange={[0.48, 0.60]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Export ───────────────────────────────────────────────────────── */
export default function Product3D() {
  return <Product3DCircularFlow />;
}

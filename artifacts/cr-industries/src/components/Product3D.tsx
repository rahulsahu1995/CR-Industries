import { useRef, useEffect, useState, Component, ErrorInfo, ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { Droplets, ShieldCheck, Wrench, Zap, Layers, Package } from "lucide-react";

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

/* ── Caulk cartridge model ────────────────────────────────────────── */
/* Model local-space bounds:
   bottom cap: y ≈ -1.65   nozzle tip: y ≈ 3.66
   center: y ≈ 1.0
   wrapped in <group scale={0.6} position={[0,-0.6,0]}> → world center ≈ 0 */
function CaulkCartridge({ scrollProgress }: { scrollProgress: number }) {
  const rootRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!rootRef.current) return;
    if (spinRef.current) spinRef.current.rotation.y += dt * 0.45;
    // Subtle tilt on scroll
    const tx = scrollProgress * Math.PI * 0.14;
    const tz = Math.sin(scrollProgress * Math.PI * 2) * 0.08;
    rootRef.current.rotation.x += (tx - rootRef.current.rotation.x) * 0.07;
    rootRef.current.rotation.z += (tz - rootRef.current.rotation.z) * 0.07;
  });

  const white = <meshPhysicalMaterial color="#efefed" metalness={0.04} roughness={0.3} transmission={0.12} thickness={0.3} />;
  const blue  = <meshStandardMaterial color="#0096C7" metalness={0.75} roughness={0.18} />;
  const dark  = <meshStandardMaterial color="#03045E" metalness={0.6}  roughness={0.25} />;

  return (
    /* scale 0.8 — larger model; position offsets center to y≈0 */
    <group ref={rootRef} scale={0.8} position={[0, -0.8, 0]}>
      <group ref={spinRef}>
        {/* body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.42, 0.42, 3.2, 52]} />
          {white}
        </mesh>
        {/* bottom cap */}
        <mesh castShadow position={[0, -1.62, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.07, 52]} />
          {dark}
        </mesh>
        {/* bottom ring */}
        <mesh position={[0, -1.51, 0]}>
          <torusGeometry args={[0.42, 0.026, 16, 64]} />
          {blue}
        </mesh>
        {/* shoulder reducer */}
        <mesh castShadow position={[0, 1.74, 0]}>
          <cylinderGeometry args={[0.18, 0.42, 0.62, 52]} />
          {white}
        </mesh>
        {/* nozzle collar */}
        <mesh castShadow position={[0, 2.14, 0]}>
          <cylinderGeometry args={[0.14, 0.18, 0.16, 32]} />
          {blue}
        </mesh>
        {/* tapered nozzle */}
        <mesh castShadow position={[0, 2.89, 0]}>
          <cylinderGeometry args={[0.022, 0.12, 1.34, 28]} />
          {white}
        </mesh>
        {/* tip */}
        <mesh castShadow position={[0, 3.6, 0]}>
          <coneGeometry args={[0.022, 0.11, 16]} />
          {white}
        </mesh>
        {/* label band */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.426, 0.426, 1.6, 52]} />
          <meshStandardMaterial color="#ffffff" roughness={0.75} metalness={0} transparent opacity={0.96} />
        </mesh>
        {/* label accent stripes */}
        {[0.82, -0.82].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <torusGeometry args={[0.43, 0.019, 12, 64]} />
            {blue}
          </mesh>
        ))}
        {/* center ring */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.43, 0.012, 12, 64]} />
          <meshStandardMaterial color="#0096C7" metalness={0.5} roughness={0.3} transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Step data (6 steps — CR Industries product range) ───────────── */
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
  {
    side: "right" as const,
    tag: "05",
    icon: Layers,
    title: "Gasket Seals",
    desc: "C R Industries manufactures cut and moulded gasket seals in NBR, EPDM, and compressed fibre. Designed for flange joints operating under high temperature and pressure in oil, gas, and water systems.",
    img: "/steps/step5.png",
    imgAlt: "Rubber gasket seal on steel pipe flange",
  },
  {
    side: "left" as const,
    tag: "06",
    icon: Package,
    title: "Silicone & Adhesive Compounds",
    desc: "Our cartridge-dispensed silicone and epoxy compounds create structural, weatherproof bonds on metal, glass, and concrete. Used across construction, HVAC, and heavy plant maintenance.",
    img: "/steps/step6.png",
    imgAlt: "Silicone sealant cartridge applying compound on metal joint",
  },
];

/* ── Side card ────────────────────────────────────────────────────── */
function StepCard({ step, visible }: { step: typeof STEPS[0]; visible: boolean }) {
  const Icon = step.icon;
  const fromX = step.side === "right" ? 24 : -24;
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : fromX }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-card/90 backdrop-blur-md border border-border/70 rounded-2xl overflow-hidden shadow-xl w-full"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={step.img}
          alt={step.imgAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
      </div>
      {/* Text */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg brand-gradient flex items-center justify-center shrink-0">
            <Icon className="w-3 h-3 text-white" />
          </div>
          <span className="text-[10px] font-black tracking-widest text-primary uppercase">Step {step.tag}</span>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-1 leading-snug">{step.title}</h3>
        <p className="text-muted-foreground text-[11px] leading-relaxed">{step.desc}</p>
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
          <span className="text-xs font-black tracking-widest text-primary uppercase">Step {step.tag}</span>
          <h3 className="text-base font-bold text-foreground mt-0.5 mb-1">{step.title}</h3>
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

/* ── 3D inner section ─────────────────────────────────────────────── */
function Product3DInner() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = Math.min(1, scrolled / total);
      setProgress(p);
      setStep(p < 0.02 ? -1 : p < 0.18 ? 0 : p < 0.34 ? 1 : p < 0.50 ? 2 : p < 0.66 ? 3 : p < 0.82 ? 4 : 5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* index of currently active left/right card */
  const activeLeft  = STEPS.filter((s, i) => s.side === "left"  && step >= i);
  const activeRight = STEPS.filter((s, i) => s.side === "right" && step >= i);
  const curLeft  = activeLeft[activeLeft.length - 1]   ?? null;
  const curRight = activeRight[activeRight.length - 1] ?? null;

  return (
    <section id="product" ref={wrapRef} className="relative h-[650vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/40 to-muted" />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#0096C7 0,transparent 1px,transparent 56px),repeating-linear-gradient(90deg,#0096C7 0,transparent 1px,transparent 56px)" }} />

        {/* ── Main layout: three columns ── */}
        <div className="relative h-full flex flex-col">
          {/* Top header */}
          <div className="flex-none pt-6 pb-2 text-center z-10">
            <span className="text-primary text-[11px] font-black tracking-[0.2em] uppercase">Interactive Experience</span>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mt-0.5">3D Product Showcase</h2>
            <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}
              className="text-muted-foreground text-xs mt-0.5">↓ Scroll to explore</motion.p>
          </div>

          {/* Three columns: left card | canvas | right card */}
          <div className="flex-1 flex items-center gap-4 px-4 md:px-8 lg:px-12 min-h-0 pb-10">
            {/* Left column */}
            <div className="hidden md:flex w-[220px] lg:w-[240px] xl:w-[260px] shrink-0 flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {curLeft && (
                  <motion.div key={curLeft.tag} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }} className="w-full">
                    <StepCard step={curLeft} visible />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Center: 3D canvas — fills remaining space */}
            <div className="flex-1 min-w-0 h-full flex items-center justify-center">
              <div className="w-full h-full max-w-[420px] max-h-[580px]">
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 50 }}
                  shadows={{ type: THREE.PCFShadowMap }}
                  gl={{ antialias: true }}
                >
                  <ambientLight intensity={0.65} />
                  <directionalLight position={[4, 5, 4]} intensity={1.7} castShadow shadow-mapSize={[1024, 1024]} />
                  <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#0096C7" />
                  <pointLight position={[0, -3, 3]} intensity={0.3} color="#48CAE4" />
                  <CaulkCartridge scrollProgress={progress} />
                  <Environment preset="studio" />
                </Canvas>
              </div>
            </div>

            {/* Right column */}
            <div className="hidden md:flex w-[220px] lg:w-[240px] xl:w-[260px] shrink-0 flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {curRight && (
                  <motion.div key={curRight.tag} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }} className="w-full">
                    <StepCard step={curRight} visible />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile card — below canvas */}
          <div className="md:hidden px-4 pb-4">
            <AnimatePresence mode="wait">
              {step >= 0 && (
                <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                  <StepCard step={STEPS[step]} visible />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Export ───────────────────────────────────────────────────────── */
export default function Product3D() {
  const [webgl] = useState(isWebGLAvailable);
  if (!webgl) return <FallbackSection />;
  return (
    <WebGLErrorBoundary fallback={<FallbackSection />}>
      <Product3DInner />
    </WebGLErrorBoundary>
  );
}

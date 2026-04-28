import { useRef, useEffect, useState, Component, ErrorInfo, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { Box, Layers, Zap, ShieldCheck } from "lucide-react";

/* ── WebGL Error Boundary ─────────────────────────────────────────── */
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.warn("3D WebGL not available:", error.message);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ── Caulk Cartridge 3D Model ────────────────────────────────────── */
function CaulkCartridge({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Slow continuous Y rotation
    if (bodyRef.current) bodyRef.current.rotation.y += delta * 0.5;
    // Scroll-driven tilt
    const targetX = scrollProgress * Math.PI * 0.18;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.06;
    // Subtle scroll-driven Z sway
    const targetZ = Math.sin(scrollProgress * Math.PI * 2) * 0.12;
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.06;
  });

  const bodyMat = (
    <meshPhysicalMaterial
      color="#f0f0ee"
      metalness={0.05}
      roughness={0.35}
      transmission={0.15}
      thickness={0.3}
    />
  );

  const accentMat = (
    <meshStandardMaterial color="#0096C7" metalness={0.7} roughness={0.2} />
  );

  const darkMat = (
    <meshStandardMaterial color="#03045E" metalness={0.6} roughness={0.25} />
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={bodyRef as React.RefObject<THREE.Group>}>
        {/* ── Main cylindrical body ── */}
        <mesh castShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 3.2, 48]} />
          {bodyMat}
        </mesh>

        {/* ── Bottom cap (flat disc) ── */}
        <mesh castShadow position={[0, -1.62, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.06, 48]} />
          {darkMat}
        </mesh>

        {/* ── Bottom piston ring ── */}
        <mesh position={[0, -1.52, 0]}>
          <torusGeometry args={[0.42, 0.025, 16, 64]} />
          {accentMat}
        </mesh>

        {/* ── Shoulder reducer (frustum transitioning to nozzle base) ── */}
        <mesh castShadow position={[0, 1.75, 0]}>
          <cylinderGeometry args={[0.18, 0.42, 0.6, 48]} />
          {bodyMat}
        </mesh>

        {/* ── Nozzle collar ── */}
        <mesh castShadow position={[0, 2.14, 0]}>
          <cylinderGeometry args={[0.14, 0.18, 0.15, 32]} />
          {accentMat}
        </mesh>

        {/* ── Long tapered nozzle ── */}
        <mesh castShadow position={[0, 2.9, 0]}>
          <cylinderGeometry args={[0.02, 0.12, 1.35, 24]} />
          {bodyMat}
        </mesh>

        {/* ── Nozzle tip ── */}
        <mesh castShadow position={[0, 3.61, 0]}>
          <coneGeometry args={[0.02, 0.1, 16]} />
          {bodyMat}
        </mesh>

        {/* ── Label band (center) ── */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.425, 0.425, 1.6, 48]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.0} transparent opacity={0.95} />
        </mesh>

        {/* ── Top label accent stripe ── */}
        <mesh position={[0, 0.82, 0]}>
          <torusGeometry args={[0.43, 0.018, 12, 64]} />
          {accentMat}
        </mesh>

        {/* ── Bottom label accent stripe ── */}
        <mesh position={[0, -0.82, 0]}>
          <torusGeometry args={[0.43, 0.018, 12, 64]} />
          {accentMat}
        </mesh>

        {/* ── Decorative mid ring ── */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.43, 0.012, 12, 64]} />
          <meshStandardMaterial color="#0096C7" metalness={0.5} roughness={0.3} transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Scroll step content ─────────────────────────────────────────── */
const SCROLL_STEPS = [
  {
    side: "right",
    vertPos: "top-[14%]",
    title: "Precision Thread Sealant",
    desc: "Industrial-grade PTFE compound for threaded joints. Seals metal and plastic pipes under extreme pressure.",
    tag: "01",
    icon: ShieldCheck,
  },
  {
    side: "left",
    vertPos: "top-[38%]",
    title: "High-Temperature Adhesive",
    desc: "Withstands up to 300°C. Perfect for exhaust systems, furnaces, and industrial machinery bonds.",
    tag: "02",
    icon: Zap,
  },
  {
    side: "right",
    vertPos: "top-[62%]",
    title: "Flexible Pipe Jointing",
    desc: "Anaerobic sealant — remains flexible after cure, ideal for vibration-prone pipeline connections.",
    tag: "03",
    icon: Layers,
  },
  {
    side: "left",
    vertPos: "top-[82%]",
    title: "Fast-Cure Compound",
    desc: "Sets in 60 seconds for rapid maintenance. Full strength in 24 hours across most substrate types.",
    tag: "04",
    icon: Box,
  },
];

function InfoCard({
  step,
  visible,
}: {
  step: (typeof SCROLL_STEPS)[0];
  visible: boolean;
}) {
  const isRight = step.side === "right";
  const Icon = step.icon;
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : isRight ? 30 : -30,
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`absolute ${step.vertPos} ${
        isRight ? "right-4 md:right-12 lg:right-16" : "left-4 md:left-12 lg:left-16"
      } z-20 w-[200px] md:w-[220px]`}
    >
      <div className="bg-card/85 backdrop-blur-lg border border-border/80 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg brand-gradient flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[10px] font-black tracking-widest text-primary uppercase">
            Step {step.tag}
          </span>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-1 leading-snug">{step.title}</h3>
        <p className="text-muted-foreground text-[11px] leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

/* ── Fallback (no WebGL) ─────────────────────────────────────────── */
function FallbackProductSection() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true });
  return (
    <section id="product" className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase rounded-full mb-4">
            Product Range
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Industrial Sealant Solutions
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCROLL_STEPS.map((step, i) => {
            const Icon = step.icon;
            const ref = useRef(null);
            const cardInView = useInView(ref, { once: true, margin: "-50px" });
            return (
              <motion.div
                ref={ref}
                key={step.tag}
                initial={{ opacity: 0, y: 40 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-widest text-primary uppercase">Step {step.tag}</span>
                    <h3 className="text-lg font-bold text-foreground mt-0.5 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── WebGL feature detection ─────────────────────────────────────── */
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* ── Main 3D Section ─────────────────────────────────────────────── */
function Product3DInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleStep, setVisibleStep] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / totalScrollable);
      setScrollProgress(progress);
      setVisibleStep(
        progress < 0.02 ? -1
        : progress < 0.28 ? 0
        : progress < 0.52 ? 1
        : progress < 0.76 ? 2
        : 3
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="product" ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-muted" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #0096C7 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #0096C7 0px, transparent 1px, transparent 60px)",
          }}
        />

        {/* Section header — centered at top */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute top-6 inset-x-0 flex flex-col items-center z-10 pointer-events-none"
        >
          <span className="text-primary text-[11px] font-black tracking-[0.2em] uppercase">
            Interactive Experience
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mt-1 text-center">
            3D Product Showcase
          </h2>
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-muted-foreground text-xs mt-1"
          >
            ↓ Scroll to explore
          </motion.p>
        </motion.div>

        {/* 3D Canvas — perfectly centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[320px] h-[520px] md:w-[380px] md:h-[600px] lg:w-[420px] lg:h-[640px]">
            <Canvas
              camera={{ position: [0, 0.4, 6], fov: 42 }}
              shadows
              gl={{ antialias: true }}
              onCreated={({ gl }) => {
                gl.shadowMap.enabled = true;
              }}
            >
              <ambientLight intensity={0.7} />
              <directionalLight
                position={[4, 6, 4]}
                intensity={1.8}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#0096C7" />
              <pointLight position={[0, -4, 3]} intensity={0.3} color="#48CAE4" />
              <CaulkCartridge scrollProgress={scrollProgress} />
              <Environment preset="studio" />
            </Canvas>
          </div>
        </div>

        {/* Info cards — left/right of center */}
        {SCROLL_STEPS.map((step, i) => (
          <InfoCard key={i} step={step} visible={visibleStep >= i} />
        ))}

        {/* Progress bar at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {SCROLL_STEPS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-400 ${
                visibleStep >= i
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Product3D() {
  const [webglOk] = useState(() => isWebGLAvailable());
  if (!webglOk) return <FallbackProductSection />;
  return (
    <WebGLErrorBoundary fallback={<FallbackProductSection />}>
      <Product3DInner />
    </WebGLErrorBoundary>
  );
}

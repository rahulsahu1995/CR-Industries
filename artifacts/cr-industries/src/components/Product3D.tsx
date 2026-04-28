import { useRef, useEffect, useState, Component, ErrorInfo, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { Box, RotateCw, Layers } from "lucide-react";

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("3D WebGL Error caught:", error.message);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function SealantModel({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    meshRef.current.rotation.y += delta * 0.4;
    const targetRotX = scrollProgress * Math.PI * 0.8;
    const targetPosX = Math.sin(scrollProgress * Math.PI * 1.5) * 1.5;
    const targetPosY = Math.cos(scrollProgress * Math.PI * 0.8) * 0.5;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.1;
    groupRef.current.position.x += (targetPosX - groupRef.current.position.x) * 0.1;
    groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 2.5, 32]} />
        <meshStandardMaterial color="#0096C7" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.45, 0]} castShadow>
        <coneGeometry args={[0.2, 0.6, 32]} />
        <meshStandardMaterial color="#03045E" metalness={0.7} roughness={0.15} />
      </mesh>
      <mesh position={[0, -1.35, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.12, 32]} />
        <meshStandardMaterial color="#023E8A" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.41, 1.2, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.6} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <torusGeometry args={[0.38, 0.04, 16, 100]} />
        <meshStandardMaterial color="#0096C7" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.65, 0]}>
        <torusGeometry args={[0.38, 0.04, 16, 100]} />
        <meshStandardMaterial color="#0096C7" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

const SCROLL_STEPS = [
  {
    position: "top-20 right-6 md:top-16 md:right-12",
    title: "Precision Thread Sealant",
    desc: "Industrial-grade PTFE compound for threaded joints. Seals metal and plastic pipes under extreme pressure.",
    tag: "Step 01",
  },
  {
    position: "top-1/3 left-6 md:top-1/3 md:left-12",
    title: "High-Temperature Adhesive",
    desc: "Withstands up to 300°C. Perfect for exhaust systems, furnaces, and industrial machinery bonds.",
    tag: "Step 02",
  },
  {
    position: "bottom-1/3 right-6 md:bottom-1/3 md:right-12",
    title: "Flexible Pipe Jointing",
    desc: "Anaerobic sealant that remains flexible after cure — ideal for vibration-prone pipeline connections.",
    tag: "Step 03",
  },
  {
    position: "bottom-20 left-6 md:bottom-16 md:left-12",
    title: "Fast-Cure Compound",
    desc: "Sets in 60 seconds for rapid maintenance. Full strength in 24 hours across most substrate types.",
    tag: "Step 04",
  },
];

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
            Product Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Our Product Range
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCROLL_STEPS.map((step, i) => {
            const icons = [Box, RotateCw, Layers, Box];
            const Icon = icons[i];
            const ref = useRef(null);
            const cardInView = useInView(ref, { once: true, margin: "-50px" });
            return (
              <motion.div
                ref={ref}
                key={step.tag}
                initial={{ opacity: 0, y: 40 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-widest text-primary uppercase">{step.tag}</span>
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

function AnimatedCard({
  step,
  visible,
}: {
  step: (typeof SCROLL_STEPS)[0];
  visible: boolean;
}) {
  const isRight = step.position.includes("right");
  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : isRight ? 40 : -40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`absolute ${step.position} z-20 max-w-[240px]`}
    >
      <div className="bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl">
        <span className="text-[10px] font-black tracking-widest text-primary uppercase">{step.tag}</span>
        <h3 className="text-sm font-bold text-foreground mt-0.5 mb-1">{step.title}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
        <div className="mt-2 h-0.5 w-12 bg-primary rounded-full" />
      </div>
    </motion.div>
  );
}

function Product3DInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleStep, setVisibleStep] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (containerHeight - window.innerHeight)));
      setScrollProgress(progress);
      if (progress > 0.02) setVisibleStep(0);
      if (progress > 0.25) setVisibleStep(1);
      if (progress > 0.5) setVisibleStep(2);
      if (progress > 0.75) setVisibleStep(3);
      if (progress < 0.02) setVisibleStep(-1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="product" ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-background to-muted">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: scrollProgress > 0 ? 1 : 0, y: scrollProgress > 0 ? 0 : -20 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10 w-full px-4"
        >
          <span className="text-primary text-sm font-bold tracking-widest uppercase">Interactive Experience</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1">3D Product Showcase</h2>
          <p className="text-muted-foreground text-sm mt-1">Scroll to explore</p>
        </motion.div>

        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows gl={{ antialias: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
            <pointLight position={[-5, -5, 5]} intensity={0.5} color="#0096C7" />
            <SealantModel scrollProgress={scrollProgress} />
            <Environment preset="city" />
          </Canvas>
        </div>

        {SCROLL_STEPS.map((step, i) => (
          <AnimatedCard key={i} step={step} visible={visibleStep >= i} />
        ))}
      </div>
    </section>
  );
}

export default function Product3D() {
  return (
    <WebGLErrorBoundary fallback={<FallbackProductSection />}>
      <Product3DInner />
    </WebGLErrorBoundary>
  );
}

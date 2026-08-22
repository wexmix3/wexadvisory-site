"use client";

import { useMemo, useRef, useState, useEffect, type CSSProperties } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const GOLD = new THREE.Color("#E8C876");
const GOLD_DIM = new THREE.Color("#7a6529");
const PARTICLE_COUNT = 3200;
const SPHERE_RADIUS = 2.0;

// --- Rim-lit glow sphere: gives the silhouette its "orb" shape ---
const rimVertexShader = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vViewPos;

  void main() {
    vNormalView = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const rimFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uOpacity;
  varying vec3 vNormalView;
  varying vec3 vViewPos;

  void main() {
    vec3 viewDir = normalize(-vViewPos);
    float fresnel = pow(1.0 - clamp(dot(vNormalView, viewDir), 0.0, 1.0), uPower);
    gl_FragColor = vec4(uColor, fresnel * uOpacity);
  }
`;

function GlowSphere({ radius, power, opacity }: { radius: number; power: number; opacity: number }) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: GOLD },
      uPower: { value: power },
      uOpacity: { value: opacity },
    }),
    [power, opacity]
  );

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={rimVertexShader}
        fragmentShader={rimFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// --- Particle dust scattered across the sphere surface ---
const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aTwinkle;
  uniform float uTime;
  varying float vTwinkle;
  varying float vRim;

  void main() {
    vTwinkle = 0.5 + 0.5 * sin(uTime * aTwinkle + position.x * 3.0);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewNormal = normalize(normalMatrix * normalize(position));
    vec3 viewDir = normalize(-mvPosition.xyz);
    vRim = pow(1.0 - clamp(dot(viewNormal, viewDir), 0.0, 1.0), 1.6);

    gl_PointSize = aSize * (10.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;
  varying float vTwinkle;
  varying float vRim;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.05, d);
    vec3 color = mix(uColorEdge, uColorCore, vTwinkle);
    float rimBoost = mix(0.45, 1.0, vRim);
    gl_FragColor = vec4(color, alpha * vTwinkle * rimBoost);
  }
`;

function GlobePoints() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, sizes, twinkles } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const twinkles = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Fibonacci sphere distribution for even coverage
      const t = i / PARTICLE_COUNT;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;
      const jitter = 1 + (Math.random() - 0.5) * 0.04;

      const x = Math.sin(inclination) * Math.cos(azimuth) * SPHERE_RADIUS * jitter;
      const y = Math.sin(inclination) * Math.sin(azimuth) * SPHERE_RADIUS * jitter;
      const z = Math.cos(inclination) * SPHERE_RADIUS * jitter;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      sizes[i] = Math.random() * 1.6 + 0.7;
      twinkles[i] = Math.random() * 1.5 + 0.3;
    }

    return { positions, sizes, twinkles };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorCore: { value: GOLD },
      uColorEdge: { value: GOLD_DIM },
    }),
    []
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.045;
      const targetX = state.pointer.y * 0.08;
      const targetY = state.pointer.x * 0.12;
      pointsRef.current.rotation.x += (targetX - pointsRef.current.rotation.x) * 0.02;
      pointsRef.current.rotation.z += (targetY * 0.3 - pointsRef.current.rotation.z) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aTwinkle" args={[twinkles, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <GlowSphere radius={SPHERE_RADIUS} power={2.0} opacity={1.1} />
      <GlowSphere radius={SPHERE_RADIUS * 1.06} power={3.0} opacity={0.5} />
      <GlobePoints />
    </group>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const GROUP_POSITION: [number, number, number] = [1.6, 0.3, 0];
const MASK_CENTER = "62% 42%";
const MASK_RADIUS = 640;
const BLOOM_INTENSITY = 0.9;

export default function ParticleGlobe() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    // Static radial-glow fallback — no animation, same color language
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 420px at ${MASK_CENTER}, rgba(232,200,118,0.28) 0%, rgba(200,168,75,0.10) 45%, transparent 75%)`,
        }}
      />
    );
  }

  const wrapStyle: CSSProperties = {
    maskImage: `radial-gradient(circle ${MASK_RADIUS}px at ${MASK_CENTER}, black 0%, black 60%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(circle ${MASK_RADIUS}px at ${MASK_CENTER}, black 0%, black 60%, transparent 100%)`,
  };

  return (
    <div className="absolute inset-0 pointer-events-none" style={wrapStyle}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <group position={GROUP_POSITION}>
          <Scene />
        </group>
        <EffectComposer>
          <Bloom
            intensity={BLOOM_INTENSITY}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

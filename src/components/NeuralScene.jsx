import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial, Preload, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeuralCore() {
  const groupRef = useRef(null);
  const ringRef = useRef(null);

  const points = useMemo(() => {
    const temp = [];
    for (let index = 0; index < 1500; index += 1) {
      const radius = 1.4 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      temp.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
    }
    return new Float32Array(temp);
  }, []);

  const lines = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let index = 0; index < 48; index += 1) {
      const a = new THREE.Vector3().setFromSphericalCoords(
        1.2 + Math.random() * 1.4,
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2,
      );
      const b = new THREE.Vector3().setFromSphericalCoords(
        1.2 + Math.random() * 1.4,
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2,
      );
      vertices.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.24;
    }
  });

  return (
    <group ref={groupRef}>
      <Sparkles count={90} scale={[5, 5, 5]} size={3} speed={0.45} color="#67e8f9" />

      <mesh>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#1d4ed8"
          emissiveIntensity={1.2}
          transparent
          opacity={0.18}
          wireframe
        />
      </mesh>

      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[1.9, 0.03, 16, 100]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.8} />
        </mesh>
        <mesh rotation={[Math.PI / 3.5, -0.8, 0.6]}>
          <torusGeometry args={[2.2, 0.018, 16, 100]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} />
        </mesh>
      </group>

      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.42} />
      </lineSegments>

      <Points positions={points} stride={3} frustumCulled>
        <PointMaterial transparent color="#a5f3fc" size={0.04} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

function NeuralScene() {
  return (
    <div className="relative h-[22rem] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(180deg,_rgba(15,23,42,0.7),_rgba(2,6,23,0.95))] shadow-[inset_0_0_30px_rgba(34,211,238,0.1)] md:h-[33rem]">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 50 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[2, 2, 4]} intensity={2.4} color="#67e8f9" />
        <directionalLight position={[-2, -1, -3]} intensity={1.5} color="#a855f7" />
        <NeuralCore />
        <OrbitControls autoRotate autoRotateSpeed={0.65} enableZoom={false} enablePan={false} />
        <Preload all />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_45%,_rgba(3,7,17,0.65)_100%)]" />
    </div>
  );
}

export default NeuralScene;

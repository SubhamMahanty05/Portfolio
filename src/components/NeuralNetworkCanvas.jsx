import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial, Text } from "@react-three/drei";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const NODE_COUNT = 96;
const CONNECTION_DISTANCE = 0.98;
const FLOW_POINT_COUNT = 12;
const MAX_FRAME_RATE = 30;

function buildNodeCloud() {
  return Array.from({ length: NODE_COUNT }, (_, index) => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 1.2 + Math.random() * 1.45;

    return {
      id: index,
      base: new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) * 0.82,
        radius * Math.sin(phi) * Math.sin(theta),
      ),
      pulse: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.55,
      amplitude: 0.045 + Math.random() * 0.06,
    };
  });
}

function createBrainTargets() {
  return Array.from({ length: NODE_COUNT }, (_, index) => {
    const t = index / NODE_COUNT;
    const side = index % 2 === 0 ? -1 : 1;
    const lobeTheta = t * Math.PI * 4;
    const x = side * (0.45 + Math.sin(lobeTheta) * 0.72);
    const y = Math.cos(t * Math.PI * 2) * 1.28 + Math.sin(lobeTheta * 0.5) * 0.22;
    const z = Math.sin(lobeTheta) * 0.88 + Math.cos(t * Math.PI * 3) * 0.22;
    return new THREE.Vector3(x, y, z);
  });
}

function createGraphTargets() {
  return Array.from({ length: NODE_COUNT }, (_, index) => {
    const row = Math.floor(index / 18);
    const col = index % 18;
    return new THREE.Vector3(
      (col - 8.5) * 0.2,
      Math.sin(col * 0.42) * 0.7 + (row - 4.5) * 0.15,
      Math.cos((row + col) * 0.35) * 0.55,
    );
  });
}

function NeuralField({ pointer, scrollProgress, clickPulse }) {
  const groupRef = useRef(null);
  const pointsRef = useRef(null);
  const linesRef = useRef(null);
  const flowRef = useRef(null);
  const haloRef = useRef(null);
  const frameAccumulator = useRef(0);
  const nodes = useMemo(() => buildNodeCloud(), []);
  const brainTargets = useMemo(() => createBrainTargets(), []);
  const graphTargets = useMemo(() => createGraphTargets(), []);
  const dynamicPositions = useRef(nodes.map((node) => node.base.clone()));
  const pointArray = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const haloArray = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const connectionPairs = useMemo(() => {
    const pairs = [];
    for (let index = 0; index < nodes.length; index += 1) {
      for (let inner = index + 1; inner < Math.min(nodes.length, index + 5); inner += 1) {
        if (nodes[index].base.distanceToSquared(nodes[inner].base) < (CONNECTION_DISTANCE * 1.12) ** 2) {
          pairs.push([index, inner]);
        }
      }
    }
    return pairs;
  }, [nodes]);
  const lineArray = useMemo(() => new Float32Array(connectionPairs.length * 6), [connectionPairs]);
  const flowArray = useMemo(() => new Float32Array(FLOW_POINT_COUNT * 3), []);
  const pointerTarget = useRef(new THREE.Vector3());
  const smoothedPointer = useRef(new THREE.Vector3());
  const tempVector = useRef(new THREE.Vector3());
  const repelVector = useRef(new THREE.Vector3());
  const flowPairs = useMemo(
    () =>
      Array.from({ length: FLOW_POINT_COUNT }, (_, index) => ({
        pairIndex: index % Math.max(1, connectionPairs.length),
        offset: Math.random(),
        speed: 0.18 + Math.random() * 0.28,
      })),
    [connectionPairs],
  );

  useEffect(() => {
    dynamicPositions.current.forEach((position, index) => {
      position.copy(nodes[index].base);
      pointArray[index * 3] = position.x;
      pointArray[index * 3 + 1] = position.y;
      pointArray[index * 3 + 2] = position.z;
      haloArray[index * 3] = position.x * 1.04;
      haloArray[index * 3 + 1] = position.y * 1.04;
      haloArray[index * 3 + 2] = position.z * 1.04;
    });

    connectionPairs.forEach(([fromIndex, toIndex], pairIndex) => {
      const from = dynamicPositions.current[fromIndex];
      const to = dynamicPositions.current[toIndex];
      const baseIndex = pairIndex * 6;
      lineArray[baseIndex] = from.x;
      lineArray[baseIndex + 1] = from.y;
      lineArray[baseIndex + 2] = from.z;
      lineArray[baseIndex + 3] = to.x;
      lineArray[baseIndex + 4] = to.y;
      lineArray[baseIndex + 5] = to.z;
    });

    flowPairs.forEach((flow, index) => {
      const [fromIndex, toIndex] = connectionPairs[flow.pairIndex] ?? [0, 0];
      const from = dynamicPositions.current[fromIndex];
      const to = dynamicPositions.current[toIndex];
      flowArray[index * 3] = THREE.MathUtils.lerp(from.x, to.x, flow.offset);
      flowArray[index * 3 + 1] = THREE.MathUtils.lerp(from.y, to.y, flow.offset);
      flowArray[index * 3 + 2] = THREE.MathUtils.lerp(from.z, to.z, flow.offset);
    });
  }, [connectionPairs, flowArray, flowPairs, haloArray, lineArray, nodes, pointArray]);

  useEffect(() => {
    const attributes = [
      pointsRef.current?.geometry?.attributes?.position,
      haloRef.current?.geometry?.attributes?.position,
      linesRef.current?.geometry?.attributes?.position,
      flowRef.current?.geometry?.attributes?.position,
    ];

    attributes.forEach((attribute) => {
      if (attribute) {
        attribute.setUsage(THREE.DynamicDrawUsage);
        attribute.needsUpdate = true;
      }
    });
  }, []);

  useFrame((state, delta) => {
    frameAccumulator.current += delta;
    if (frameAccumulator.current < 1 / MAX_FRAME_RATE) {
      return;
    }

    const step = frameAccumulator.current;
    frameAccumulator.current = 0;
    const elapsed = state.clock.elapsedTime;
    const pointerInfluence = 0.16 + clickPulse * 0.2;
    pointerTarget.current.set(pointer.x * 1.2, pointer.y * 0.85, 0.32);
    smoothedPointer.current.lerp(pointerTarget.current, 0.08);
    const cycle = (Math.sin(elapsed * 0.2) + 1) / 2;
    const formationMix = THREE.MathUtils.smoothstep(cycle, 0, 1);
    const formationStrength = 0.18 + Math.sin(elapsed * 0.32) * 0.1 + clickPulse * 0.05;
    const activeScroll = scrollProgress * 0.22;

    nodes.forEach((node, index) => {
      const offset = dynamicPositions.current[index];
      const pulse = Math.sin(elapsed * node.speed + node.pulse) * node.amplitude;
      const swirl = Math.cos(elapsed * node.speed * 0.75 + node.pulse) * node.amplitude * 0.65;
      offset.copy(node.base);
      tempVector.current.copy(brainTargets[index]).lerp(graphTargets[index], formationMix);
      offset.lerp(tempVector.current, Math.max(0, formationStrength));
      offset.x += swirl + smoothedPointer.current.x * 0.06;
      offset.y += pulse - smoothedPointer.current.y * 0.05;
      offset.z += Math.sin(elapsed * node.speed * 0.58 + node.pulse) * node.amplitude;

      const distanceToPointerSquared = offset.distanceToSquared(smoothedPointer.current);
      if (distanceToPointerSquared < 0.92 ** 2) {
        const distanceToPointer = Math.sqrt(distanceToPointerSquared);
        repelVector.current
          .copy(offset)
          .sub(smoothedPointer.current)
          .normalize()
          .multiplyScalar((0.92 - distanceToPointer) * pointerInfluence);
        offset.add(repelVector.current);
      }

      pointArray[index * 3] = offset.x;
      pointArray[index * 3 + 1] = offset.y;
      pointArray[index * 3 + 2] = offset.z;
      haloArray[index * 3] = offset.x * 1.04;
      haloArray[index * 3 + 1] = offset.y * 1.04;
      haloArray[index * 3 + 2] = offset.z * 1.04;
    });

    connectionPairs.forEach(([fromIndex, toIndex], pairIndex) => {
      const a = dynamicPositions.current[fromIndex];
      const b = dynamicPositions.current[toIndex];
      const distance = a.distanceToSquared(b);
      const baseIndex = pairIndex * 6;

      if (distance < CONNECTION_DISTANCE ** 2) {
        lineArray[baseIndex] = a.x;
        lineArray[baseIndex + 1] = a.y;
        lineArray[baseIndex + 2] = a.z;
        lineArray[baseIndex + 3] = b.x;
        lineArray[baseIndex + 4] = b.y;
        lineArray[baseIndex + 5] = b.z;
      } else {
        lineArray[baseIndex] = a.x;
        lineArray[baseIndex + 1] = a.y;
        lineArray[baseIndex + 2] = a.z;
        lineArray[baseIndex + 3] = a.x;
        lineArray[baseIndex + 4] = a.y;
        lineArray[baseIndex + 5] = a.z;
      }
    });

    if (connectionPairs.length) {
      flowPairs.forEach((flow, index) => {
        const [fromIndex, toIndex] = connectionPairs[flow.pairIndex];
        const from = dynamicPositions.current[fromIndex];
        const to = dynamicPositions.current[toIndex];
        const t = (elapsed * flow.speed + flow.offset + activeScroll) % 1;

        flowArray[index * 3] = THREE.MathUtils.lerp(from.x, to.x, t);
        flowArray[index * 3 + 1] = THREE.MathUtils.lerp(from.y, to.y, t);
        flowArray[index * 3 + 2] = THREE.MathUtils.lerp(from.z, to.z, t);
      });
    }

    if (pointsRef.current?.geometry?.attributes?.position) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (haloRef.current?.geometry?.attributes?.position) {
      haloRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (linesRef.current?.geometry?.attributes?.position) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (flowRef.current?.geometry?.attributes?.position) {
      flowRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.1 + smoothedPointer.current.x * 0.12 + scrollProgress * 0.24;
      groupRef.current.rotation.x = smoothedPointer.current.y * 0.08 + scrollProgress * 0.05;
      groupRef.current.position.z = scrollProgress * 0.24;
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, -pointer.y * 0.08, 3.5, step);
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={haloRef} positions={haloArray} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#67e8f9"
          size={0.12}
          sizeAttenuation
          depthWrite={false}
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineArray, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.28} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <Points ref={pointsRef} positions={pointArray} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#c4fbff"
          size={0.055}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <Points ref={flowRef} positions={flowArray} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.085}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <mesh rotation={[0.4, 0.2, 0]} scale={1.2 + clickPulse * 0.06}>
        <torusGeometry args={[2.2, 0.012, 10, 56]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.35} transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[1.15, -0.35, 0.4]} scale={1.42 + clickPulse * 0.1}>
        <torusGeometry args={[1.7, 0.01, 10, 56]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.15} transparent opacity={0.42} />
      </mesh>

      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
        <Text
          position={[0, 2.2, 0.45]}
          fontSize={0.24}
          color="#dffcff"
          anchorX="center"
          anchorY="middle"
          outlineColor="#22d3ee"
          outlineWidth={0.015}
        >
          Neural Intelligence Layer
        </Text>
      </Float>
    </group>
  );
}

function DemandLoop({ active }) {
  const { invalidate } = useThree();

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    let frameId = 0;
    let lastFrameTime = 0;
    const frameBudget = 1000 / MAX_FRAME_RATE;

    const tick = (now) => {
      if (document.visibilityState === "visible" && now - lastFrameTime >= frameBudget) {
        lastFrameTime = now;
        invalidate();
      }
      frameId = window.requestAnimationFrame(tick);
    };

    invalidate();
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [active, invalidate]);

  return null;
}

function NeuralNetworkCanvas({ pointer, scrollProgress, clickPulse, reduced = false, className = "" }) {
  const [contextLost, setContextLost] = useState(false);
  const containerRef = useRef(null);
  const isGlobal = className.includes("global-bg");

  const containerClass = isGlobal
    ? `${className} relative h-screen w-full overflow-hidden`
    : `relative h-[25rem] overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_30%),linear-gradient(180deg,rgba(10,17,34,0.9),rgba(3,7,17,0.98))] shadow-[inset_0_0_42px_rgba(34,211,238,0.08),0_0_36px_rgba(34,211,238,0.08)] md:h-[36rem] ${className}`;

  const handleContextLost = useCallback(() => {
    console.warn("WebGL context lost");
    setContextLost(true);
  }, []);

  const handleContextRestored = useCallback(() => {
    setContextLost(false);
  }, []);

  useEffect(() => {
    const canvas = containerRef.current?.querySelector("canvas");
    if (!canvas) {
      return undefined;
    }

    const onLost = (event) => {
      event.preventDefault();
      handleContextLost();
    };
    const onRestored = () => {
      handleContextRestored();
    };

    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, [handleContextLost, handleContextRestored]);

  if (reduced) {
    const reducedClassName = isGlobal
      ? "relative h-screen w-full overflow-hidden"
      : "relative h-[24rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_75%_35%,rgba(168,85,247,0.2),transparent_26%),linear-gradient(180deg,rgba(10,17,34,0.92),rgba(3,7,17,0.98))]";

    return (
      <div className={`${reducedClassName} ${className}`}>
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={`stream-${index}`}
              className="absolute h-px w-40 bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent opacity-70"
              style={{
                top: `${12 + index * 10}%`,
                left: `${-10 + index * 8}%`,
                transform: `rotate(${-14 + index * 4}deg)`,
                animation: `data-stream ${6 + index * 0.8}s linear infinite`,
                animationDelay: `${index * 0.35}s`,
              }}
            />
          ))}
        </div>
        {Array.from({ length: 24 }, (_, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-cyan-300/55 shadow-[0_0_18px_rgba(34,211,238,0.5)]"
            style={{
              width: `${6 + (index % 3) * 4}px`,
              height: `${6 + (index % 3) * 4}px`,
              left: `${(index * 19) % 90}%`,
              top: `${(index * 13) % 82}%`,
            }}
          />
        ))}
        <div className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full border border-cyan-300/20 bg-slate-950/45 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/85 backdrop-blur-xl">
          Neural Intelligence Layer
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(3,7,17,0.55)_100%)]" />
        <div className="absolute inset-x-[18%] bottom-0 h-14 bg-[radial-gradient(circle_at_center,rgba(3,7,17,0.82),transparent_80%)] blur-xl" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={containerClass}>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={`stream-${index}`}
            className="absolute h-px w-52 bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent opacity-70"
            style={{
              top: `${10 + index * 8}%`,
              left: `${-18 + index * 6}%`,
              transform: `rotate(${-16 + index * 3.5}deg)`,
              animation: `data-stream ${7 + index * 0.7}s linear infinite`,
              animationDelay: `${index * 0.3}s`,
            }}
          />
        ))}
      </div>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 46, near: 0.1, far: 20 }}
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#030711", 0);
        }}
      >
        <DemandLoop active={!contextLost} />
        <fog attach="fog" args={["#030711", 5.5, 9.5]} />
        <ambientLight intensity={0.85} />
        <pointLight position={[2.8, 2.4, 2.2]} intensity={18} color="#22d3ee" />
        <pointLight position={[-2.4, -1.8, 1.6]} intensity={12} color="#8b5cf6" />
        <pointLight position={[0, 0, -3]} intensity={7} color="#38bdf8" />
        <NeuralField pointer={pointer} scrollProgress={scrollProgress} clickPulse={clickPulse} />
      </Canvas>
      {contextLost ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-slate-950/70 text-[0.7rem] uppercase tracking-[0.28em] text-cyan-100/80">
          Recovering GPU context...
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-x-[14%] top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent)] opacity-25 blur-2xl" />
      <div className="pointer-events-none absolute inset-x-[18%] bottom-0 h-[4.5rem] bg-[radial-gradient(circle_at_center,rgba(3,7,17,0.86),transparent_80%)] blur-xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(3,7,17,0.6)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(3,7,17,0.12)_62%,rgba(3,7,17,0.55)_100%)]" />
    </div>
  );
}

export default React.memo(NeuralNetworkCanvas);

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingParticles = ({ count = 30, color = "#f97316" }: { count?: number; color?: string }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 5,
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      scale: 0.03 + Math.random() * 0.06,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.phase) * 0.5,
        p.y + Math.cos(t * p.speed * 0.7 + p.phase) * 0.3,
        p.z
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 2 + p.phase) * 0.3));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
};

const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <FloatingParticles count={40} color="#f97316" />
      <FloatingParticles count={20} color="#fbbf24" />
      <FloatingParticles count={15} color="#22c55e" />
    </group>
  );
};

const ParticleField = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true }}>
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default ParticleField;

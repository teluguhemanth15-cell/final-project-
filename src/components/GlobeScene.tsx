import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const WireframeGlobe = () => {
  const globeRef = useRef<THREE.Group>(null);
  const pinsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  const wireframeGeo = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 4);
  }, []);

  // Pin positions (lat/long converted to 3D)
  const pinPositions = useMemo(() => {
    const latLongs = [
      { lat: 28.6, lng: 77.2 },   // Delhi
      { lat: 15.4, lng: 73.9 },   // Goa
      { lat: 26.9, lng: 75.8 },   // Jaipur
      { lat: 9.9, lng: 76.3 },    // Kerala
      { lat: 32.2, lng: 77.2 },   // Manali
      { lat: 25.3, lng: 83.0 },   // Varanasi
    ];

    return latLongs.map(({ lat, lng }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const r = 2.08;
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    });
  }, []);

  return (
    <group ref={globeRef}>
      {/* Dark sphere base */}
      <mesh>
        <sphereGeometry args={[1.98, 64, 64]} />
        <meshStandardMaterial
          color="#2a1a0a"
          roughness={0.8}
          metalness={0.3}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh geometry={wireframeGeo}>
        <meshBasicMaterial
          color="#f97316"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.96, 32, 32]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Location pins */}
      <group ref={pinsRef}>
        {pinPositions.map((pos, i) => (
          <group key={i} position={pos}>
            {/* Pin body - cone */}
            <mesh position={[0, 0.12, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.06, 0.15, 8]} />
              <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} />
            </mesh>
            {/* Pin head - sphere */}
            <mesh position={[0, 0.22, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.8} />
            </mesh>
            {/* Glow ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.08, 0.12, 32]} />
              <meshBasicMaterial color="#f97316" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Red glow spot */}
      <mesh position={[0.5, -1.0, 1.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ff3333" transparent opacity={0.8} />
      </mesh>

      {/* Ambient glow dot */}
      <mesh position={[-1.5, 0.8, 1.2]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

const OrbitalRings = () => {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={ringRef}>
      {/* Main orbital ring */}
      <mesh rotation={[0.4, 0.3, 0.1]}>
        <torusGeometry args={[2.8, 0.008, 16, 100]} />
        <meshBasicMaterial color="#f9731640" transparent opacity={0.3} />
      </mesh>

      {/* Second orbital ring */}
      <mesh rotation={[0.8, -0.4, 0.3]}>
        <torusGeometry args={[3.0, 0.006, 16, 100]} />
        <meshBasicMaterial color="#fbbf2440" transparent opacity={0.2} />
      </mesh>

      {/* Orbiting dots */}
      <mesh position={[2.8, 0, 0]} rotation={[0.4, 0.3, 0.1]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-2.0, 2.0, 0.5]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

const GlobeScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 4]} intensity={0.6} color="#f97316" />
      <pointLight position={[2, -3, 3]} intensity={0.3} color="#fbbf24" />

      <WireframeGlobe />
      <OrbitalRings />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
};

export default GlobeScene;

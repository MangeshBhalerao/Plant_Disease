import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const OrganicShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#2e7d32"
          speed={3}
          distort={0.4}
          radius={1}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
};

const LeafShape = ({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color="#0d631b"
          speed={2}
          distort={0.3}
          radius={1}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
};

export const Plant3D = () => {
  return (
    <div className="w-full h-full min-h-[300px] lg:min-h-[500px] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <OrganicShape />
        
        {/* Decorative leaves */}
        <LeafShape position={[-2, 1, -1]} rotation={[0.5, 0.2, 0.1]} scale={0.8} />
        <LeafShape position={[2, -1, 1]} rotation={[-0.3, 0.5, 0.4]} scale={0.6} />
        <LeafShape position={[-1, -2, 0]} rotation={[0.1, -0.4, -0.2]} scale={0.5} />
        
        <Environment preset="forest" />
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
          Interactive 3D Preview
        </div>
      </div>
    </div>
  );
};

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const OrganicShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.3}
          speed={2.5}
          distort={0.35}
          radius={1}
          roughness={0.15}
          metalness={0.3}
        />
      </Sphere>
    </Float>
  );
};

const LeafShape = ({ position, rotation, scale = 1, color = '#059669' }: { 
  position: [number, number, number], 
  rotation: [number, number, number], 
  scale?: number,
  color?: string,
}) => {
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          speed={1.8}
          distort={0.25}
          radius={1}
          roughness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
};

export const Plant3D = () => {
  return (
    <div className="w-full h-full min-h-[280px] sm:min-h-[350px] lg:min-h-[500px] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.4} color="#34d399" />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#10b981" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={0.6} color="#6ee7b7" castShadow />
        <pointLight position={[0, -5, 5]} intensity={0.3} color="#059669" />
        
        <OrganicShape />
        
        {/* Decorative leaves */}
        <LeafShape position={[-2, 1, -1]} rotation={[0.5, 0.2, 0.1]} scale={0.8} color="#10b981" />
        <LeafShape position={[2, -1, 1]} rotation={[-0.3, 0.5, 0.4]} scale={0.6} color="#34d399" />
        <LeafShape position={[-1, -2, 0]} rotation={[0.1, -0.4, -0.2]} scale={0.5} color="#6ee7b7" />
        
        <Environment preset="night" />
      </Canvas>
      
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-bold text-primary/60 uppercase tracking-[0.15em]">
          Interactive 3D
        </div>
      </div>
    </div>
  );
};

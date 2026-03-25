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
          color="#22c55e"
          emissive="#16a34a"
          emissiveIntensity={0.1}
          speed={2.5}
          distort={0.35}
          radius={1}
          roughness={0.2}
          metalness={0.15}
        />
      </Sphere>
    </Float>
  );
};

const LeafShape = ({ position, rotation, scale = 1, color = '#16a34a' }: { 
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
          emissiveIntensity={0.05}
          speed={1.8}
          distort={0.25}
          radius={1}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

export const Plant3D = () => {
  return (
    <div className="w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[500px] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.7} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={0.9} color="#ffffff" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} color="#22c55e" castShadow />
        <pointLight position={[0, -5, 5]} intensity={0.2} color="#16a34a" />
        
        <OrganicShape />
        
        <LeafShape position={[-2, 1, -1]} rotation={[0.5, 0.2, 0.1]} scale={0.8} color="#22c55e" />
        <LeafShape position={[2, -1, 1]} rotation={[-0.3, 0.5, 0.4]} scale={0.6} color="#4ade80" />
        <LeafShape position={[-1, -2, 0]} rotation={[0.1, -0.4, -0.2]} scale={0.5} color="#059669" />
        
        <Environment preset="forest" />
      </Canvas>
      
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="glass px-3 py-1.5 rounded-full text-[9px] font-semibold text-on-surface-muted uppercase tracking-[0.12em]">
          Interactive 3D
        </div>
      </div>
    </div>
  );
};

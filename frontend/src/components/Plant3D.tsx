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
          color="#ffffff" // pure white base to show the reflection colors clearly
          speed={2.5}
          distort={0.2}
          radius={0.9}
          roughness={0} // perfectly smooth mirror
          metalness={0.94} // perfectly reflective
          envMapIntensity={2.5} // Boost the reflection of the forest!
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
          speed={1.8}
          distort={0.3}
          radius={1}
          roughness={0.05} // Almost perfectly smooth
          metalness={0.6} // Highly reflective
          envMapIntensity={2}
          transparent
          opacity={0.9}
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
        
        <LeafShape position={[-1, -2, 0]} rotation={[0.1, -0.4, -0.2]} scale={0.5} color="#059669" />
        
        {/* Changed from 'preset="forest"' to a custom Farm HDRI to explicitly reflect an open farm environment */}
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/farm_field_1k.hdr" />
      </Canvas>
      
      
    </div>
  );
};

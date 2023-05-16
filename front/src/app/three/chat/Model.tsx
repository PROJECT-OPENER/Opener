'use client';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Character from './Character';
const Model = () => {
  return (
    <div>
      <Canvas
        shadows
        style={{
          height: '100vh',
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.CineonToneMapping,
        }}
        camera={{
          fov: 45, // field of view
          near: 0.1,
          far: 50,
        }}
      >
        <Character />
      </Canvas>
    </div>
  );
};

export default Model;

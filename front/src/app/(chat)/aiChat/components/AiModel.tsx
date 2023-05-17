'use client';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import AiCharacter from './AiCharacter';
const AiModel = () => {
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
        <AiCharacter />
      </Canvas>
    </div>
  );
};

export default AiModel;

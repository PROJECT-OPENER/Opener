'use client';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Main from './Main';
const page = () => {
  return (
    <div>
      <Canvas
        shadows
        style={{
          height: '500px',
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
        // camera={{ near: 0.1, far: 50, fov: 45 }}
      >
        <Main />
      </Canvas>
    </div>
  );
};

export default page;

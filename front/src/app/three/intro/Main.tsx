/* eslint-disable react/no-unknown-property */
'use client';
import {
  useAnimations,
  useGLTF,
  Text,
  OrbitControls,
  Float,
  Text3D,
} from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
// import { useControls } from 'leva';
import { useFrame, useThree } from '@react-three/fiber';

export default function Main() {
  const directionalLight = useRef<THREE.DirectionalLight>(null);
  const model = useGLTF('/models/Michelle.glb');

  model.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
    }
  });

  const animations = useAnimations(model.animations, model.scene);
  animations.actions['standing pose']?.play();
  // const { animationName } = useControls({
  //   animationName: { options: animations.names },
  // });

  // useEffect(() => {
  //   const action = animations.actions[animationName];
  //   action?.reset().fadeIn(0.5).play();
  //   return () => {
  //     action?.fadeOut(0.5);
  //   };
  // }, [animationName]);

  const angleRef = useRef<boolean>(false);
  // const textRef = useRef(null);
  const controls: any = useThree((state) => state.controls);
  useFrame(() => {
    if (angleRef.current) {
      controls?.setAzimuthalAngle(-Math.PI / 2);
    } else {
      controls?.setAzimuthalAngle(-0.2);
    }
  });
  let time: any;
  const timer = () => {
    time = setTimeout(() => {
      angleRef.current = !angleRef.current;
      timer();
      return () => clearTimeout(time);
    }, 5000);
  };

  useEffect(() => {
    timer();
    return () => clearTimeout(time);
  }, []);

  return (
    <>
      <directionalLight
        ref={directionalLight}
        position={[2, 2, -3]}
        intensity={5}
      />
      <directionalLight
        ref={directionalLight}
        position={[7, 2, 3]}
        intensity={5}
      />
      <Float>
        <Text3D
          // ref={textRef}
          font="/font/BlackHanSans.json"
          size={1}
          position={[1, 0, -1.5]}
        >
          어서와
          <meshStandardMaterial color="black" />
        </Text3D>
      </Float>
      <Float>
        <Text3D
          // ref={textRef}
          font="/font/BlackHanSans.json"
          size={2}
          rotation={[0, -Math.PI / 2, 0]}
          position={[10, 0, 1]}
        >
          어서와
          <meshNormalMaterial />
        </Text3D>
      </Float>
      <primitive object={model.scene} scale={5} position={[-1.5, -7, -1]} />
      <ambientLight />
      <OrbitControls makeDefault enabled={false} />
      {/* <EffectComposer multisampling={0}></EffectComposer> */}
    </>
  );
}

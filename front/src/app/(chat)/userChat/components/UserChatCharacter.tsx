/* eslint-disable react/no-unknown-property */
'use client';
import { useAnimations, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useControls } from 'leva';

const UserChatCharacter = () => {
  const directionalLight = useRef<THREE.DirectionalLight>(null);
  const model = useGLTF('/models/Michelle.glb');

  model.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
    }
  });

  const animations = useAnimations(model.animations, model.scene);
  animations.actions['standing pose']?.play();
  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    action?.reset().fadeIn(0.5).play();
    return () => {
      action?.fadeOut(0.5);
    };
  }, [animationName]);

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
      <primitive object={model.scene} scale={5} position={[0, -7, 0]} />
      <ambientLight />
      <OrbitControls makeDefault enabled={false} />
    </>
  );
};

export default UserChatCharacter;

/* eslint-disable react/no-unknown-property */
'use client';
import { useAnimations, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useControls } from 'leva';
import { useRecoilValue } from 'recoil';
import { aiChatMessageListState } from '../store';

const AiCharacter = () => {
  const directionalLight = useRef<THREE.DirectionalLight>(null);
  const model = useGLTF('/models/Michelle.glb');
  // 추가
  const msgList = useRecoilValue(aiChatMessageListState);

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
  // 추가
  useEffect(() => {
    // animations.actions['Hip Hop Dancing']?.play();
    const action = animations.actions['Hip Hop Dancing']?.play();
    action?.reset().fadeIn(0.5).play();
    const timeoutId = setTimeout(() => {
      action?.fadeOut(0.5);
    }, 5000); // 3000 milliseconds = 3 seconds

    // 컴포넌트 unmount 시 타이머를 정리해줍니다.
    return () => clearTimeout(timeoutId);
  }, [msgList]);

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
      <primitive object={model.scene} scale={5} position={[0, -6.5, 0]} />
      <ambientLight />
      <OrbitControls makeDefault enabled={false} />
    </>
  );
};
export default AiCharacter;

/* eslint-disable react/no-unknown-property */
'use client';
import { useAnimations, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { userChatMessageListState, userChatModelState } from '../store';
// import { useControls } from 'leva';

const modelActions = [
  'Angry',
  'Bored',
  'Female Laying Pose',
  'Hip Hop Dancing',
  'Idle',
  'Standing Arguing',
  'standing pose',
  'Standing Idle',
  'Standing W_Briefcase Idle',
  'Talking',
  'Thoughtful Head Shake',
];

const UserChatCharacter = () => {
  const directionalLight = useRef<THREE.DirectionalLight>(null);
  const model = useGLTF('/models/Michelle.glb');

  const msgList = useRecoilValue(userChatMessageListState);
  const userChatModel = useRecoilValue(userChatModelState);

  model.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
    }
  });

  const animations = useAnimations(model.animations, model.scene);
  animations.actions['standing pose']?.play();

  useEffect(() => {
    const action = animations.actions[modelActions[3]]?.play();
    action?.reset().fadeIn(0.5).play();
    const timeoutId = setTimeout(() => {
      action?.fadeOut(0.5);
    }, 5000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timeoutId);
  }, [userChatModel]);

  useEffect(() => {
    // animations.actions['Hip Hop Dancing']?.play();
    const randomIndex = Math.floor(Math.random() * modelActions.length);
    const action = animations.actions[modelActions[randomIndex]]?.play();
    action?.reset().fadeIn(0.5).play();
    const timeoutId = setTimeout(() => {
      action?.fadeOut(0.5);
    }, 5000); // 3000 milliseconds = 3 seconds

    // 컴포넌트 unmount 시 타이머를 정리해줍니다.
    return () => clearTimeout(timeoutId);
  }, [msgList]);

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

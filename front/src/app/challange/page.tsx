import React from 'react';
import VoiceCard from './components/VoiceCard';
type VoiceList = Voice[];

type Voice = {
  id: string;
  title: string;
  image: string;
};

const page = () => {
  const voiceList: VoiceList = [
    {
      id: '1',
      title: '1번) 간단한 인사말을 활용한 챌린지입니다.',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
    },
    {
      id: '2',
      title: '2번) 간단한 인사말을 활용한 챌린지입니다.',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
    },
    {
      id: '3',
      title: '3번) 간단한 인사말을 활용한 챌린지입니다.',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
    },
    {
      id: '4',
      title: '4번) 간단한 인사말을 활용한 챌린지입니다.',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
    },
    {
      id: '5',
      title: '5번) 간단한 인사말을 활용한 챌린지입니다.',
      image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
    },
  ];
  return (
    <div className="">
      <VoiceCard voiceList={voiceList}></VoiceCard>
    </div>
  );
};

export default page;

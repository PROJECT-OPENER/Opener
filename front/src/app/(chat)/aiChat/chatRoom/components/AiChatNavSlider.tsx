'use client';
import React, { useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slideInterface } from '@/types/share';
import { BsCircleFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { aiChatSub } from '../../store';
import useSWR from 'swr';
import { getTipApi } from '@/app/api/chatApi';

interface TipType {
  tipDescription: string;
  tipTitle: string;
}

const TipMock = [
  {
    question: 'What is your favorite romantic movie?',
    translation: '당신이 가장 좋아하는 로맨스 영화는 무엇인가요?',
  },
  {
    question: 'Do you prefer romantic comedies or romantic dramas?',
    translation: '로맨틱 코미디와 로맨틱 드라마 중 어떤 것을 더 선호하나요?',
  },
  {
    question: 'Have you ever watched a romantic movie that made you cry?',
    translation: '당신이 본 로맨스 영화 중에서 울게 한 적이 있나요?',
  },
  {
    question: 'What do you think makes a romantic movie great?',
    translation:
      '당신은 로맨스 영화가 좋은 영화가 되기 위해 필요한 요소가 무엇이라고 생각하나요?',
  },
  {
    question: 'Can you recommend a good romantic movie to me?',
    translation: '좋은 로맨스 영화를 추천해 줄 수 있나요?',
  },
];

interface AiChatNavSliderProps {
  settings?: slideInterface;
  setting?: slideInterface;
}

const AiChatNavSlider = ({ settings, setting }: AiChatNavSliderProps) => {
  const subject = useRecoilValue(aiChatSub);
  const { data, isLoading } = useSWR(
    'get/tip',
    () => getTipApi(subject.subIndex),
    {
      focusThrottleInterval: 5000,
    },
  );
  useEffect(() => {
    console.log('data', data);
  }, [data]);
  if (isLoading) return <div>로딩중...</div>;
  return (
    <>
      <div className="lg:hidden h-[60px] max-w-[90%]">
        {data !== void 0 && (
          <Slider
            {...setting}
            className="flex items-center w-[80%] h-[60px] flex-1"
          >
            {data.data.map((tip: TipType, idx: number) => (
              <div
                key={idx}
                className="text-white flex items-center mt-2 max-sm:mt-3 max-sm:text-xs text-sm"
              >
                <div className="font-bold text-white truncate">
                  {tip.tipDescription}
                </div>
                <div className="text-white truncate">{tip.tipTitle}</div>
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className="max-lg:hidden">
        {data !== void 0 && (
          <Slider {...settings} className="space-y-3">
            {data.data.map((tip: TipType, idx: number) => (
              <div
                key={idx}
                className="flex items-center bg-brandP p-3 rounded-xl mt-5 relative"
              >
                <BsCircleFill className="fill-red-300 absolute mt-4" />
                <div className="ml-6 text-white">
                  <div className="truncate">{tip.tipTitle}</div>
                  <div className="font-bold truncate">{tip.tipDescription}</div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export default AiChatNavSlider;

'use client';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
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

'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slideInterface } from '@/types/share';
// import { BsCircleFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { aiChatSub } from '../../store';
import useSWR from 'swr';
import { getTipApi } from '@/app/api/chatApi';
import styles from './customSlider.module.css';
interface TipType {
  tipDescription: string;
  tipTitle: string;
}

// const settings = {
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   arrows: false,
//   autoplay: true,
// };

const AiChatNavSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    rows: 1,
    useCss: styles,
  };
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
      <div className="">
        {data !== void 0 && (
          <Slider {...settings} className="">
            {data.data.map((tip: TipType, idx: number) => (
              <div key={idx} className="px-2">
                <p className="text-sm whitespace-nowrap mb-1">{tip.tipTitle}</p>
                <p className="text-xs whitespace-nowrap">
                  {tip.tipDescription}
                </p>
              </div>
            ))}
          </Slider>
        )}
      </div>
      {/* <div className="max-lg:hidden">
        {data !== void 0 && (
          <Slider {...settings} className="space-y-3">
            {data.data.map((tip: TipType, idx: number) => (
              <div
                key={idx}
                className="flex items-center p-3 rounded-xl relative"
              >
                <BsCircleFill className="fill-red-300 absolute" />
                <div className="ml-6 text-white">
                  <div className="truncate">{tip.tipTitle}</div>
                  <div className="font-bold truncate">{tip.tipDescription}</div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div> */}
    </>
  );
};

export default AiChatNavSlider;

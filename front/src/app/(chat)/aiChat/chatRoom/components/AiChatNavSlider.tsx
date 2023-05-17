'use client';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecoilValue } from 'recoil';
import { aiChatSub } from '../../store';
import useSWR from 'swr';
import { getTipApi } from '@/app/api/chatApi';
interface TipType {
  tipDescription: string;
  tipTitle: string;
}

const AiChatNavSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    rows: 1,
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
      <div>
        {data !== void 0 && (
          <Slider {...settings}>
            {data.data.map((tip: TipType, idx: number) => (
              <div key={idx} className="px-2">
                <p className="text-sm">{tip.tipTitle}</p>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export default AiChatNavSlider;

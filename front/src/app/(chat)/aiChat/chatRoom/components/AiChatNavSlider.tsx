'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

const AiChatNavSlider = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <Slider {...settings} className="flex items-center w-[80%] h-[60px]">
      {TipMock.map((tip, idx) => (
        <div key={idx} className="text-white flex items-center">
          <div className="text-sm font-bold text-white truncate">
            {tip.question}
          </div>
          <div className="text-sm text-white truncate">{tip.translation}</div>
        </div>
      ))}
    </Slider>
  );
};

export default AiChatNavSlider;

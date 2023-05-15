/* eslint-disable react/prop-types */
import React from 'react';
import { BsCircleFill } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineArrowRight } from 'react-icons/ai';

const settings = {
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  // autoplay: true,
  // autoplaySpeed: 6000,
  rows: 1,
};

interface TipType {
  title: string;
  content: string;
}

type Props = {
  data: TipType[];
  classname: string;
};

const UserChatSlider = ({ data, classname }: Props) => {
  return (
    <Slider {...settings} className="space-y-3">
      {data.map((tip: TipType, idx: number) => (
        <div
          key={idx}
          className="bg-brandP p-3 rounded-3xl flex items-center relative"
        >
          <BsCircleFill
            className={`${classname} my-auto absolute top-1 bottom-1`}
          />
          <div className="text-white ml-7">
            <div>{tip.title}</div>
            <div>{tip.content}</div>
          </div>
          <AiOutlineArrowRight
            className={`my-auto absolute top-1 bottom-1 right-2 animate-bounce-right text-white text-base`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default UserChatSlider;

'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider1 from './Slider1';
import Slider2 from './Slider2';
import Slider3 from './Slider3';

const InfoSlider = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <Slider
      {...settings}
      className="bg-white m-5 rounded-3xl p-5 bg-[url('/images/bonobono.png')]"
    >
      <div>
        <Slider1 />
      </div>
      <div>
        <Slider2 />
      </div>
      <div>
        <Slider3 />
      </div>
    </Slider>
  );
};

export default InfoSlider;

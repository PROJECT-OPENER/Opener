'use client';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userChatResultState } from '../../store';
import { Fade, Hinge, Slide } from 'react-awesome-reveal';
import Link from 'next/link';
const Escape = () => {
  const result = useRecoilValue(userChatResultState);
  useEffect(() => {
    console.log(result);
  }, [result]);
  return (
    <div className="text-center">
      <Hinge triggerOnce={true} delay={1000} duration={3000}>
        <h1 className="text-4xl font-bold">상대방이 탈주 했습니다.</h1>
      </Hinge>
      <Fade triggerOnce={true} delay={3000} duration={3000}>
        <h1 className="text-4xl font-bold">그래도 점수는 오릅니다..!</h1>
      </Fade>
      <Fade
        delay={6000}
        triggerOnce={true}
        className="flex items-center mt-5 justify-center relative"
      >
        <Slide
          triggerOnce={true}
          delay={6000}
          duration={3000}
          className="flex items-center justify-center absolute top-5 right-11 w-full h-full"
        >
          <h1 className="text-4xl font-bold text-center">
            {result.currentScore}
          </h1>
        </Slide>
        <Slide
          triggerOnce={true}
          delay={6000}
          duration={3000}
          direction="right"
          className="flex items-center justify-center absolute top-0 left-11 w-full h-full"
        >
          <h1 className="text-4xl font-bold">(+{result.changeScore})</h1>
        </Slide>
      </Fade>
      <Fade triggerOnce={true} delay={9000} duration={1000} className="mt-20">
        <Link href="/chat" className="bg-white p-3 rounded-lg shadow-custom">
          나가기
        </Link>
      </Fade>
    </div>
  );
};

export default Escape;

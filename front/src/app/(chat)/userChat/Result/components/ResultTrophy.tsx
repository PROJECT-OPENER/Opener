'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { userChatMyNicknameState, userChatResultState } from '../../store';
import { useRecoilValue } from 'recoil';
import { Fade, Hinge, Rotate } from 'react-awesome-reveal';

const ResultTrophy = () => {
  const myNickname = useRecoilValue(userChatMyNicknameState);
  const result = useRecoilValue(userChatResultState);
  const trophy =
    'https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/9a90e2d1-51df-413d-99ef-eef4a4da6fd9.Image%20Pasted%20at%202023-5-17%2021-17.PNG';
  const sloth =
    'https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/10c5f627-759e-4317-80b9-9ded9b8c850d.sloth-lying-on-tree-branch.jpg';
  if (result.myScore === undefined) return <div>loading...</div>;
  return (
    <div className="bg-white m-5 p-5 flex flex-col justify-center items-center rounded-3xl">
      <h1 className="text-2xl font-bold">
        {result.myScore.nickname === myNickname ? (
          <span>
            {result.myScore.currentScore} (
            {result.myScore.changeScore > 0
              ? `+${result.myScore.changeScore}`
              : `${result.myScore.changeScore}`}
            )
          </span>
        ) : (
          <span>
            {result.otherScore.currentScore} (
            {result.otherScore.changeScore > 0
              ? `+${result.otherScore.changeScore}`
              : `${result.otherScore.changeScore}`}
            )
          </span>
        )}
      </h1>
      <div className="h-32 w-32 relative">
        {result.winnerNickname !== myNickname ? (
          <>
            <Hinge
              triggerOnce={false}
              delay={1000}
              duration={3000}
              className="h-full w-full"
            >
              <Image
                src={trophy}
                alt="pic"
                className="rounded-full w-full h-full"
                width={500}
                height={500}
              />
            </Hinge>
            <Fade delay={4000} duration={3000} className="absolute top-0">
              <Image
                src={sloth}
                alt="pic"
                className="rounded-full w-full h-full"
                width={500}
                height={500}
              />
            </Fade>
          </>
        ) : (
          <Rotate
            triggerOnce={true}
            delay={1000}
            duration={3000}
            className="h-full w-full"
          >
            <Image
              src={trophy}
              alt="pic"
              className="rounded-full w-full h-full"
              width={500}
              height={500}
            />
          </Rotate>
        )}
      </div>
      <div>
        {/* <h1 className="text-xl font-bold">{winnerNickname} 님이 이겼습니다.</h1> */}
        {result.winnerNickname === null && (
          <h1 className="text-xl font-bold">Dead heat</h1>
        )}
        {result.winnerNickname === myNickname ? (
          <Fade
            triggerOnce={true}
            delay={4000}
            duration={3000}
            className="h-full w-full"
          >
            <h1 className="text-xl font-bold">승리</h1>
          </Fade>
        ) : (
          <Fade
            triggerOnce={true}
            delay={4000}
            duration={3000}
            className="h-full w-full"
          >
            <h1 className="text-xl font-bold">패배</h1>
          </Fade>
        )}
      </div>
    </div>
  );
};

export default ResultTrophy;

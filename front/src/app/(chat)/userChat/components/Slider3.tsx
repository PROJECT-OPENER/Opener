import React from 'react';
import { ColoredText } from './Slider1';
import { bonobonoState } from '../store';
import { useRecoilState } from 'recoil';

const Slider3 = () => {
  const [isBono, setIsBono] = useRecoilState(bonobonoState);
  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-5">
      <h1
        className="text-xl font-bold animate-pulse"
        onClick={() => {
          setIsBono(!isBono);
        }}
      >
        게임 특징
      </h1>
      {isBono && (
        <>
          <h1>
            {ColoredText(
              '게임 참가자들은 비슷한 점수의 영어 학습자이기 때문에, 공정하게 대결을 즐길 수 있습니다.',
            )}
          </h1>
          <h1>
            {ColoredText(
              '게임을 진행하면서 참가자들은 자신의 영어 실력을 향상시키고, 동시에 즐거움을 느낄 수 있습니다.',
            )}
          </h1>
          <h1>
            {ColoredText(
              '지금 바로 "Ten Round English Battle"을 즐기러 가보세요!',
            )}
          </h1>
        </>
      )}
      {!isBono && (
        <>
          <h1 className="">
            게임 참가자들은 비슷한 점수의 영어 학습자이기 때문에, 공정하게
            대결을 즐길 수 있습니다.
          </h1>
          <h1>
            게임을 진행하면서 참가자들은 자신의 영어 실력을 향상시키고, 동시에
            즐거움을 느낄 수 있습니다.
          </h1>
          <h1>지금 바로 Ten Round English Battle 즐기러 가보세요!</h1>
        </>
      )}
    </div>
  );
};

export default Slider3;

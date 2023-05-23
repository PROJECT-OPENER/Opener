import React from 'react';
import { ColoredText } from './Slider1';
import { bonobonoState } from '../store';
import { useRecoilState } from 'recoil';

const Slider2 = () => {
  const [isBono, setIsBono] = useRecoilState(bonobonoState);
  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-5">
      <h1
        className="text-xl font-bold animate-pulse"
        onClick={() => {
          setIsBono(!isBono);
        }}
      >
        게임 규칙
      </h1>
      {isBono && (
        <>
          <h1>
            {ColoredText(
              '매칭이 완료되면, 참가자들은 번갈아가며 문장을 입력하며 대결을 진행합니다.',
            )}
          </h1>
          <h1>
            {ColoredText(
              '게임이 끝나면 AI가 결과를 분석하여 승패를 결정합니다.',
            )}
          </h1>
          <h1>
            {ColoredText(
              '주어진 제시어를 대화에 활용하면 추가점수가 있습니다!',
            )}
          </h1>
        </>
      )}
      {!isBono && (
        <>
          <h1 className="">
            매칭이 완료되면, 참가자들은 번갈아가며 문장을 입력하며 대결을
            진행합니다.
          </h1>
          <h1>게임이 끝나면 AI가 결과를 분석하여 승패를 결정합니다.</h1>
          <h1>주어진 제시어를 대화에 활용하면 추가점수가 있습니다!</h1>
        </>
      )}
    </div>
  );
};

export default Slider2;

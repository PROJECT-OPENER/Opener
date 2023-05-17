import React from 'react';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import { bonobonoState } from '../store';

const colors = [
  'text-red-500',
  'text-red-900',
  'text-yellow-500',
  'text-green-500',
  'text-indigo-500',
  'text-purple-500',
  'text-pink-500',
  'text-emerald-500',
  'text-gray-500',
  'text-lime-500',
  'text-rose-500',
  'text-fuchsia-500',
  'text-cyan-500',
  'text-sky-500',
];

export const ColoredText = (text: string) => {
  return (
    <div className="text-xl font-bold text-lig">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={classNames('', colors[index % colors.length])}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

const Slider1 = () => {
  const [isBono, setIsBono] = useRecoilState(bonobonoState);
  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-5">
      <h1
        className="text-xl font-bold animate-pulse"
        onClick={() => {
          setIsBono(!isBono);
        }}
      >
        게임 소개
      </h1>
      {isBono && (
        <>
          <h1>
            {ColoredText(
              '각 참가자는 15초 이내에 하나의 문장을 입력해야 합니다.',
            )}
          </h1>
          <h1>
            {ColoredText(
              '총 10번의 턴으로 구성되어 있으며, 대회는 1:1 대결 형태로 진행됩니다.',
            )}
          </h1>
          <h1>
            {ColoredText(
              '입력된 문장들의 문법과 문맥을 AI가 분석하여 승패를 결정합니다.',
            )}
          </h1>
        </>
      )}
      {!isBono && (
        <>
          <h1 className="">
            각 참가자는 15초 이내에 하나의 문장을 입력해야 합니다.
          </h1>
          <h1>
            총 10번의 턴으로 구성되어 있으며, 대회는 1:1 대결 형태로 진행됩니다.
          </h1>
          <h1>
            입력된 문장들의 문법과 문맥을 AI가 분석하여 승패를 결정합니다.
          </h1>
        </>
      )}
    </div>
  );
};

export default Slider1;

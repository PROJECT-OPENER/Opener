import React from 'react';
import { ColoredText } from './Slider1';

const Slider2 = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-5">
      <h1 className="text-xl font-bold">게임 규칙</h1>
      <h1>
        {ColoredText(
          '매칭이 완료되면, 참가자들은 번갈아가며 문장을 입력하며 대결을 진행합니다.',
        )}
      </h1>
      <h1>
        {ColoredText('게임이 끝나면 AI가 결과를 분석하여 승패를 결정합니다.')}
      </h1>
      <h1>
        {ColoredText('주어진 제시어를 대화에 활용하면 추가점수가 있습니다!')}
      </h1>
    </div>
  );
};

export default Slider2;

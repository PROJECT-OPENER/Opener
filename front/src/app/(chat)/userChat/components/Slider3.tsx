import React from 'react';
import { ColoredText } from './Slider1';

const Slider3 = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-5">
      <h1 className="text-xl font-bold">게임 특징</h1>
      <h1>
        {ColoredText(
          '"Ten Round English Showdown"은 영어 학습에 도움이 되는 게임입니다.',
        )}
      </h1>
      <h1>
        {ColoredText(
          '대회 참가자들은 모두 비슷한 수준의 영어 학습자이기 때문에, 공정하게 대결을 즐길 수 있습니다.',
        )}
      </h1>
      <h1>
        {ColoredText(
          '게임을 진행하면서 참가자들은 자신의 영어 실력을 향상시키고, 동시에 즐거움을 느낄 수 있습니다.',
        )}
      </h1>
      <h1>
        {ColoredText(
          '지금 바로 "Ten Round English Showdown"을 즐기러 가보세요!',
        )}
      </h1>
    </div>
  );
};

export default Slider3;

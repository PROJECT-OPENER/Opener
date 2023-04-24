import React from 'react';
import ChoiceBox from './components/ChoiceBox';

const page = () => {
  return (
    <div>
      <h1>대화 주제 선택</h1>
      <div>
        <h3>AI와 대화할 주제를 선택해주세요.</h3>
        <h3>주제와 관련된 질문이 주어집니다.</h3>
      </div>
      <ChoiceBox />
    </div>
  );
};

export default page;

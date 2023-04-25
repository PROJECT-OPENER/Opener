import React from 'react';
import ChoiceBox from './components/ChoiceBox';

const page = () => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl text-center font-bold">대화 주제 선택</h1>
      <div className="text-center my-5 font-bold">
        <div>AI와 대화할 주제를 선택해주세요.</div>
        <div>주제와 관련된 질문이 주어집니다.</div>
      </div>
      <ChoiceBox />
    </div>
  );
};

export default page;

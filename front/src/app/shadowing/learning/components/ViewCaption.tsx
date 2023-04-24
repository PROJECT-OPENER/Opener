'use client';
import CheckDiction from './CheckDiction';
import { useState } from 'react';

const ViewCaption = () => {
  const [checkDiction, setCheckDiction] = useState<boolean | false>();

  if (checkDiction) {
    return (
      <div className="p-6 min-h-[150px]">
        <button onClick={() => setCheckDiction(false)}>이전으로</button>
        <CheckDiction />
      </div>
    );
  }
  return (
    <div className="p-6 min-h-[150px]">
      <button onClick={() => setCheckDiction(true)}>발음 체크</button>
      <p className="caption">How are you?</p>
    </div>
  );
};
export default ViewCaption;

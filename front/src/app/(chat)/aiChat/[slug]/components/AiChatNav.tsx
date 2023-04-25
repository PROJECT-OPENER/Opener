'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const AiChatNav = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('sub');
  console.log(search);
  return (
    <div className="flex justify-between">
      <div>뒤로</div>
      <div>AI 챗 : {search}</div>
      <div>TIP</div>
    </div>
  );
};

export default AiChatNav;

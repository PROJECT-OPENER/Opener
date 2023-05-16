'use client';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userChatResultState } from '../../store';
import { useRouter } from 'next/navigation';
const Escape = () => {
  const result = useRecoilValue(userChatResultState);
  useEffect(() => {
    console.log(result);
  }, [result]);
  return <div className="text-center">상대방이 탈주했습니다.</div>;
};

export default Escape;
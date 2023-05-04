'use client';

import Button from '@/app/components/Button';
import InterestsEdit from './InterestsEdit';
import { useState } from 'react';

const dummy = ['여행', '일상'];

const MypageEditBotSection = () => {
  const [interestEdit, setInterestEdit] = useState<boolean>(false);
  return (
    <div className="my-10">
      <div className="">
        <h1 className=" text-xl font-bold mx-20 my-3">닉네임 수정</h1>
        <div className="relative bg-white rounded-2xl drop-shadow-md mx-20 py-1">
          <input
            type="text"
            className="p-3 w-full border-slate-100 focus:outline-none focus:border-[1px] focus:border-brandP pl-12 rounded-2xl"
            placeholder="닉네임"
          />
          <Button
            type="submit"
            text="수정"
            className="modification-submit top-3"
          />
        </div>
      </div>
      <div className="my-16">
        <h1 className=" text-xl font-bold mx-20 my-3">비밀번호 수정</h1>
        <div className="relative bg-white rounded-2xl  drop-shadow-md mx-20 py-1">
          <input
            type="text"
            className="p-3 w-full border-slate-100 focus:outline-none focus:border-[1px] focus:border-brandP pl-12 rounded-2xl"
            placeholder="기존 비밀번호"
          />
        </div>
        <div className="relative rounded-2xl  drop-shadow-md mx-20 py-1">
          <input
            type="text"
            className="p-3 w-full border-slate-100 focus:outline-none focus:border-[1px] focus:border-brandP pl-12 rounded-t-2xl"
            placeholder="새 비밀번호"
          />
          <input
            type="text"
            className="p-3 w-full border-slate-100 focus:outline-none focus:border-[1px] focus:border-brandP pl-12 rounded-b-2xl"
            placeholder="새 비밀번호 확인"
          />
          <Button
            type="submit"
            text="비밀번호 변경"
            className="validator-submit"
          />
        </div>
      </div>
      <div className="my-16">
        <h1 className=" text-xl font-bold mx-20 my-3">나의 관심사 수정</h1>

        <div className="relative rounded-2xl drop-shadow-md mx-20">
          <div className="space-x-2 text-xs py-3">
            {dummy.map((item, idx) => (
              <span key={idx} className="bg-gray-200 p-1">
                {item}
              </span>
            ))}
            {!interestEdit && (
              <Button
                type="submit"
                text="수정"
                onClick={() => setInterestEdit(!interestEdit)}
                className="modification-submit top-0"
              />
            )}
            {interestEdit && <InterestsEdit></InterestsEdit>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MypageEditBotSection;

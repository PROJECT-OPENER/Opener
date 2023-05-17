'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import useSWR from 'swr';
import { getInterestListApi } from '@/app/api/chatApi';
import { interestInterface } from '@/types/share';
import { interestUpdateApi } from '@/app/api/userApi';
import useUser from '@/app/hooks/userHook';

const InterestsEdit = () => {
  const { user, mutate } = useUser();
  useEffect(() => {
    let useIndex: number[] = [];
    user.data.interests.map((item: interestInterface) => {
      useIndex.push(item.interestId);
    });
    setActiveIndex(useIndex);
  }, []);
  const { data, isLoading } = useSWR('get/interest', getInterestListApi, {
    focusThrottleInterval: 5000,
  });

  const [activeIndex, setActiveIndex] = useState<number[]>([]);

  const handleClick = (i: number) => {
    if (activeIndex.includes(i)) {
      setActiveIndex(activeIndex.filter((index) => index !== i));
    } else {
      setActiveIndex([...activeIndex, i]);
    }
  };

  const handleRegister = async () => {
    if (activeIndex.length < 2) return alert('2개 이상 선택해주세요.');
    try {
      await interestUpdateApi(activeIndex);
      alert('관심사 수정이 완료되었습니다.');
      mutate();
    } catch (err) {
      alert(err);
    }
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-2">
        {data?.data.map((item: interestInterface) => {
          return (
            <div
              key={item.interestId}
              className={`m-5 h-[150px] w-[150px] rounded-xl flex justify-center items-center shadow-xl mx-auto hover:cursor-pointer ${
                activeIndex.includes(item.interestId)
                  ? 'bg-brandP text-white'
                  : 'bg-white'
              }`}
              onClick={() => handleClick(item.interestId)}
            >
              <span
                className={`${
                  activeIndex.includes(item.interestId)
                    ? 'bg-brandP text-white'
                    : 'bg-white'
                }`}
              >
                + {item.interest}
              </span>
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        text="관심사 등록"
        className="validator-submit"
        onClick={handleRegister}
      />
    </div>
  );
};

export default InterestsEdit;

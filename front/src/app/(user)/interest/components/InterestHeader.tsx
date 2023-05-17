'use client';
import useUser from '@/app/hooks/userHook';

const InterestHeader = () => {
  const { user } = useUser();
  return (
    <div className="px-8">
      <h1 className="text-center text-3xl font-bold">관심사 등록하기</h1>
      <h4 className="my-5">
        즐거운 영어 학습을 위해
        <br />
        {user?.data.nickname}님의 관심사를 선택해주세요.
      </h4>
    </div>
  );
};

export default InterestHeader;

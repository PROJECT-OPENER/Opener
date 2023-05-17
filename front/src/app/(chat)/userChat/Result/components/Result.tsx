'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ResultTrophy from './ResultTrophy';
import ResultScore from './ResultScore';
import AnalyzeResult from './AnalyzeResult';
import { useRouter } from 'next/navigation';
import { TfiAngleLeft } from 'react-icons/tfi';
import DetailPageNav from '@/app/components/DetailPageNav';

const Result = () => {
  const router = useRouter();
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    // 로컬스토리지 통한 url 접근 막기
    const storedUrl = localStorage.getItem('chatRoom');

    // localStorage에 URL이 저장되어 있으면 해당 URL로 리디렉션
    if (!storedUrl) {
      alert('잘못된 접근입니다.');
      router.push('/chat');
    }
  }, []);

  const handleLeftGame = () => {
    router.push('/chat');
  };

  return (
    <>
      <div className="lg:hidden">
        {!showAnalysis && (
          <div>
            <ResultTrophy />
            <ResultScore />
            <div className="bg-white m-5 p-5 rounded-3xl space-y-3">
              <button
                type="button"
                className="bg-brandP text-white py-3 rounded-2xl text-center font-xl font-bold block w-full"
                onClick={() => {
                  setShowAnalysis(!showAnalysis);
                }}
              >
                문법 피드백 보기
              </button>
              <Link
                href={'/chat'}
                className="bg-white py-3 rounded-2xl text-center font-xl font-bold shadow-custom block"
              >
                나가기
              </Link>
            </div>
          </div>
        )}
        {showAnalysis && (
          <>
            <div className="mb-[60px]">
              <AnalyzeResult />
            </div>
            <div className="h-[60px] flex items-center bg-slate-200 px-5 fixed bottom-0 w-full rounded">
              <button
                type="button"
                onClick={() => {
                  setShowAnalysis(!showAnalysis);
                }}
                className=""
              >
                <TfiAngleLeft
                  className="tabmenu-items-ico"
                  size={'2rem'}
                  color="#838383"
                />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="max-lg:hidden">
        <DetailPageNav
          className="max-w-[1500px] absolute top-3 left-10 right-10 mx-auto"
          title="RESULT"
          propEvent={handleLeftGame}
        />
        <div className="mt-10 flex justify-between max-w-[1500px] absolute top-20 bottom-5 left-0 right-0 mx-auto">
          <div className="w-full">
            <ResultTrophy />
            <ResultScore />
          </div>
          <div className="overflow-y-scroll mt-5 w-full">
            <AnalyzeResult />
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;

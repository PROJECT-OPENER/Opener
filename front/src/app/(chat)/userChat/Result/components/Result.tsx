'use client';
import Link from 'next/link';
import { useState } from 'react';
import ResultTrophy from './ResultTrophy';
import ResultScore from './ResultScore';
import AnalyzeResult from './AnalyzeResult';

const Result = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div>
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
          {showAnalysis && <AnalyzeResult />}
          <Link
            href={'/chat'}
            className="bg-white py-3 rounded-2xl text-center font-xl font-bold shadow-custom block"
          >
            나가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;

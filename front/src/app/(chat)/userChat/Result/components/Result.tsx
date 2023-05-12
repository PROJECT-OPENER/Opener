'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ResultTrophy from './ResultTrophy';
import ResultScore from './ResultScore';
import { TfiAngleLeft } from 'react-icons/tfi';
import AnalyzeResult from './AnalyzeResult';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userChatFilteredState,
  userChatMessageListState,
  userChatResultState,
} from '../../store';
import { openAiUserChatApi } from '@/app/api/openAi';
import useSWR from 'swr';
import { convertToJSON } from '@/util/Math';

const data = {
  result: [
    {
      nickname: '닉네임1',
      message: 'Hi I am robin are you amy friend?',
      contextResult: '문맥 상 적합한 표현입니다.',
      grammarResult: '올바른 문법입니다',
    },
    {
      nickname: '닉네임2',
      message: 'yes I am amy friend. I am so happy to meet you.',
    },
    {
      nickname: '닉네임1',
      message: 'oh really? I am so happy to meet you too. where are you from?',
      contextResult: '문맥 상 적합한 표현입니다.',
      grammarResult: '올바른 문법입니다',
    },
    {
      nickname: '닉네임2',
      message: 'I am from korea. I am 20 years old. how about you?',
    },
  ],
  myScore: {
    myNickname: '닉네임1',
    currentScore: 1500,
    changeScore: 21,
    contextScore: 90,
    grammarScore: 70,
    wordUsed: true,
  },
  otherScore: {
    otherNickname: '닉네임2',
    contextScore: 80,
    grammarScore: 60,
    wordUsed: false,
  },
  winnerNickname: '닉네임1',
};

const Result = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const filteredMessageList = useRecoilValue(userChatFilteredState);
  const messageList = useRecoilValue(userChatMessageListState);
  const [text, setText] = useRecoilState(userChatResultState); // [{nickname: '닉네임', message: '메세지'}

  const { data: result, isLoading } = useSWR('/api/result', () =>
    openAiUserChatApi(filteredMessageList),
  );
  useEffect(() => {
    console.log('result', typeof result?.data.choices[0].text);
    if (result !== undefined) {
      setText(convertToJSON(result?.data.choices[0].text) as any);
    }
    console.log('text', text);
    console.log('messageList', messageList);
  }, [result]);
  // useEffect(() => {
  //   const getResults = async () => {
  //     const res = await openAiUserChatApi(filteredMessageList);
  //     setText(res.data.choices[0].text);
  //     console.log('res', res);
  //   };
  //   getResults();
  // }, []);
  return (
    <div>
      {isLoading && <div>로딩중</div>}
      {/* {result && <div className="bg-red-200">{text}</div>} */}
      {!showAnalysis && (
        <div>
          <ResultTrophy
            myScore={data.myScore.currentScore}
            myScoreChange={data.myScore.changeScore}
            winnerNickname={data.winnerNickname}
          />
          <ResultScore
            myNickname={data.myScore.myNickname}
            otherNickname={data.otherScore.otherNickname}
            myContextScore={data.myScore.contextScore}
            myGrammarScore={data.myScore.grammarScore}
            otherContextScore={data.otherScore.contextScore}
            otherGrammarScore={data.otherScore.grammarScore}
            myWordUsed={data.myScore.wordUsed}
            otherWordUsed={data.otherScore.wordUsed}
          />
          <div className="bg-white m-5 p-5 rounded-3xl space-y-3">
            <button
              type="button"
              className="bg-brandP text-white py-3 rounded-2xl text-center font-xl font-bold block w-full"
              onClick={() => {
                setShowAnalysis(!showAnalysis);
              }}
            >
              분석 결과 보기
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
        <div>
          <div className="top-nav flex justify-between m-3 p-3">
            <button
              type="button"
              onClick={() => {
                setShowAnalysis(!showAnalysis);
              }}
            >
              <TfiAngleLeft
                className="tabmenu-items-ico"
                size={'2rem'}
                color="#838383"
              />
            </button>
            <div>주제</div>
            <div>느낌표</div>
          </div>
          <AnalyzeResult result={data.result} />
        </div>
      )}
    </div>
  );
};

export default Result;

'use client';

import React, { useRef, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import ChallangeDetail from './ChallangeDetail';

interface Issue {
  id: number;
  title: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 1; // 페이지 수

const ChallangeList: React.FC = () => {
  // data: 각 페이지의 응답 값의 배열
  // size: 가져올 페이지 및 반환될 페이지의 수
  // setSize: 가져와야 하는 페이지의 수를 설정
  // isLoading: 진행 중인 요청이 있고 로드된 데이터가 없는 경우
  // isValidating: 요청이나 갱신 로딩의 여부
  // mutate: 데이터 배열을 다룸
  const { data, size, setSize, isLoading } = useSWRInfinite<Issue[]>(
    (index) =>
      // getKey: 인덱스와 이전 페이지 데이터를 받고 페이지의 키를 반환하는 함수 - 공식문서 다시 보기
      `https://api.github.com/repos/reactjs/react-a11y/issues?per_page=${PAGE_SIZE}&page=${
        index + 1
      }`,
    fetcher,
  ); // API 나오기 전 임시로 데이터 불러온 거
  const issues = data ? ([] as Issue[]).concat(...data) : []; // 가져온 데이터 배열

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const listEndRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };
    if (!observer) {
      const newObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.2 && !isReachingEnd) {
            setSize((prev) => prev + 1); // 받아오는 사이즈 증가
          }
          if (isReachingEnd) {
            observer.unobserve;
          }
        });
      }, options);
      if (listEndRef.current && newObserver) {
        newObserver.observe(listEndRef.current); // list의 끝부분을 알려주는 p 타겟 요소를 관찰
      }
      setObserver(newObserver);
    }
  }, []);

  return (
    <>
      <div>
        {/* <p className="bg-yellow-50 text-2xl">
          전체: {isLoadingMore ? '...' : issues.length} 페이지 호출됨 무한
          스크롤 확인용
        </p> */}
        {isEmpty ? <p>조회된 챌린지가 없습니다.</p> : null}
        {issues.map((issue) => (
          <ChallangeDetail title={issue.title} key={issue.id}></ChallangeDetail>
        ))}
        {isLoadingMore ? '로딩중...' : isReachingEnd ? 'no more issues' : ''}
      </div>
      <p className="list-end" ref={listEndRef}></p>
    </>
  );
};

export default ChallangeList;

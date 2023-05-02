'use client';

import React, { useRef } from 'react';
import useSWRInfinite from 'swr/infinite';
import ChallangeDetail from './ChallangeDetail';
interface Issue {
  id: number;
  title: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 10; // 페이지 수

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

  // 옵션 객체
  const options = {
    // null을 설정하거나 무엇도 설정하지 않으면 브라우저 viewport가 기준이 된다.
    root: null,
    // 타겟 요소의 50%가 루트 요소와 겹치면 콜백을 실행한다.
    threshold: 0.5,
  };

  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0 && !isReachingEnd) {
          setSize((prev) => prev + 5);
        }
      });
    }, options),
  );

  const listEndRef = useRef<HTMLParagraphElement>(null);

  if (listEndRef.current) {
    observer.current.observe(listEndRef.current); // list의 끝부분을 알려주는 p 타겟 요소를 관찰
  }

  return (
    <>
      <div>
        <p className="bg-yellow-50 text-2xl">
          전체: {isLoadingMore ? '...' : issues.length} 페이지 호출됨
        </p>
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

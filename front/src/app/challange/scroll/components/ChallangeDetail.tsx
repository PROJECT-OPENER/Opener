'use client';

type Props = {
  title: string;
};

import React, { useRef } from 'react';

const ChallangeDetail = ({ title }: Props) => {
  // 옵션 객체
  const options = {
    // null을 설정하거나 무엇도 설정하지 않으면 브라우저 viewport가 기준이 된다.
    root: null,
    rootMargin: '3px',
    // 타겟 요소의 20%가 루트 요소와 겹치면 콜백을 실행한다.
    threshold: 0.2,
  };

  // Intersection Observer 인스턴스
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.className = 'w-full h-screen bg-yellow-300';
        // 지연 로딩이 실행되면 unobserve 해준다.
        observer.unobserve(entry.target);
      }
    });
  }, options);

  const videoRef = useRef<HTMLDivElement>(null);
  if (videoRef.current) {
    observer.observe(videoRef.current);
    console.log(videoRef.current);
  }

  return (
    <div className="w-full h-screen bg-red-300" ref={videoRef}>
      <h1 className="text-3xt">{title}</h1>
    </div>
  );
};

export default ChallangeDetail;

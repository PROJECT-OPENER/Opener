'use client';

type Props = {
  title: string;
};

import React, { useRef, useEffect, useState } from 'react';

const ChallangeDetail = ({ title }: Props) => {
  const options = {
    root: null,
    threshold: 1,
  };

  const [detailobserver, setDetailobserver] =
    useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!detailobserver) {
      const newObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio > 0.05 &&
            entry.isIntersecting &&
            colorRef.current
          ) {
            colorRef.current.className = 'w-52 h-52 bg-yellow-300';
            observer.unobserve(entry.target);
          }
        });
      }, options);
      if (videoRef.current && newObserver) {
        newObserver.observe(videoRef.current);
      }
      setDetailobserver(newObserver);
    }
  }, []);

  const colorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className=" w-52 h-52 bg-blue-300" ref={videoRef}>
        <h1 className="text-3xt">대상</h1>
      </div>
      <div className=" w-52 h-52 bg-red-300" ref={colorRef}>
        <h1 className="text-3xt">{title}</h1>
      </div>
    </div>
  );
};

export default ChallangeDetail;

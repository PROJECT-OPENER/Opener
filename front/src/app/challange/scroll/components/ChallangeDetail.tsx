'use client';

type Props = {
  title: string;
};

import React, { useRef, useEffect } from 'react';

const ChallangeDetail = ({ title }: Props) => {
  const options = {
    root: null,
    threshold: 1,
  };

  const Detailobserver = useRef<IntersectionObserver>(
    new IntersectionObserver((entries, observer) => {
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
    }, options),
  );

  useEffect(() => {
    if (videoRef.current) {
      Detailobserver.current.observe(videoRef.current);
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

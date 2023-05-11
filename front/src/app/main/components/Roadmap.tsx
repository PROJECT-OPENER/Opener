'use client';
import { getMainRoadMapApi } from '@/app/api/shadowingApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const Roadmap = () => {
  // getMainRoadMapApi
  interface dataInterface {
    videoId: string;
    engSentence: string;
    korSentence: string;
  }
  const [data, setData] = useState<dataInterface[]>();
  const getRoadmap = async () => {
    const res = await getMainRoadMapApi();
    console.log(res.themeRoadMapResponseDto.roadMapResponseDtoList);
    setData(res.themeRoadMapResponseDto.roadMapResponseDtoList);
  };
  // stepNo
  // :
  // 1
  // themeRoadMapResponseDto
  // :
  // {stepTheme: '아이브', roadMapResponseDtoList: Array(3)}
  // [[Prototype]]
  // :
  // Object
  useEffect(() => {
    getRoadmap();
  }, []);

  return (
    <section className="pb-4">
      <div className="shadow-custom rounded min-h-[160px] sm:h-[170px] lg:h-[200px] sm:px-[5rem] flex flex-col justify-around">
        {data?.map((content, index) => {
          return (
            <Link
              href={'/shadowing/learning/' + content.videoId}
              key={index}
              className="bg-red-500 inline-block                                                                        "
            >
              <p className="text-center">{content.engSentence}</p>
              <p className="text-center">{content.korSentence}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Roadmap;

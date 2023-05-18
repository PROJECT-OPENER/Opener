'use client';
import { getMainRoadMapApi } from '@/app/api/shadowingApi';
import Link from 'next/link';
import { RiCheckFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
const Roadmap = () => {
  // getMainRoadMapApi
  interface dataInterface {
    videoId: string;
    engSentence: string;
    korSentence: string;
    status_date: string | null;
  }
  const [data, setData] = useState<dataInterface[]>();
  const getRoadmap = async () => {
    const res = await getMainRoadMapApi();
    console.log(res);
    const roadmap = res.themeRoadMapResponseDto
      ? res.themeRoadMapResponseDto.roadMapResponseDtoList
      : res.authRoadMapResponseDtoList;

    // const roadmap = [
    //   {
    //     videoId: '',
    //     engSentence: 'hello world',
    //     korSentence: '안녕 세상아',
    //     status_date: null,
    //   },
    //   {
    //     videoId: '',
    //     engSentence: 'hello world',
    //     korSentence: '안녕 세상아',
    //     status_date: '2022.01.01',
    //   },
    //   {
    //     videoId: '',
    //     engSentence: 'hello world',
    //     korSentence: '안녕 세상아',
    //     status_date: null,
    //   },
    // ];
    setData(roadmap);
  };

  useEffect(() => {
    console.log('roadmap 요청');
    getRoadmap();
  }, []);

  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="shadow-custom min-h-[160px] flex flex-col lg:flex-row justify-around rounded-3xl py-5 px-2 lg:py-8 sm:px-10 bg-white">
        <p className="lg:text-xl text-center text-lg font-bold mb-3 w-full flex flex-col justify-center ">
          학습 로드맵
        </p>
        {data?.map((content, index) => {
          return (
            <Link
              href={'/shadowing/learning/' + content.videoId}
              key={index}
              className="flex flex-row lg:flex-col-reverse justify-between items-center w-full py-3 px-6 hover:bg-[#f7f7f7] rounded-xl"
            >
              <div className="lg:mt-3">
                <p className="text-start text-lg font-semibold">
                  {content.engSentence}
                </p>
                <p className="text-start text-sm">{content.korSentence}</p>
              </div>
              {content.status_date !== null &&
              content.status_date !== undefined &&
              content.status_date !== '' ? (
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#FFD600]">
                  <RiCheckFill size="1.7rem" color="#ffffff" />
                </div>
              ) : (
                <div className="w-[30px] h-[30px] rounded-full bg-[#F1F1F1]" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;

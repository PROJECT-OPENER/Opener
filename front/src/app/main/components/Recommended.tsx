'use client';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getRecommendListApi } from '@/app/api/shadowingApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
interface dataInterface {
  videoId: string;
  thumbnailUrl: string;
  engSentence: string;
  korSentence: string;
}

const Recommended = () => {
  const [data, setData] = useState<dataInterface[]>();
  const getRecommendList = async () => {
    try {
      const res = await getRecommendListApi();
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecommendList();
    console.log(data);
  }, []);

  const options = {
    wheelSpeed: 2,
    handlers: ['touch', 'click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    wheelPropagation: true,
    minScrollbarLength: 2,
  };

  return (
    <div className="mt-10">
      {/* 데스크탑 용 */}
      {/* next.config.js에서 remotePatterns안에 user-images.githubusercontent.com 삭제해야함 */}
      <div className="hidden lg:block">
        <div className="flex flex-row justify-between mb-3">
          <h1 className="text-lg">추천 문장</h1>
          <button>더 보기</button>
        </div>
        {/* <div className="hidden lg:flex flex-row justify-between w-full h-full">
          {data &&
            data?.slice(0, 3).map((content, index) => {
              return (
                <Link
                  href={'/shadowing/learning/' + content.videoId}
                  key={index}
                  className="opacity-90 hover:opacity-100 shadow-custom w-[320px] h-[300px] p-4 rounded-3xl bg-[#ffffff] hover:shadow-customhover"
                >
                  <Image
                    src={content.thumbnailUrl}
                    alt=""
                    width={288}
                    height={188}
                    className="relative rounded-xl overflow-hidden"
                  />
                  <div className="mt-4 p-1">
                    <p className="text-base font-semibold mb-1">
                      {content.engSentence}
                    </p>
                    <p className="text-sm font-light">{content.korSentence}</p>
                  </div>
                </Link>
              );
            })}
        </div> */}
      </div>

      {/* 모바일 용 */}

      {/* next.config.js에서 remotePatterns안에 user-images.githubusercontent.com 삭제해야함 */}
      <div className="lg:hidden overflow-hidden">
        <h1 className="text-lg mb-3 ml-4">추천 문장</h1>
        {/* <PerfectScrollbar options={options} className="w-full">
          <div className="flex flex-row relative w-full p-4">
            {data &&
              data?.map((content, index) => {
                return (
                  <Link
                    href={'/shadowing/learning/' + content.videoId}
                    key={index}
                    className="shadow-custom mr-4 p-3 rounded-3xl bg-[#ffffff] hover:shadow-customhover"
                  >
                    <div className="relative w-[254px]">
                      <img
                        src={content.thumbnailUrl}
                        alt=""
                        className="w-full rounded-xl"
                      />
                      <div className="mt-2 px-1">
                        <p className="text-base font-semibold mb-1">
                          {content.engSentence}
                        </p>
                        <p className="text-sm font-light">
                          {content.korSentence}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            <div>
              <button className="shadow-custom mr-2 w-[110px] h-[250px] sm:h-[285px] rounded-3xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]">
                더 보기
              </button>
            </div>
          </div>
        </PerfectScrollbar> */}
      </div>
    </div>
  );
};
export default Recommended;

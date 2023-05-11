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
    const res = await getRecommendListApi();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getRecommendList();
  }, []);

  const options = {
    wheelSpeed: 2,
    handlers: ['touch', 'click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    wheelPropagation: true,
    minScrollbarLength: 2,
  };
  return (
    <div className="pb-4 my-3">
      {/* 데스크탑 용 */}
      <div className="hidden lg:block">
        <div className="flex flex-row justify-between mb-3">
          <h1 className="text-lg">추천 문장</h1>
          <button>더 보기</button>
        </div>
        <div className="hidden lg:flex flex-row justify-between w-full h-full">
          {data?.slice(0, 3).map((content, index) => {
            return (
              <Link
                href={'/shadowing/learning/' + content.videoId}
                key={index}
                className="shadow-custom w-[320px] h-[300px] p-4 rounded-xl bg-[#ffffff] hover:bg-brandY"
              >
                {/* next.config.js에서 remotePatterns안에 user-images.githubusercontent.com 삭제해야함 */}
                <div className="relative w-full h-[calc(100%-80px)] rounded-lg overflow-hidden">
                  <Image src={content.thumbnailUrl} alt="" fill />
                </div>
                <div className="mt-4 p-1">
                  <p className="text-base font-semibold mb-1">
                    {content.engSentence}
                  </p>
                  <p className="text-sm font-light">{content.korSentence}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 모바일 용 */}
      <div className="lg:hidden">
        <h1 className="text-lg mb-3">추천 문장</h1>
        <PerfectScrollbar
          options={options}
          className="w-full h-full py-4 relative"
        >
          <div className="flex flex-row relative h-full w-[100%] min-w-[1000px]">
            {data?.map((content, index) => {
              return (
                <Link
                  href={'/shadowing/learning/' + content.videoId}
                  key={index}
                  className="shadow-custom mr-4 w-[250px] sm:w-[280px] p-3 rounded-xl bg-[#ffffff] hover:bg-brandY"
                >
                  {/* next.config.js에서 remotePatterns안에 user-images.githubusercontent.com 삭제해야함 */}
                  <div className="relative block w-full h-[calc(100%-100px)] sm:h-[calc(100%-116px)] rounded-lg overflow-hidden">
                    <Image
                      src={content.thumbnailUrl}
                      alt=""
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="mt-2 px-1">
                    <p className="text-base font-semibold mb-1">
                      {content.engSentence}
                    </p>
                    <p className="text-sm font-light">{content.korSentence}</p>
                  </div>
                </Link>
              );
            })}
            <div>
              <button className="shadow-custom mr-2 w-[110px] h-[250px] sm:h-[285px] rounded-xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]">
                더 보기
              </button>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default Recommended;

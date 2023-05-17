'use client';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getRecommendListApi } from '@/app/api/shadowingApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
interface dataInterface {
  videoId: string;
  thumbnailUrl: string | null | undefined;
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
    <div className="mt-6 lg:mt-10">
      {/* 데스크탑 용 */}
      <h1 className="text-lg lg:mb-3 ml-4 font-bold">추천 문장</h1>
      <div className="relative">
        <div className="p_scrollbar_right" />
        <PerfectScrollbar options={options} className="w-full">
          <div className="flex flex-row relative w-[calc(100%+100px)] p-4">
            {data?.map((content, index) => {
              return (
                <Link
                  href={'/shadowing/learning/' + content.videoId}
                  key={index}
                  className="shadow-custom mr-4 p-3 rounded-3xl bg-[#ffffff] hover:shadow-customhover"
                >
                  {/* next.config.js에서 remotePatterns안에 user-images.githubusercontent.com 삭제해야함 */}
                  <div className="w-[254px]">
                    {content.thumbnailUrl ? (
                      <Image
                        src={content.thumbnailUrl}
                        alt=""
                        fill
                        className="rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-[188px] rounded-xl bg-brandY" />
                    )}
                    <div className="mt-2 px-1 lg:mt-4 lg:p-1">
                      <p className="text-base font-semibold mb-1 lg:text-base lg:font-semibold lg:mb-1">
                        {content.engSentence}
                      </p>
                      <p className="text-sm font-light lg:text-sm lg:font-light">
                        {content.korSentence}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
            <div>
              <button className="shadow-custom mr-10 w-[110px] h-[250px] sm:h-[285px] rounded-3xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]">
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

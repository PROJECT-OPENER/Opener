import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getRecommendListApi } from '@/app/api/shadowingApi';

interface dataInterface {
  videoId: string;
  thumbnailUrl: string | null | undefined;
  engSentence: string;
  korSentence: string;
}

const RecommendData = () => {
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

  const router = useRouter();
  console.log(data);

  return (
    <div className="flex flex-row relative w-[calc(100%+100px)] p-4">
      {data?.map((content: dataInterface, index: number) => {
        return (
          <Link
            href={'/shadowing/learning/' + content.videoId}
            key={index}
            className="shadow-custom mr-4 p-3 rounded-3xl bg-[#ffffff] hover:shadow-customhover"
          >
            {/* next.config.js에서 remotePatterns안에 user-images.githubusercontent.com 삭제해야함 */}
            <div className="w-[254px] h-[188px]">
              {content.thumbnailUrl ? (
                <Image
                  src={content.thumbnailUrl}
                  alt=""
                  width={500}
                  height={500}
                  className="rounded-xl w-full h-full"
                />
              ) : (
                <div className="w-full h-[188px] rounded-xl bg-brandY" />
              )}
            </div>
            <div className="mt-2 p-1 lg:mt-4 lg:p-1">
              <p className="text-base font-semibold mb-1 lg:text-base lg:font-semibold lg:mb-1">
                {content.engSentence}
              </p>
              <p className="text-sm font-light lg:text-sm lg:font-light">
                {content.korSentence}
              </p>
            </div>
          </Link>
        );
      })}
      <div>
        <button
          onClick={() => {
            router.push('/shadowing');
          }}
          className="shadow-custom mr-10 w-[110px] h-full rounded-3xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]"
        >
          더 보기
        </button>
      </div>
    </div>
  );
};

export default RecommendData;

export async function fetchData() {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${BASE_URL}shadowing-service/main-recommendation`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data.data;
}

import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { use } from 'react';

interface dataInterface {
  videoId: string;
  thumbnailUrl: string | null | undefined;
  engSentence: string;
  korSentence: string;
}

const RecommendData = () => {
  const data = use(fetchData());
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
  );
};

export default RecommendData;

export async function fetchData() {
  const session = await getSession();
  const accessToken = session?.user.user?.accessToken;

  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${BASE_URL}shadowing-service/main-recommendation`, {
    next: { revalidate: 10 },
    headers: {
      Authorization: `${accessToken ? `Bearer ${accessToken}` : null}`,
    },
  });
  const data = await res.json();
  return data.data;
}

import Image from 'next/image';
import Link from 'next/link';
import React, { use } from 'react';
import { AiFillHeart } from 'react-icons/ai';

const FamousData = () => {
  const data = use(fetchData('LIKE', 0, 5));
  return (
    <div className="flex flex-row relative h-full w-full justify-between">
      {data.memberChallengeList.map((content: any, index: number) => {
        return (
          <Link key={index} href={`/challenge/scroll/LIKE/${index}`}>
            <div className="lg:mr-0 mr-2 relative shadow-custom w-[110px] sm:w-[137.5px] h-full sm:h-[200px] rounded-3xl bg-brandP flex justify-center items-center lg:w-[155px] lg:h-[225.5px] overflow-hidden">
              <Image
                src={content.memberChallengeImg}
                alt=""
                width={500}
                height={500}
              />
              <div className="absolute inset-x-0 bottom-2 left-3 h-8 flex text-white items-center">
                <AiFillHeart size={'1.4rem'} className="fill-white mr-2" />
                <p>{content.likeCount}</p>
              </div>
            </div>
          </Link>
        );
      })}
      <Link className="lg:hidden" href={`/challenge/all`}>
        <button className="shadow-custom mr-10 w-[110px] h-[160px] sm:h-[200px] rounded-3xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]">
          더 보기
        </button>
      </Link>
    </div>
  );
};

export default FamousData;

export async function fetchData(
  category: string,
  startIndex: number,
  endIndex: number,
) {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(
    `${BASE_URL}challenge-service/member-challenges?category=${category}&startIndex=${startIndex}&endIndex=${endIndex}`,
    {
      next: { revalidate: 10 },
    },
  );
  const data = await res.json();
  return data.data;
}

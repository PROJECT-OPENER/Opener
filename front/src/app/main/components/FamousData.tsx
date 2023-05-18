import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { allChallengeApi } from '@/app/api/challengeApi';
import { memberChallenge } from '@/types/share';

const FamousData = () => {
  const [contents, setContents] = useState<memberChallenge[]>([]);

  useEffect(() => {
    const getContent = async () => {
      const response = await allChallengeApi('LIKE', 0, 5);
      console.log(response);
      setContents(response.memberChallengeList);
    };
    getContent();
  }, []);

  // const data = use(fetchData('LIKE', 0, 5));
  return (
    <div className="flex flex-row relative justify-between p-4">
      {contents.map((content: any, index: number) => {
        return (
          <Link
            key={index}
            href={`/challenge/scroll/LIKE/${index}`}
            className="shadow-custom lg:mr-0 mr-2  bg-[#4b4b4b] rounded-3xl"
          >
            <div className="relative w-[110px] h-[195.5px] sm:w-[130px] sm:h-[230px] lg:w-[155px] lg:h-[275.5px] overflow-hidden rounded-3xl">
              <Image
                src={content.memberChallengeImg}
                alt=""
                width={360}
                height={640}
              />
              <div className="absolute inset-x-0 bottom-2 left-3 h-8 flex text-white items-center">
                <AiFillHeart size={'1.4rem'} className="fill-white mr-2" />
                <p>{content.likeCount}</p>
              </div>
            </div>
          </Link>
        );
      })}
      {/* <Link className="lg:hidden" href={`/challenge/all`}>
        <button className="shadow-custom mr-10 w-[110px] h-[195.5px] sm:w-[130px] sm:h-[230px] lg:w-[155px] lg:h-[275.5px] rounded-3xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]">
          더 보기
        </button>
      </Link> */}
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

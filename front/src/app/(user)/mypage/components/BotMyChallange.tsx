import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineHeart } from 'react-icons/ai';
import { fetcher } from '@/app/api/userApi';
import useSWRInfinite from 'swr/infinite';
import { useEffect } from 'react';

const BotMyChallange = () => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달
    console.log(pageIndex);
    return `/auth/members/mypage/challenge?page=${pageIndex}&size=10`; // SWR 키
  };

  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite(getKey, fetcher);

  if (!data) return 'loading';
  const datas = data ? [].concat(...data) : [];

  return (
    <>
      <div className="grid gap-6 grid-cols-3 lg:grid-cols-4">
        {datas?.map((content: any, index: number) => {
          return (
            <Link
              href={'/challenge/p/' + content.memberChallengeId}
              key={index}
              className="relative aspect-[7.25/10] overflow-hidden rounded-lg"
            >
              <span className="absolute bottom-0 left-0 ml-3 mb-3 z-20 flex flex-row items-center text-white text-xl leading-5 ">
                <AiOutlineHeart
                  color="#ffffff"
                  className="mr-2"
                  size={'1.5rem'}
                />
                {content.likeCount}
              </span>
              <Image
                className="w-full h-full absolute inset-0 object-cover hover:opacity-90"
                src={content.memberChallengeImg}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
              />
            </Link>
          );
        })}
      </div>
      <button
        onClick={() => setSize(size + 1)}
        className="border border-[#e3e3e3] p-3 w-full my-6 bg-[#f0f0f0] active:bg-[#f0f0f0] hover:bg-white hover:shadow-custom rounded-xl"
      >
        load more
      </button>
    </>
  );
};

export default BotMyChallange;

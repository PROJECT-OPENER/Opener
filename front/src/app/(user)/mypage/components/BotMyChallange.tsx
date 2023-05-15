import React, { useEffect, useState } from 'react';
import { getMyChallengesApi } from '@/app/api/challengeApi';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineHeart } from 'react-icons/ai';
const BotMyChallange = () => {
  const [data, setData] = useState<any>();
  const getMyChallenges = async () => {
    const res = await getMyChallengesApi();
    setData(res);
  };
  useEffect(() => {
    getMyChallenges();
  }, []);

  //   likeCount
  // :
  // 0
  // memberChallengeDate
  // :
  // "2023-05-11T06:02:49"
  // memberChallengeId
  // :
  // 17
  // memberChallengeImg

  return (
    <div className="grid gap-6 grid-cols-3 lg:grid-cols-4">
      {data?.map((content: any, index: number) => {
        return (
          <Link
            href={'/challenge/' + content.memberChallengeId}
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
  );
};

export default BotMyChallange;

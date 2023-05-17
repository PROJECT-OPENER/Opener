import React from 'react';
import { memberChallenge } from '@/types/share';
import Link from 'next/link';
import { AiFillHeart, AiOutlineCamera } from 'react-icons/ai';

type Props = {
  memberChallengeResponseDtoList: memberChallenge[];
  totalLength: number;
  originalId: number;
};

const VoiceChallengeCard = ({
  memberChallengeResponseDtoList,
  totalLength,
  originalId,
}: Props) => {
  return (
    <div className="">
      {totalLength == 0 && (
        <div className="flex justify-center m-10">
          <p className="font-extralight text-xl">챌린지가 없습니다..</p>
        </div>
      )}
      <div className="relative">
        <div className="grid grid-cols-3 gap-4 my-16">
          {memberChallengeResponseDtoList?.map((memberChallenge, index) => (
            <div
              className="flex justify-center items-center w-[100%] h-[100%]"
              key={memberChallenge.memberChallengeId}
            >
              <Link
                href={`challenge/scroll/${originalId}/${index}`}
                className="relative rounded-lg w-full h-full bg-black flex justify-center items-center overflow-hidden"
              >
                <img
                  className="w-auto h-auto relative shadow-xl"
                  src={memberChallenge.memberChallengeImg}
                  alt=""
                />
                <div className="absolute inset-x-0 bottom-0 left-0 h-8 ml-2 flex text-white items-center">
                  <AiFillHeart
                    size={'1rem'}
                    className="fill-white mr-2"
                    style={{
                      filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                    }}
                  />
                  <p>{memberChallenge.likeCount}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceChallengeCard;

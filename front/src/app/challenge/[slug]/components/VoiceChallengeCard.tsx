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
      <div className="relative bg-white">
        <div className="grid grid-cols-3 gap-4 my-16 ">
          {memberChallengeResponseDtoList?.map((memberChallenge, index) => (
            <div
              className="flex justify-center items-center w-[100%] h-[100%] "
              key={memberChallenge.memberChallengeId}
            >
              <Link
                href={`challenge/scroll/${originalId}/${index}`}
                className="relative block rounded-lg w-full h-full"
              >
                <img
                  className="w-full h-full rounded-lg relative shadow-xl"
                  src={memberChallenge.memberChallengeImg}
                  alt=""
                />
                <div className="absolute inset-x-0 bottom-0 left-0 h-8 ml-2 flex text-white">
                  <AiFillHeart
                    size={'2rem'}
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
          {/* <div className="bg-slate-300 sm:fixed bottom-20">
            <Link
              href={`challenge/shooting/${originalId}`}
              className="bg-[#F0F0F0] w-48 py-3 px-7 rounded-xl flex justify-center shadow-sm"
            >
              <AiOutlineCamera size={'1.5rem'} className="fill-black mr-2" />
              <p className="text-lg font-bold">참여하기</p>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VoiceChallengeCard;

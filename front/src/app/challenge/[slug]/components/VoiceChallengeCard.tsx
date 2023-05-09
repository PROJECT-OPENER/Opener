import React from 'react';
import { memberChallenge } from '@/types/share';

type Props = {
  memberChallengeResponseDtoList: memberChallenge[];
  totalLength: number;
};

const VoiceChallengeCard = ({
  memberChallengeResponseDtoList,
  totalLength,
}: Props) => {
  return (
    <>
      {totalLength == 0 && (
        <div className="flex justify-center m-10">
          <p className="font-extralight text-xl">챌린지가 없습니다..</p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 my-16">
        {memberChallengeResponseDtoList?.map((memberChallenge) => (
          <div className="relative" key={memberChallenge.memberChallengeId}>
            <img
              className="bg-gray-200  h-48 w-32 rounded-lg"
              src={memberChallenge.memberChallengeImg}
              alt=""
            />
            <div className="absolute inset-x-0 bottom-0 h-8 ml-2 flex text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <p>{memberChallenge.likeCount}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VoiceChallengeCard;
import React from 'react';
import ChallengeCard from './components/ChallengeCard';
import Button from '@/app/components/Button';
const page = () => {
  return (
    <>
      <div className="m-16">
        <div className="my-14">
          <Button
            type="button"
            text="좋아요순"
            className=" bg-brandP w-32 text-white rounded-xl shadow-xl py-3"
          />
          <Button
            type="button"
            text="최신순"
            className="ml-4 bg-white w-32 text-black rounded-xl shadow-xl py-3"
          />
        </div>
        <ChallengeCard />
      </div>
    </>
  );
};

export default page;

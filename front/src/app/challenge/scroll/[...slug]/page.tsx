import React from 'react';
import ChallengeList from './components/ChallengeList';
type Props = {
  params: {
    slug: number[];
  };
};

const Page = ({ params }: Props) => {
  return (
    <div>
      <ChallengeList
        originalId={params.slug[0]}
        startIdx={params.slug[1]}
      ></ChallengeList>
    </div>
  );
};

export default Page;

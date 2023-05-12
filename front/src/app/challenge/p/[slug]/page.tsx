import React from 'react';
import SingleChallengeView from './components/SingleChallengeView';
type Props = {
  params: {
    slug: number;
  };
};

const page = ({ params }: Props) => {
  return (
    <div className="">
      <SingleChallengeView challengeId={params.slug}></SingleChallengeView>
    </div>
  );
};

export default page;

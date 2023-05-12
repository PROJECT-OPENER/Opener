import React from 'react';
import ChallengeList from './components/ChallengeList';
import ChallengeCategoryList from './components/ChallengeCategoryList';
type Props = {
  params: {
    slug: string[];
  };
};

const Page = ({ params }: Props) => {
  const [param, startIdx] = params.slug;
  return (
    <div>
      {param.length < 4 && (
        <div>
          <ChallengeList
            originalId={param}
            startIdx={parseInt(startIdx)}
          ></ChallengeList>
        </div>
      )}
      {param.length >= 4 && (
        <div>
          <ChallengeCategoryList
            category={param}
            startIdx={parseInt(startIdx)}
          ></ChallengeCategoryList>
        </div>
      )}
    </div>
  );
};

export default Page;

type Props = {
  params: {
    slug: string;
  };
};

import ChallengeCard from './components/ChallengeCard';
import VoiceInfo from './components/VoiceInfo';

const page = ({ params }: Props) => {
  return (
    <>
      <div>
        <VoiceInfo voiceId={params.slug}></VoiceInfo>
        <ChallengeCard></ChallengeCard>
      </div>
    </>
  );
};

export default page;

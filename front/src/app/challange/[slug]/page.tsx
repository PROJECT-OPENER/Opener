type Props = {
  params: {
    slug: string;
  };
};

import ChallangeCard from './components/ChallangeCard';
import VoiceInfo from './components/VoiceInfo';

const page = ({ params }: Props) => {
  return (
    <>
      <div>
        <VoiceInfo voiceId={params.slug}></VoiceInfo>
        <ChallangeCard></ChallangeCard>
      </div>
    </>
  );
};

export default page;

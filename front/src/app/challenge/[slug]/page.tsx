type Props = {
  params: {
    slug: number;
  };
};
import ChallengeInfo from './components/ChallengeInfo';

const page = ({ params }: Props) => {
  return (
    <div className="flex justify-center">
      <ChallengeInfo voiceId={params.slug}></ChallengeInfo>
    </div>
  );
};

export default page;

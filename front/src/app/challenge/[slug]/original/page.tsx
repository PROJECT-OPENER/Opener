type Props = {
  params: {
    slug: number;
  };
};

import OriginalVideo from './components/OriginalVideo';

const page = ({ params }: Props) => {
  return (
    <div className="flex justify-center">
      <OriginalVideo challengeId={params.slug}></OriginalVideo>
    </div>
  );
};

export default page;

import AiChatComp from './components/AiChatComp';
import AiChatNav from './components/AiChatNav';

type Props = {
  params: {
    slug: string;
  };
};
const page = ({ params }: Props) => {
  return (
    <div>
      <AiChatNav />
      <AiChatComp />
    </div>
  );
};

export default page;

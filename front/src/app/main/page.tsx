import Famous from '@/app/main/components/Famous';
import Recommended from '@/app/main/components/Recommended';
import Roadmap from '@/app/main/components/Roadmap';
// import Main from '@/app/three/intro/page';
import Rank from './components/Rank';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Main = dynamic(() => import('@/app/three/intro/page'), {
  loading: () => (
    <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[500px] min-w-[330px] max-w-[1024px]">
      <Image
        src="https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/66017c43-7c15-4bc7-8292-77042914ae42.lazyMain.png"
        alt="main"
        height={500}
        width={500}
        className="h-full w-full"
      />
    </div>
  ),
});

const Home = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex flex-col items-center lg:pb-10">
      <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[500px] min-w-[330px] max-w-[1024px]">
        <Main />
      </div>
      <div className="relative w-full h-full min-w-[330px] max-w-[1024px] pb-4 lg:p-0">
        <Roadmap />
        <Famous />
        <Recommended />
        <Rank />
      </div>
      <div className="blankbox lg:hidden" />
    </div>
  );
};

export default Home;

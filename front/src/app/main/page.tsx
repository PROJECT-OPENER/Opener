import Famous from '@/app/main/components/Famous';
import Recommended from '@/app/main/components/Recommended';
import Roadmap from '@/app/main/components/Roadmap';
import Main from '@/app/three/intro/page';
const Home = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex flex-col items-center">
      <div className="relative w-full h-full min-w-[330px] max-w-[1024px]">
        <Main />
      </div>
      <div className="relative w-full h-full min-w-[330px] max-w-[1024px] px-4">
        {/* <Roadmap /> */}
        <Famous />
        <Recommended />
      </div>
    </div>
  );
};

export default Home;

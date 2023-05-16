import Famous from '@/app/main/components/Famous';
import Recommended from '@/app/main/components/Recommended';
import Roadmap from '@/app/main/components/Roadmap';
import Main from '@/app/three/intro/page';
const Home = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex flex-col items-center lg:pb-10">
      <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[500px] min-w-[330px] max-w-[1024px]">
        {/* <Main /> */}
      </div>
      <div className="relative w-full h-full min-w-[330px] max-w-[1024px]">
        <Roadmap />
        <Famous />
        <Recommended />
      </div>
      <div className="blankbox lg:hidden" />
    </div>
  );
};

export default Home;

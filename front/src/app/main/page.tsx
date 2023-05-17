import Famous from '@/app/main/components/Famous';
import Recommended from '@/app/main/components/Recommended';
import Roadmap from '@/app/main/components/Roadmap';
import Main from '@/app/three/intro/page';
import Rank from './components/Rank';
import { rankInterface } from '@/types/share';
import { use } from 'react';
const Home = () => {
  const ranks = use(fetchData());
  return (
    <div className="absolute top-0 left-0 w-full flex flex-col items-center lg:pb-10">
      <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[500px] min-w-[330px] max-w-[1024px]">
        <Main />
      </div>
      <div className="relative w-full h-full min-w-[330px] max-w-[1024px] pb-4 lg:p-0">
        <Roadmap />
        <Famous />
        <Recommended />
        <Rank rank={ranks.data} />
      </div>
      <div className="blankbox lg:hidden" />
    </div>
  );
};

export default Home;

export async function fetchData() {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${BASE_URL}member-service/members/rank`);
  const data = await res.json();
  return data;
}

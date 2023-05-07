import Famous from '@/app/main/components/Famous';
import Recommended from '@/app/main/components/Recommended';
import Roadmap from '@/app/main/components/Roadmap';
const Home = () => {
  return (
    <div className="px-4 pt-4">
      <Roadmap />
      <Famous />
      <Recommended />
    </div>
  );
};

export default Home;

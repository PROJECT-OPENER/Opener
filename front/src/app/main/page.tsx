import Famous from '@/app/main/components/Famous';
import Recommended from '@/app/main/components/Recommended';
const Home = () => {
  return (
    <div className="px-4 pt-4">
      <section className="pb-4">
        <div className="shadow-custom rounded-xl h-[150px] sm:h-[170px] lg:h-[200px]">
          <p className="text-center">RoadMap</p>
        </div>
      </section>
      <Famous />
      <Recommended />
    </div>
  );
};

export default Home;

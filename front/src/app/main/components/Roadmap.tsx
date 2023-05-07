import { getMainRoadMapApi } from '@/app/api/shadowingApi';
const Roadmap = () => {
  // getMainRoadMapApi
  const getRoadmap = async () => {
    const res = await getMainRoadMapApi();
    console.log(res);
  };
  getRoadmap();
  return (
    <section className="pb-4">
      <div className="shadow-custom rounded-xl h-[150px] sm:h-[170px] lg:h-[200px]">
        <p className="text-center">RoadMap</p>
      </div>
    </section>
  );
};

export default Roadmap;

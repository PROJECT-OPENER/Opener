'use client';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getRecommendListApi } from '@/app/api/shadowingApi';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import RecommendData from './RecommendData';
interface dataInterface {
  videoId: string;
  thumbnailUrl: string | null | undefined;
  engSentence: string;
  korSentence: string;
}

const Recommended = () => {
  // const [data, setData] = useState<dataInterface[]>();
  // const getRecommendList = async () => {
  //   try {
  //     const res = await getRecommendListApi();
  //     console.log(res.data);
  //     setData(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getRecommendList();
  //   console.log(data);
  // }, []);

  const options = {
    wheelSpeed: 2,
    handlers: ['touch', 'click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    wheelPropagation: true,
    minScrollbarLength: 2,
  };

  return (
    <div className="mt-6 lg:mt-10">
      {/* 데스크탑 용 */}
      <h1 className="text-lg lg:mb-3 ml-4 font-bold">추천 문장</h1>
      <div className="relative">
        <div className="p_scrollbar_right" />
        <PerfectScrollbar options={options} className="w-full">
          <RecommendData />
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default Recommended;

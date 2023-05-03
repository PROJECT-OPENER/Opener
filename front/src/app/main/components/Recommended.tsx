'use client';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const contents = {
  memberChallengeList: [
    {
      memberChallengeId: '', // 멤버챌린지 id
      memberChallengeImg: '', // 멤버챌린지 썸네일
      likeCount: 5, // int
    },
    {
      memberChallengeId: '', // 멤버챌린지 id
      memberChallengeImg: '', // 멤버챌린지 썸네일
      likeCount: 5, // int
    },
    {
      memberChallengeId: '', // 멤버챌린지 id
      memberChallengeImg: '', // 멤버챌린지 썸네일
      likeCount: 5, // int
    },
    {
      memberChallengeId: '', // 멤버챌린지 id
      memberChallengeImg: '', // 멤버챌린지 썸네일
      likeCount: 5, // int
    },
    {
      memberChallengeId: '', // 멤버챌린지 id
      memberChallengeImg: '', // 멤버챌린지 썸네일
      likeCount: 5, // int
    },
  ],
};

const Recommended = () => {
  const option = {
    wheelSpeed: 2,
    handlers: ['touch', 'click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    wheelPropagation: true,
    minScrollbarLength: 2,
  };
  return (
    <div className="pb-4 my-3">
      {/* 데스크탑 용 */}
      <div className="hidden lg:block">
        <div className="flex flex-row justify-between mb-3">
          <h1 className="text-lg">추천 문장</h1>
          <button>더 보기</button>
        </div>
        <div className="hidden lg:flex flex-row justify-around w-full h-full">
          {contents.memberChallengeList.slice(0, 3).map((content, index) => {
            return (
              <div
                key={index}
                className="shadow-custom w-[320px] h-[230px] rounded-xl bg-brandY"
              ></div>
            );
          })}
        </div>
      </div>

      {/* 모바일 용 */}
      <div className="lg:hidden">
        <h1 className="text-lg mb-3">추천 문장</h1>
        <PerfectScrollbar option={option} className="w-full h-full py-4">
          <div className="flex flex-row relative h-full w-full">
            {contents.memberChallengeList.map((content, index) => {
              return (
                <div key={index}>
                  <div className="shadow-custom mr-2 w-[260px] sm:w-[300px] h-[180px] sm:h-[210px] rounded-xl bg-brandY"></div>
                </div>
              );
            })}
            <div>
              <button className="shadow-custom mr-2 w-[110px] h-[180px] sm:h-[210px] rounded-xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]">
                더 보기
              </button>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default Recommended;

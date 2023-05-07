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

const Famous = () => {
  const option = {
    wheelSpeed: 2,
    handlers: ['touch', 'click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    wheelPropagation: true,
    minScrollbarLength: 2,
  };
  return (
    <div className="pb-4 overflow-hidden my-3">
      {/* 데스크탑 용 */}
      <div className="hidden lg:block">
        <div className="flex flex-row justify-between mb-3">
          <h1 className="text-lg">인기 챌린지</h1>
          <button>더 보기</button>
        </div>
        <div className="hidden lg:flex flex-row justify-between w-full h-full">
          {contents.memberChallengeList.slice(0, 6).map((content, index) => {
            return (
              <div
                key={index}
                className="shadow-custom w-[155px] h-[225.5px] rounded-xl bg-brandP"
              ></div>
            );
          })}
        </div>
      </div>

      {/* 모바일 용 */}
      <div className="lg:hidden">
        <h1 className="text-lg mb-3">인기 챌린지</h1>
        <PerfectScrollbar option={option} className="w-full h-full py-4">
          <div className="flex flex-row relative h-full w-full">
            {contents.memberChallengeList.map((content, index) => {
              return (
                <div key={index}>
                  <div className="shadow-custom mr-2 w-[110px] sm:w-[137.5px] h-[160px] sm:h-[200px] rounded-xl bg-brandP"></div>
                </div>
              );
            })}
            <div>
              <button className="shadow-custom mr-2 w-[110px] h-[160px] sm:h-[200px] rounded-xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]">
                더 보기
              </button>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default Famous;

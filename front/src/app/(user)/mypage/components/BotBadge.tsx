import React, { useEffect, useState } from 'react';
import { getMyBadgesApi } from '@/app/api/userApi';
const BotBadge = () => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const getMyBadges = async () => {
      const res = await getMyBadgesApi();
      console.log(res.data.data);
      setData(res.data.data);
    };
    getMyBadges();
  }, []);

  //   attendanceBadge
  // :
  // {level: 1, score: 1}
  // challengeBadge
  // :
  // {level: 1, score: 1}
  // gameBadge
  // :
  // {level: 3, score: 16}
  // shadowingBadge
  // :
  // {level: 5, score: 20}
  return (
    <div>
      {data ? (
        <>
          <p>출석관련 뱃지 레벨 : {data.attendanceBadge.level}</p>
          <p>출석관련 뱃지 점수 : {data.attendanceBadge.score}</p>
          <p>챌린지 관련 뱃지 레벨 : {data.challengeBadge.level}</p>
          <p>챌린지 관련 뱃지 점수 : {data.challengeBadge.score}</p>
          <p>게임 관련 뱃지 레벨 : {data.gameBadge.level}</p>
          <p>게임 관련 뱃지 점수 : {data.gameBadge.score}</p>
          <p>쉐도잉 관련 뱃지 레벨 : {data.shadowingBadge.level}</p>
          <p>쉐도잉 관련 뱃지 점수 : {data.shadowingBadge.score}</p>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default BotBadge;

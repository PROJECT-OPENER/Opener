'use client';
import Step from './components/Step';
import React, { useEffect, useState, useRef } from 'react';
import { getRoadMapApi } from '../api/shadowingApi';
import { stepInterface } from '@/types/share';

const page = () => {
  const [data, setData] = useState<stepInterface[] | undefined>();
  const unlockedRef = useRef({
    step: 1,
    theme: null,
  });
  const getRoadmap = async () => {
    const res = await getRoadMapApi();
    let flag = false;
    for (const step of res) {
      const stepList = step.themeRoadMapResponseDtoList
        ? step.themeRoadMapResponseDtoList
        : step.authThemeRoadMapResponseDtoList;
      for (const theme of stepList) {
        let isCompleted = true;
        const themeList = theme.roadMapResponseDtoList
          ? theme.roadMapResponseDtoList
          : theme.authRoadMapResponseDtoList;
        if (unlockedRef.current.theme === null) {
          unlockedRef.current.theme = theme.stepTheme;
        }
        for (const sentence of themeList) {
          if (
            sentence.statusDate === null &&
            sentence.statusDate === undefined
          ) {
            isCompleted = false;
          }
          if (isCompleted) {
            unlockedRef.current.theme = theme.stepTheme;
            unlockedRef.current.step = step.stepNo;
            flag = true;
            break;
          }
        }
        if (flag) {
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    setData(res);
  };
  useEffect(() => {
    getRoadmap();
  }, []);

  return (
    <div className="inner-content">
      {data?.map((step: stepInterface, index: number) => {
        return <Step data={step} key={index} unlocked={unlockedRef.current} />;
      })}
    </div>
  );
};

export default page;

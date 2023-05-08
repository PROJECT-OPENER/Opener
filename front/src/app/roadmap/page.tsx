'use client';
import Step from './components/Step';
import React, { useEffect, useState } from 'react';
import { getRoadMapApi } from '../api/shadowingApi';
import { stepInterface } from '@/types/share';
// const data = [
//   {
//     step_no: '1',
//     list: [
//       {
//         step_theme: '가벼운 인사말',
//         list: [
//           {
//             video_id: '0',
//             eng_sentence: 'Hello, world',
//             kor_sentence: '안녕, 세상아',
//             step_theme: '가벼운 인사말',
//             sentence_no: '1',
//             status_date: '12',
//           },
//           {
//             video_id: '0',
//             eng_sentence: 'Hello, world',
//             kor_sentence: '안녕, 세상아',
//             step_theme: '가벼운 인사말',
//             sentence_no: '2',
//             status_date: '',
//           },
//           {
//             video_id: '0',
//             eng_sentence: 'Hello, world',
//             kor_sentence: '안녕, 세상아',
//             step_theme: '가벼운 인사말',
//             sentence_no: '3',
//             status_date: '',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     step_no: '2',
//     list: [
//       {
//         step_theme: '가벼운 인사말',
//         list: [
//           {
//             video_id: '0',
//             eng_sentence: 'Hello, world',
//             kor_sentence: '안녕, 세상아',
//             step_theme: '가벼운 인사말',
//             sentence_no: '1',
//             status_date: '',
//           },
//           {
//             video_id: '0',
//             eng_sentence: 'Hello, world',
//             kor_sentence: '안녕, 세상아',
//             step_theme: '가벼운 인사말',
//             sentence_no: '2',
//             status_date: '',
//           },
//           {
//             video_id: '0',
//             eng_sentence: 'Hello, world',
//             kor_sentence: '안녕, 세상아',
//             step_theme: '가벼운 인사말',
//             sentence_no: '3',
//             status_date: '',
//           },
//         ],
//       },
//       {
//         step_theme: '가벼운 인사말22',
//         list: [
//           {
//             video_id: '0',
//             eng_sentence: 'Hello, world',
//             kor_sentence: '안녕, 세상아',
//             step_theme: '가벼운 인사말',
//             sentence_no: '1',
//             status_date: '',
//           },
//           {
//             video_id: '0',
//             eng_sentence: 'Hello, world',
//             kor_sentence: '안녕, 세상아',
//             step_theme: '가벼운 인사말',
//             sentence_no: '2',
//             status_date: '',
//           },
//           {
//             video_id: '0',
//             eng_sentence: 'Hello, world',
//             kor_sentence: '안녕, 세상아',
//             step_theme: '가벼운 인사말',
//             sentence_no: '3',
//             status_date: '',
//           },
//         ],
//       },
//     ],
//   },
// ];

const page = () => {
  const [data, setData] = useState<stepInterface[] | undefined>();
  const getRoadmap = async () => {
    const res = await getRoadMapApi();
    setData(res);
  };
  useEffect(() => {
    getRoadmap();
  }, []);
  return (
    <div className="inner-content">
      {data?.map((step: stepInterface, index: number) => {
        return <Step data={step} key={index} />;
      })}
    </div>
  );
};

export default page;

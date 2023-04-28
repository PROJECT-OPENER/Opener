import Step from './components/Step';
import React from 'react';
const data = [
  {
    step_no: '1',
    list: [
      {
        step_theme: '가벼운 인사말',
        list: [
          {
            video_id: '0',
            eng_sentence: 'Hello, world',
            kor_sentence: '안녕, 세상아',
            step_theme: '가벼운 인사말',
            sentence_no: '1',
            status_date: '12',
          },
          {
            video_id: '0',
            eng_sentence: 'Hello, world',
            kor_sentence: '안녕, 세상아',
            step_theme: '가벼운 인사말',
            sentence_no: '2',
            status_date: '',
          },
          {
            video_id: '0',
            eng_sentence: 'Hello, world',
            kor_sentence: '안녕, 세상아',
            step_theme: '가벼운 인사말',
            sentence_no: '3',
            status_date: '',
          },
        ],
      },
    ],
  },
  {
    step_no: '2',
    list: [
      {
        step_theme: '가벼운 인사말',
        list: [
          {
            video_id: '0',
            eng_sentence: 'Hello, world',
            kor_sentence: '안녕, 세상아',
            step_theme: '가벼운 인사말',
            sentence_no: '1',
            status_date: '',
          },
          {
            video_id: '0',
            eng_sentence: 'Hello, world',
            kor_sentence: '안녕, 세상아',
            step_theme: '가벼운 인사말',
            sentence_no: '2',
            status_date: '',
          },
          {
            video_id: '0',
            eng_sentence: 'Hello, world',
            kor_sentence: '안녕, 세상아',
            step_theme: '가벼운 인사말',
            sentence_no: '3',
            status_date: '',
          },
        ],
      },
      {
        step_theme: '가벼운 인사말22',
        list: [
          {
            video_id: '0',
            eng_sentence: 'Hello, world',
            kor_sentence: '안녕, 세상아',
            step_theme: '가벼운 인사말',
            sentence_no: '1',
            status_date: '',
          },
          {
            video_id: '0',
            eng_sentence: 'Hello, world',
            kor_sentence: '안녕, 세상아',
            step_theme: '가벼운 인사말',
            sentence_no: '2',
            status_date: '',
          },
          {
            video_id: '0',
            eng_sentence: 'Hello, world',
            kor_sentence: '안녕, 세상아',
            step_theme: '가벼운 인사말',
            sentence_no: '3',
            status_date: '',
          },
        ],
      },
    ],
  },
];

const page = () => {
  return (
    <div className="inner-content">
      {data.map((step, index) => {
        return <Step data={step} key={index} />;
      })}
    </div>
  );
};

export default page;

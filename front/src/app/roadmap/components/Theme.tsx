import Sentence from './Sentence';

type sentenceType = {
  video_id: string;
  eng_sentence: string;
  kor_sentence: string;
  step_theme: string;
  sentence_no: string;
  status_date: string;
};

type themeType = {
  data: {
    step_theme: string;
    list: sentenceType[];
  };
};

import { BiLockOpenAlt, BiLockAlt } from 'react-icons/bi';
const Theme = (props: themeType) => {
  const themes = props.data;
  let isLocked = true;
  for (let i = 0; i < themes.list.length; i++) {
    if (themes.list[i].status_date !== '' || themes.list[i].status_date) {
      isLocked = false;
      break;
    }
  }
  return (
    <div className="flex flex-row">
      <div className="w-[50px] flex flex-col items-center">
        {isLocked ? (
          <div className="h-[26px] w-[26px] m-[12px] rounded-full flex justify-center items-center bg-[#6713D4]">
            <BiLockAlt color="#fff" />
          </div>
        ) : (
          <div className="h-[26px] w-[26px] m-[12px] rounded-full flex justify-center items-center border-2 border-[#4b4b4b]">
            <BiLockOpenAlt color="#4b4b4b" />
          </div>
        )}

        <div className="h-[calc(100%-50px)] w-[3px] bg-[#F0F0F0] rounded"></div>
      </div>
      <div className="w-[calc(100%-60px)]">
        <p className="text-lg mb-5 mt-[12px] pl-2">{themes.step_theme}</p>
        {themes.list.map((sentence, index) => {
          return <Sentence data={sentence} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Theme;

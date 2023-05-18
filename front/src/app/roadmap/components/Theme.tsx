import { themeInterface } from '@/types/share';
import Sentence from './Sentence';
import { BiLockAlt } from 'react-icons/bi';

const Theme = ({
  data,
  step,
  unlocked,
}: {
  data: themeInterface;
  step: number;
  unlocked: any;
}) => {
  const themeList = data.roadMapResponseDtoList
    ? data.roadMapResponseDtoList
    : data.authRoadMapResponseDtoList;

  let isLocked = true;
  const blankSentence = {
    videoId: '',
    engSentence: '',
    korSentence: '',
    stepTheme: '',
    sentenceNo: '',
    statusDate: undefined,
  };

  for (let i = 0; i < themeList!.length; i++) {
    if (
      themeList![i].statusDate !== null &&
      data.stepTheme === unlocked.theme
    ) {
      isLocked = false;
      break;
    } else if (unlocked.theme === data.stepTheme && step === 1) {
      isLocked = false;
      break;
    } else if (unlocked.step > step) {
      isLocked = false;
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
          <div className="h-[26px] w-[26px] m-[12px] rounded-full flex justify-center items-center border-2 border-[#4b4b4b]"></div>
        )}

        <div className="h-[calc(100%-50px)] w-[3px] bg-[#F0F0F0] rounded"></div>
      </div>
      <div className="w-[calc(100%-60px)]">
        <p className="text-lg mb-5 mt-[12px] pl-2">{data.stepTheme}</p>
        {themeList!.map((sentence, index) => {
          return !isLocked ? (
            <Sentence data={sentence} isLocked={false} key={index} />
          ) : (
            <Sentence
              data={blankSentence}
              isLocked={true}
              key={index}
            ></Sentence>
          );
        })}
      </div>
    </div>
  );
};

export default Theme;

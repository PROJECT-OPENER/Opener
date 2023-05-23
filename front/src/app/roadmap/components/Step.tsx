import { stepInterface } from '@/types/share';
import Theme from './Theme';
const Step = ({ data, unlocked }: { data: stepInterface; unlocked: any }) => {
  const stepList = data.themeRoadMapResponseDtoList
    ? data.themeRoadMapResponseDtoList
    : data.authThemeRoadMapResponseDtoList;

  return (
    <>
      <p className="text-center text-xl sm:text-2xl lg:text-3xl my-10 lg:mb-3 lg:mt-10">
        STEP {data.stepNo}
      </p>
      {stepList?.map((theme, index) => {
        return (
          <Theme
            data={theme}
            key={index}
            step={Number(data.stepNo)}
            unlocked={unlocked}
          />
        );
      })}
    </>
  );
};

export default Step;

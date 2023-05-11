import { stepInterface } from '@/types/share';
import Theme from './Theme';
const Step = ({ data }: { data: stepInterface }) => {
  const stepList = data.themeRoadMapResponseDtoList
    ? data.themeRoadMapResponseDtoList
    : data.authThemeRoadMapResponseDtoList;

  return (
    <>
      <p className="text-center text-2xl my-10 lg:mb-3 lg:mt-10 sm:text-3xl lg:text-4xl">
        STEP {data.stepNo}
      </p>
      {stepList?.map((theme, index) => {
        return <Theme data={theme} key={index} />;
      })}
    </>
  );
};

export default Step;

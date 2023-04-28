type sentenceType = {
  video_id: string;
  eng_sentence: string;
  kor_sentence: string;
  step_theme: string;
  sentence_no: string;
  status_date: string;
};

type themeType = {
  step_theme: string;
  list: sentenceType[];
};

type stepType = {
  data: {
    step_no: string;
    list: themeType[];
  };
};

import Theme from './Theme';
const Step = (props: stepType) => {
  const steps = props.data;

  return (
    <>
      <p className="text-center text-4xl my-10">STEP {props.data.step_no}</p>
      {steps.list.map((theme, index) => {
        return <Theme data={theme} key={index} />;
      })}
    </>
  );
};

export default Step;

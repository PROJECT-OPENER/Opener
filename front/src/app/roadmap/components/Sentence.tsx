type sentenceType = {
  data: {
    video_id: string;
    eng_sentence: string;
    kor_sentence: string;
    sentence_no: string;
    status_date: string;
  };
};
import Link from 'next/link';
import { RiCheckFill } from 'react-icons/ri';
const Sentence = (props: sentenceType) => {
  const videoInfo = props.data;
  return (
    <Link
      href={'/shadowing/learning/' + videoInfo.video_id}
      className="flex flex-row justify-between items-center w-full rounded-3xl shadow-md mb-4 py-6 px-8 bg-white hover:bg-[#F6F6F6] active:bg-[#F2F2F2]"
    >
      <div>
        <p className="text-2xl font-medium mb-2">{videoInfo.eng_sentence}</p>
        <p className="text-sm">{videoInfo.kor_sentence}</p>
      </div>
      {videoInfo.status_date === '' || !videoInfo.status_date ? (
        <div className="w-[35px] h-[35px] rounded-full bg-[#F1F1F1]" />
      ) : (
        <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center bg-[#FFD600]">
          <RiCheckFill size="1.7rem" color="#ffffff" />
        </div>
      )}
    </Link>
  );
};

export default Sentence;

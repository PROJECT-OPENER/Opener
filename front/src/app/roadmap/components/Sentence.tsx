import { sentenceInterface } from '@/types/share';
import Link from 'next/link';
import { RiCheckFill } from 'react-icons/ri';
const Sentence = ({ data }: { data: sentenceInterface }) => {
  const videoInfo = data;

  return (
    <Link
      href={'/shadowing/learning/' + videoInfo.videoId}
      className="flex flex-row justify-between items-center w-full rounded-3xl shadow-md mb-4 py-6 px-8 bg-white hover:bg-[#F6F6F6] active:bg-[#F2F2F2]"
    >
      <div>
        <p className="text-xl font-medium mb-2">{videoInfo.engSentence}</p>
        <p className="text-sm">{videoInfo.korSentence}</p>
      </div>
      {videoInfo.statusDate === '' || !videoInfo.statusDate ? (
        <div className="w-[30px] h-[30px] rounded-full bg-[#F1F1F1]" />
      ) : (
        <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#FFD600]">
          <RiCheckFill size="1.7rem" color="#ffffff" />
        </div>
      )}
    </Link>
  );
};

export default Sentence;

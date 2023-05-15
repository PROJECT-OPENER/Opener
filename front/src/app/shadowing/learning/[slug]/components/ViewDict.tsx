import { searchWordInterface } from '@/types/share';

const ViewDict = (props: { word: searchWordInterface }) => {
  const wordInfo = props.word;
  const meaning = wordInfo.meaning.split(',');
  return (
    <div className="lg:overflow-y-scroll lg:max-h-[150px]">
      <p className="mb-5">
        <span className="text-lg font-semibold text-[#0B8AFF]">
          {wordInfo.word}
        </span>
        <span className="ml-1 text-sm text-[#949494] ml-2">
          {wordInfo.level}
        </span>
      </p>
      <p className="mb-2 text-base text-[#949494]">{wordInfo.wordType}</p>
      {meaning.map((mean, index) => {
        return (
          <p className="mb-2" key={index}>
            {index + 1}. {mean}
          </p>
        );
      })}
    </div>
  );
};
export default ViewDict;

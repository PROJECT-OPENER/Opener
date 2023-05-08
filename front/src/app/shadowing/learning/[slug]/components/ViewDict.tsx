type viewDictType = {
  word: string;
};
const ViewDict = (props: viewDictType) => {
  return (
    <div>
      <p className="mb-5">
        <span className="text-lg font-semibold text-[#0B8AFF]">
          {props.word}
        </span>
        <span className="ml-1 text-base text-[#949494]">[fuck:you]</span>
      </p>
      <p className="mb-2 text-base text-[#949494]">명사</p>
      <p className="mb-2">1. (허구적인, 재미있는) 이야기</p>
      <p className="mb-2">
        2. (실제 있었던 일에 대한) 이야기[말] 허구적인, (재미있는) 이야기
      </p>
      <p className="mb-2">3. (과거의 사건들을 담은) 이야기, 일대기, 역사</p>
      <p className="mb-2">4. (신문, 잡지 등의) 기사</p>
    </div>
  );
};
export default ViewDict;

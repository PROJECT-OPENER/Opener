type viewDictType = {
  word: string;
};
const ViewDict = (props: viewDictType) => {
  return (
    <div>
      <p>{props.word}의 뜻이 여기에 나온다 이말이야</p>
    </div>
  );
};
export default ViewDict;

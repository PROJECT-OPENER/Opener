import Categories from './components/Categories';

type listType = {
  video_id: string;
  thumbnail_url: string;
  eng_sentence: string;
  kor_sentence: string;
  is_marked: string;
};
type contentType = {
  length: number;
  list: listType[];
};

const page = () => {
  return (
    <div className="inner-content">
      <h1 className="text-2xl font-extrabold my-2">영어 쉐도잉</h1>
      <p className="text-sm">영어는 씹어야 제 맛이지</p>
      <Categories />
    </div>
  );
};

export default page;

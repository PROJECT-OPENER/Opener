'use client';
import {
  getCaptionApi,
  patchCaptionApi,
  getVideoApi,
} from '@/app/api/shadowingApi';
import { useEffect, useState } from 'react';

const Edit = ({ params }: { params: { slug: string } }) => {
  const [video, setVideo] = useState<any>({ start: '', end: '' });
  const [engCaption, setEngCaption] = useState<string>('');
  const [korCaption, setKorCaption] = useState<string>('');
  const tmp = params.slug.split('.');
  const videoId = tmp[0];
  const videoUrl = tmp[1];

  useEffect(() => {
    const getVideo = async () => {
      const res = await getVideoApi(videoId);
      setVideo({
        start: res?.start,
        end: res?.end,
      });
      if (res.engCaption === null || res.engCaption === undefined) {
        const eng = await getCaptionApi(videoUrl);
        console.log(eng);
        setEngCaption(eng);
      } else {
        setEngCaption(res?.engCaption);
      }
      setKorCaption(res?.korCaption);
    };
    getVideo();
  }, []);

  const action = async () => {
    const payload = {
      korCaption: korCaption,
      engCaption: engCaption,
    };
    const res = await patchCaptionApi(payload, videoId);
    if (res.data.code === 200) {
      alert('정상적으로 등록 완료');
    } else {
      alert('error' + res.data.code);
    }
  };

  return (
    <div className="h-[500px] w-full">
      <p className="text-xl font-bold">
        {video?.start} ~ {video?.end}
      </p>
      <p>왼쪽 영어 자막을 오른쪽에 한글 자막으로 변경해주세요</p>
      <div className="flex flex-row w-full">
        <div className="w-full ">
          <p className="text-center bg-[#f2f2f2] p-3">영어 자막</p>
          <textarea
            disabled
            className="h-[400px] w-full"
            value={korCaption}
            onChange={(e) => setKorCaption(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full ">
          <p className="text-center bg-brandP text-white p-3">한글 자막</p>
          <textarea
            value={engCaption}
            className="h-[400px] w-full"
            onChange={(e) => setEngCaption(e.target.value)}
          ></textarea>
        </div>
      </div>
      <button className="bg-brandY w-full p-3" onClick={action}>
        변형하기
      </button>
    </div>
  );
};

export default Edit;

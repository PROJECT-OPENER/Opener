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
  const videoId = params.slug;

  useEffect(() => {
    const getVideo = async () => {
      const res = await getVideoApi(videoId);
      setVideo({
        start: res?.start,
        end: res?.end,
        videoUrl: res?.videoUrl,
      });
      if (res.engCaption === null || res.engCaption === undefined) {
        const eng = await getCaptionApi(video.videoUrl);
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
    // console.log(korCaption, engCaption);
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
    <div className="h-full w-full">
      <p className="text-xl font-bold">
        {video?.start} ~ {video?.end}
      </p>
      <p>왼쪽 영어 자막을 오른쪽에 한글 자막으로 변경해주세요</p>
      <div className="flex flex-row w-full">
        <div className="w-full ">
          <p className="text-center bg-[#f2f2f2] p-3">영어 자막</p>
          <textarea
            className="h-[400px] w-full"
            value={engCaption}
            onChange={(e) => setEngCaption(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full ">
          <p className="text-center bg-brandP text-white p-3">한글 자막</p>
          <textarea
            value={korCaption}
            className="h-[400px] w-full"
            onChange={(e) => setKorCaption(e.target.value)}
          ></textarea>
        </div>
      </div>
      <button className="bg-brandY w-full p-3" onClick={action}>
        변경하기
      </button>
    </div>
  );
};

export default Edit;

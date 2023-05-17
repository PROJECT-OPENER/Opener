'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import YouTube, { YouTubeProps } from 'react-youtube';
import Button from '@/app/components/Button';
import { getSession } from 'next-auth/react';
import { uploadChallenge, originalVideoApi } from '@/app/api/challengeApi';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import TopNavPc from '@/app/components/TopNavPc';

type Props = {
  originalId: number;
};

type videoInfoType = {
  start: number;
  end: number;
  engCaption: any;
  videoUrl: string;
};

const ShootingVideo = ({ originalId }: Props) => {
  const [challengeFile, setChallengeFile] = useState<Blob>();
  const thumbnail = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const [thumbImg, setThumbImg] = useState<string>('');
  const formData = new FormData();
  const [loadingDone, setLoadingDone] = useState<boolean>(false);
  const uploadClick = async () => {
    const session = await getSession();
    const nickname = session?.user.user?.data.nickname;

    if (recordingPlayer.current && thumbCanvas.current && challengeFile) {
      const myFile = new File([challengeFile], 'demo.webm', {
        type: 'video/webm',
      });
      const blob = await fetch(thumbImg).then((res) => res.blob()); // 이미지 데이터를 multipart 형식으로 변환
      formData.append('memberChallengeImg', blob);
      formData.append('memberChallengeFile', myFile);
      formData.append('nicknasme', nickname || '');
      try {
        const res = await uploadChallenge(originalId, formData);
        if (res.data.code === 200) {
          alert(res.data.message);
        }
      } catch (err) {
        if (typeof err === 'string') {
          alert(err);
        } else {
          alert('예상치 못한 오류가 발생했습니다.');
        }
        router.push('/challenge');
      }
    }
  };

  const [caption, setCaption] = useState<any>();
  const [videoInfo, setVideoInfo] = useState<videoInfoType>(); // 가져온 영상 정보를 담는 state

  useEffect(() => {
    const getVideo = async () => {
      const originalRes = await originalVideoApi(originalId);
      setVideoInfo({
        start: convertTime(originalRes.startTime),
        end: convertTime(originalRes.endTime),
        engCaption: convert(originalRes.caption),
        videoUrl: originalRes.challengeUrl,
      });
    };
    getVideo();
    const convert = (cap: string) => {
      const resArray = [];
      if (cap) {
        const subtitles = cap.replace('WEBVTT\n\n', '');
        const subtitle = subtitles.split('\n\n');
        for (let i = 0; i < subtitle.length; i++) {
          const sub = subtitle[i].split('\n');
          const subtitleTime = sub[0].split(' --> ');
          const subtitleText = sub.slice(1).join('\n');
          if (subtitleTime) {
            resArray.push({
              startTime: convertTime(subtitleTime[0]),
              endTime: convertTime(subtitleTime[1]),
              text: subtitleText,
            });
          }
        }
      }
      return [...resArray];
    };

    return () => {
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  const convertTime = (timeString: string): number => {
    if (!timeString) return 0;
    const time = timeString.split('.')[0].split(/[:,]/).map(parseFloat);

    if (time.length > 2) {
      const [hours, minutes, seconds] = time;
      return hours * 3600 + minutes * 60 + seconds;
    } else {
      const [minutes, seconds] = time;
      return minutes * 60 + seconds;
    }
  };

  const changeSubtitle = (time: number) => {
    if (videoInfo) {
      for (let i = 0; i < videoInfo?.engCaption.length; i++) {
        if (
          time >= videoInfo?.engCaption[i].startTime &&
          time < videoInfo?.engCaption[i].endTime
        ) {
          setCaption({
            ...caption,
            eng: videoInfo.engCaption[i]?.text,
          });
          return;
        }
      }
    }
  };
  const animFrame = useRef<any>();
  const youtubeSubscribeRef = useRef<any>();
  const tracePlayer = () => {
    if (youtubeSubscribeRef.current?.getPlayerState() === 1) {
      const currentTime = youtubeSubscribeRef.current.getCurrentTime();
      changeSubtitle(currentTime);
      animFrame.current = requestAnimationFrame(tracePlayer);
    } else {
      return cancelAnimationFrame(animFrame.current);
    }
  };

  // --------------------------------------- youtube
  const youtubeRecordRef = useRef<YouTube>(null); // 촬영할 때의 원본 화면
  const youtubePlayRef = useRef<YouTube>(null); // 실행할 때의 원본 화면

  const onRecordReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const onPlayReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '224',
    width: '126',
    playerVars: {
      controls: 0,
      loop: 1,
      disablekb: 1,
      autohide: 0,
      autoplay: 0,
      fs: 0,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
    },
  };

  const recordingStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.ENDED) {
      stopRecording();
    }
    if (event.data === YouTube.PlayerState.PAUSED) {
      stopRecording();
      alert('영상 촬영이 중단되었습니다.');
      window.location.reload();
    }
  };
  const playingStateChange = (event: any) => {
    // 유튜브랑 싱크 맞추기 위해서 사용
    if (event.data === YouTube.PlayerState.ENDED) {
      if (youtubePlayRef.current) {
        const player = youtubePlayRef.current?.internalPlayer;
        player.playVideo();
        if (recordingPlayer.current) {
          recordingPlayer.current.pause();
          recordingPlayer.current.load();
        }
      }
    }
    if (event.data === YouTube.PlayerState.PLAYING) {
      if (recordingPlayer.current) {
        recordingPlayer.current.play();
      }
    }
    if (event.data === YouTube.PlayerState.PAUSED) {
      if (recordingPlayer.current) {
        recordingPlayer.current.pause();
      }
    }
  };

  const videoStyle = {
    // borderRadius: '10px', // 가장자리 둥글게 만들기
    // overflow: 'hidden', // 둥글게 만든 가장자리 넘치는 부분 잘라내기 -- 하얗게 보이는 버그있음
    // backgroundColor: 'transparent',
    height: '100%',
  };
  // =========================================

  const [isPreview, setIsPreview] = useState(false); // false
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [isRec, setIsRec] = useState(false);
  const recorderRef = useRef<MediaRecorder>();
  const downloadButton = useRef<HTMLAnchorElement>(null);
  const previewPlayer = useRef<HTMLVideoElement>(null);
  const recordingPlayer = useRef<HTMLVideoElement>(null);
  const thumbCanvas = useRef<HTMLCanvasElement>(null);

  const videoStart = () => {
    // 컴포넌트 들어왔을 때 촬영 대기
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 396, // 영상 사이즈 변경 테스트
          height: 704,
        },
        audio: false,
      })
      .then((stream: MediaStream) => {
        if (previewPlayer.current) {
          previewPlayer.current.srcObject = stream;
          setLoadingDone(true);
        }
      });
  };

  const startRecording = (stream: MediaStream) => {
    // 영상 촬영 시작
    const player = youtubeRecordRef.current?.internalPlayer;
    setIsRec(true);
    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;
    recorder.ondataavailable = (e) => {
      setRecordedChunks([...recordedChunks, e.data]);
    };
    recorder.start();
    player.playVideo();
  };

  const stopRecording = () => {
    console.log('진입');
    console.log(previewPlayer);
    if (previewPlayer.current && previewPlayer.current.srcObject) {
      console.log('해제시작');
      const srcObj = previewPlayer.current.srcObject;
      if ('getTracks' in srcObj) {
        srcObj
          .getTracks()
          .forEach((track: { stop: () => any }) => track.stop());
        console.log(srcObj.getTracks());
        console.log('해제완료');
      }
    }
    recorderRef.current?.stop();
    setIsPreview(true);
  };

  // const playRecording = () => {
  //   const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
  //   console.log('recordedBlob:', recordedBlob);
  //   console.log('recordedChunks:', recordedChunks);
  //   if (recordingPlayer.current) {
  //     recordingPlayer.current.src = URL.createObjectURL(recordedBlob);
  //     recordingPlayer.current.play();
  //     if (downloadButton.current) {
  //       downloadButton.current.href = recordingPlayer.current.src;
  //       downloadButton.current.download = `recording_${new Date()}.webm`;
  //       console.log(recordingPlayer.current.src);
  //     }
  //   }
  // };

  useEffect(() => {
    // 컴포넌트 실행시 촬영 대기 시작
    videoStart();
  }, []);

  useEffect(() => {
    // 촬영 영상 실행 준비되면 유튜브 플레이
    if (youtubePlayRef.current) {
      const player = youtubePlayRef.current?.internalPlayer;
      player.playVideo();
    }
  }, [onPlayReady]);

  // recordedChunks 입력되면 바로 영상 출력 준비 완료.
  useEffect(() => {
    const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
    if (recordingPlayer.current) {
      recordingPlayer.current.src = URL.createObjectURL(recordedBlob);
      setChallengeFile(recordedBlob); // 영상 변수에 저장
      setTimeout(() => {
        if (thumbCanvas.current && recordingPlayer.current) {
          thumbCanvas.current.width = recordingPlayer.current.videoWidth;
          thumbCanvas.current.height = recordingPlayer.current.videoHeight;
          const cavasCtx = thumbCanvas.current.getContext('2d');
          recordingPlayer.current.currentTime = 1;
          if (cavasCtx) {
            cavasCtx.drawImage(
              recordingPlayer.current,
              0,
              0,
              recordingPlayer.current.videoWidth,
              recordingPlayer.current.videoHeight,
            );
            const imageData = cavasCtx.canvas.toDataURL();
            setThumbImg(imageData);
          }
        }
      }, 50);
      if (downloadButton.current) {
        downloadButton.current.href = recordingPlayer.current.src;
        downloadButton.current.download = `recording_${new Date()}.webm`;
      }
    }
  }, [recordedChunks]);

  // -------------------
  useEffect(() => {
    const handlePopstate = () => {
      stopRecording();
      console.log('뒤로가기 이벤트 발생');
    };
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate); // 언마운트 이벤트
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div className="hidden md:block h-20 w-screen z-10">
        <TopNavPc />
      </div>
      <div className="flex justify-center relative md:mt-5">
        {!isPreview && (
          <>
            <div className={isPreview ? 'hidden' : 'relative'}>
              <video className="" autoPlay muted ref={previewPlayer}></video>
              <div className="absolute top-10  w-full  flex justify-center items-center">
                <div className="bg-black h-10 flex items-center bg-opacity-20 font-black text-white md:text-xl ">
                  {caption?.eng}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 ml-2 mb-2">
                <YouTube
                  style={videoStyle}
                  videoId={videoInfo?.videoUrl}
                  opts={opts}
                  onReady={(event) => {
                    youtubeSubscribeRef.current = event.target;
                    onRecordReady(event);
                  }}
                  ref={youtubeRecordRef}
                  onStateChange={(event) => {
                    recordingStateChange(event);
                    tracePlayer();
                  }}
                  className={isRec ? '' : 'hidden'}
                />
              </div>
              <button
                className={
                  isRec ? ' absolute bottom-10 right-10 mr-2 mb-2' : 'hidden'
                }
                onClick={() => {
                  alert('영상 촬영이 중단되었습니다.');
                  window.location.reload();
                }}
              >
                <MdOutlineCancel size={'3rem'} color={'white'} />
              </button>
            </div>
            <div className={loadingDone ? 'absolute bottom-0' : 'hidden'}>
              <button
                className={isRec ? 'hidden' : ''}
                onClick={() => {
                  startRecording(
                    (previewPlayer.current as any).captureStream(),
                  );
                }}
              >
                <img
                  src="/start.svg"
                  alt=".."
                  className=""
                  width={100}
                  height={100}
                />
              </button>
            </div>
          </>
        )}
        {isPreview && (
          <>
            <div className={isPreview ? 'relative' : 'hidden'}>
              <video ref={recordingPlayer}></video>
              <div className="absolute top-10 w-full  flex justify-center items-center">
                <p className="bg-black h-10 flex items-center bg-opacity-20 font-black text-white md:text-2xl ">
                  {caption?.eng}
                </p>
              </div>
              <canvas ref={thumbCanvas} className="hidden"></canvas>
              <img ref={thumbnail} />
              <div className="absolute bottom-0 left-0 ml-2 mb-2">
                <YouTube
                  videoId={videoInfo?.videoUrl}
                  opts={opts}
                  onReady={(event) => {
                    onPlayReady(event);
                    youtubeSubscribeRef.current = event.target;
                  }}
                  ref={youtubePlayRef}
                  onStateChange={(event) => {
                    playingStateChange(event);
                    tracePlayer();
                  }}
                />
              </div>
              <div className="absolute bottom-0 right-0 mr-2 mb-10 flex">
                <div className="mx-2">
                  <button
                    onClick={() => {
                      router.push('/challenge');
                    }}
                  >
                    <RiArrowGoBackLine size={'3rem'} color={'white'} />
                  </button>
                </div>
                <div className="mx-2">
                  <Button
                    type="button"
                    text="공유하기"
                    className=" bg-brandP w-32 text-white rounded-xl shadow-xl py-3"
                    onClick={uploadClick}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShootingVideo;

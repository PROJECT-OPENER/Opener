'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import YouTube, { YouTubeProps } from 'react-youtube';
import Image from 'next/image';
import Button from '@/app/components/Button';

const ShootingVideo = () => {
  const [challengeFile, setChallengeFile] = useState<Blob>();
  const router = useRouter();

  const uploadClick = () => {
    console.log(challengeFile);
    alert('영상 공유를 성공하였습니다.');
    router.push('/challange');
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

  // const opts2: YouTubeProps['opts'] = {
  //   height: '224',
  //   width: '126',
  //   playerVars: {
  //     controls: 0,
  //     loop: 1,
  //   },
  // };

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
        // 테스트 중
        if (recordingPlayer.current) {
          recordingPlayer.current.pause();
          recordingPlayer.current.load();
        }
      }
    }
    if (event.data === YouTube.PlayerState.PLAYING) {
      // 테스트 중
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

  // 스타일 테스트
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

  const videoStart = () => {
    // 컴포넌트 들어왔을 때 촬영 대기
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 480,
          height: 853,
        },
        audio: false,
      })
      .then((stream: MediaStream) => {
        if (previewPlayer.current) {
          console.log('videoStart-previewPlayer');
          previewPlayer.current.srcObject = stream;
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
    if (previewPlayer.current && previewPlayer.current.srcObject) {
      const srcObj = previewPlayer.current.srcObject;
      if ('getTracks' in srcObj) {
        srcObj
          .getTracks()
          .forEach((track: { stop: () => any }) => track.stop());
        console.log(srcObj.getTracks());
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
  // 이 영상을 onPlayerStateChange2에서 실행
  useEffect(() => {
    const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
    if (recordingPlayer.current) {
      recordingPlayer.current.src = URL.createObjectURL(recordedBlob);
      setChallengeFile(recordedBlob); // 영상 변수에 저장
      // recordingPlayer.current.play();
      if (downloadButton.current) {
        downloadButton.current.href = recordingPlayer.current.src;
        downloadButton.current.download = `recording_${new Date()}.webm`;
      }
    }
  }, [recordedChunks]);

  return (
    <div className="h-full">
      <div className="flex justify-center relative">
        {!isPreview && (
          <>
            <div className={isPreview ? 'hidden' : 'relative'}>
              <video className="" autoPlay muted ref={previewPlayer}></video>
              <div className="absolute bottom-0 left-0 ml-2 mb-2">
                <YouTube
                  style={videoStyle}
                  videoId="Wb7dDxDNvtc"
                  opts={opts}
                  onReady={onRecordReady}
                  ref={youtubeRecordRef}
                  onStateChange={recordingStateChange}
                  className={isRec ? '' : 'hidden'}
                />
              </div>
            </div>
            <div className="absolute bottom-0">
              <button
                className={isRec ? 'hidden' : ''}
                onClick={() => {
                  startRecording(
                    (previewPlayer.current as any).captureStream(),
                  );
                }}
              >
                <Image
                  src="/start.svg"
                  alt=".."
                  className=""
                  width={100}
                  height={100}
                  priority
                />
              </button>
            </div>
          </>
        )}
        {isPreview && (
          <>
            <div className={isPreview ? 'relative' : 'hidden'}>
              <video ref={recordingPlayer}></video>
              <div className="absolute bottom-0 left-0 ml-2 mb-2">
                <YouTube
                  videoId="Wb7dDxDNvtc"
                  opts={opts}
                  onReady={onPlayReady}
                  ref={youtubePlayRef}
                  onStateChange={playingStateChange}
                />
              </div>
              <div className="absolute bottom-0 right-0 mr-2 mb-10">
                <Button
                  type="button"
                  text="공유하기"
                  className=" bg-brandP w-32 text-white rounded-xl shadow-xl py-3"
                  onClick={uploadClick}
                />
                {/* <a
                  ref={downloadButton}
                  className="bg-brandP  text-white rounded-xl shadow-xl py-2 px-10"
                >
                  공유하기
                </a> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShootingVideo;

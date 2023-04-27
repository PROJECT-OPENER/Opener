'use client';

import React, { useRef, useState, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const ShootingVideo = () => {
  // ---------------------------------------
  const playerRef = useRef<YouTube>(null);
  const playerRef2 = useRef<YouTube>(null);
  const check = () => {
    const player = playerRef2.current?.internalPlayer;
    console.log(player);
  };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const onPlayerReady2: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '224',
    width: '126',
    playerVars: {
      controls: 0,
    },
  };

  const opts2: YouTubeProps['opts'] = {
    height: '224',
    width: '126',
    playerVars: {
      controls: 0,
      loop: 1,
      playlist: 'Wb7dDxDNvtc',
    },
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.ENDED) {
      stopRecording();
      console.log('영상이 종료되었습니다.');
    }
  };
  const onPlayerStateChange2 = (event: any) => {
    // 유튜브랑 싱크 맞추기 위해서 사용
    if (event.data === YouTube.PlayerState.ENDED) {
      if (playerRef2.current) {
        const player = playerRef2.current?.internalPlayer;
        player.playVideo();
        // 테스트 중
        if (recordingPlayer.current) {
          recordingPlayer.current.pause();
        }
      }
    }
    if (event.data === YouTube.PlayerState.PLAYING) {
      // 테스트 중
      if (recordingPlayer.current) {
        recordingPlayer.current.load();
        recordingPlayer.current.play();
      }
    }
  };

  // =========================================

  const [isPreview, setIsPreview] = useState(false);
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
        audio: true,
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
    const player = playerRef.current?.internalPlayer;
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
    videoStart();
  }, []);

  useEffect(() => {
    if (playerRef2.current) {
      const player = playerRef2.current?.internalPlayer;
      player.playVideo();
    }
  }, [onPlayerReady2]);

  // recordedChunks 입력되면 바로 영상 출력
  useEffect(() => {
    const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
    if (recordingPlayer.current) {
      recordingPlayer.current.src = URL.createObjectURL(recordedBlob);
      // recordingPlayer.current.play();
      if (downloadButton.current) {
        downloadButton.current.href = recordingPlayer.current.src;
        downloadButton.current.download = `recording_${new Date()}.webm`;
      }
    }
  }, [recordedChunks]);

  return (
    <div className="wrapper">
      <button className="bg-red-400" onClick={() => stopRecording()}>
        중지
      </button>
      <button onClick={() => check()}>확인</button>
      <div className="flex justify-center relative">
        {!isPreview && (
          <>
            <div className={isPreview ? 'hidden' : 'relative'}>
              <video autoPlay muted ref={previewPlayer}></video>

              <div className="absolute bottom-0 left-0">
                <YouTube
                  videoId="Wb7dDxDNvtc"
                  opts={opts}
                  onReady={onPlayerReady}
                  ref={playerRef}
                  onStateChange={onPlayerStateChange}
                  className={isRec ? '' : 'hidden'}
                />
              </div>
            </div>
            <div className="absolute bottom-0">
              <button
                className={isRec ? 'hidden' : 'bg-red-400'}
                onClick={() => {
                  startRecording(
                    (previewPlayer.current as any).captureStream(),
                  );
                }}
              >
                녹화하기
              </button>
            </div>
          </>
        )}
        {isPreview && (
          <>
            <div className={isPreview ? 'relative' : 'hidden'}>
              <video ref={recordingPlayer}></video>
              <div className="absolute bottom-0 left-0">
                <YouTube
                  videoId="Wb7dDxDNvtc"
                  opts={opts2}
                  onReady={onPlayerReady2}
                  ref={playerRef2}
                  onStateChange={onPlayerStateChange2}
                />
              </div>
            </div>
            <div className="absolute bottom-0">
              <a ref={downloadButton} className="bg-yellow-500">
                다운로드
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShootingVideo;

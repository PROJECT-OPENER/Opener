'use client';

import React, { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { memberChallenge, challengeDetail } from '@/types/share';
import { useRouter } from 'next/navigation';
import {
  likeCreateApi,
  likeDeleteApi,
  deleteMemberChallenge,
} from '@/app/api/challengeApi';
import useUser from '@/app/hooks/userHook';
import { AiFillHeart } from 'react-icons/ai';
import { RiShareForwardFill, RiDeleteBin5Fill } from 'react-icons/ri';
import useSWR from 'swr';
import TopNavPc from '@/app/components/TopNavPc';
import { fetcher } from '@/app/api/axiosConfig';
import DetailPageNav from '@/app/components/DetailPageNav';

type Props = {
  challengeId: number;
};

type videoInfoType = {
  start: number;
  end: number;
  engCaption: any;
  videoUrl: string;
};

const SingleChallengeView = ({ challengeId }: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();

  const { user } = useUser();

  const { data, isLoading, error } = useSWR(
    `${BASE_URL}challenge-service/watch/member-challenges/${challengeId}/video`,
    fetcher,
  );
  const challengeInfo: challengeDetail = data?.data;
  const youtubePlayRef = useRef<YouTube>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const memberPlayerRef = useRef<HTMLVideoElement>(null);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const onPlayReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
    if (parentRef.current) {
      parentRef.current.addEventListener('click', handleParentClick);
    }
  };

  const playingStateChange = (event: any) => {
    // 유튜브랑 싱크 맞추기 위해서 사용
    if (memberPlayerRef.current) {
      if (event.data === YouTube.PlayerState.ENDED) {
        const player = youtubePlayRef.current?.internalPlayer;
        player.playVideo();
        memberPlayerRef.current.pause();
        memberPlayerRef.current.load();
        // console.log('ENDED');
      }
      if (event.data === YouTube.PlayerState.PLAYING) {
        memberPlayerRef.current.play();
        // console.log('PLAYING');
      }
      if (event.data === YouTube.PlayerState.PAUSED) {
        memberPlayerRef.current.pause();
        // console.log('PAUSED');
      }
    }
  };

  const likeClick = async (method: string) => {
    if (method == 'post') {
      const response = await likeCreateApi(challengeId);
      console.log('response', response);
      setIsLike(true);
    } else {
      const response = await likeDeleteApi(challengeId);
      console.log('response', response);
      setIsLike(false);
    }
  };

  const deleteChallenge = async () => {
    const response = await deleteMemberChallenge(challengeId);
    if (response.code === 200) {
      alert('영상이 삭제되었습니다.');
      router.push('/challenge');
    } else {
      console.log(response);
    }
  };

  const shareClick = () => {
    window.navigator.clipboard.writeText(
      `https://k8c1041.p.ssafy.io/challenge/p/${challengeId}`,
    );
    alert('클립보드에 복사를 완료했습니다.');
  };

  const youtubePlayStart = async () => {
    if (youtubePlayRef.current) {
      const player = await youtubePlayRef.current.internalPlayer;
      player.playVideo();
    }
  };

  const handleParentClick = async () => {
    if (youtubePlayRef.current) {
      const player = youtubePlayRef.current.getInternalPlayer();
      const status = await player.getPlayerState();
      if (status === 1) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  useEffect(() => {
    youtubePlayStart();
  }, [onPlayReady]);

  useEffect(() => {
    if (data) {
      setIsLike(challengeInfo?.curMemberChallenge.isLike);
    }
  }, [data]);

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
  const [caption, setCaption] = useState<any>();
  const [videoInfo, setVideoInfo] = useState<videoInfoType>(); // 가져온 영상 정보를 담는 state

  useEffect(() => {
    if (data) {
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
      const getVideo = async () => {
        setVideoInfo({
          start: convertTime(
            challengeInfo.watchOriginalChallengeResponseDto.startTime,
          ),
          end: convertTime(
            challengeInfo.watchOriginalChallengeResponseDto.endTime,
          ),
          engCaption: convert(
            challengeInfo.watchOriginalChallengeResponseDto.caption,
          ),
          videoUrl:
            challengeInfo.watchOriginalChallengeResponseDto.challengeUrl,
        });
      };
      getVideo();
    }

    return () => {
      cancelAnimationFrame(animFrame.current);
    };
  }, [data]);

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

  const changeSubtitle = () => {
    if (videoInfo) {
      const tmpCaption = {
        eng: '',
      };
      const time = youtubeRecordRef.current.getCurrentTime();
      for (let i = 0; i < videoInfo?.engCaption.length; i++) {
        if (
          time > videoInfo?.engCaption[i].startTime &&
          time < videoInfo?.engCaption[i].endTime
        ) {
          tmpCaption.eng += '\n';
          tmpCaption.eng += videoInfo?.engCaption[i].text;
        }
      }
      setCaption({
        ...caption,
        eng: tmpCaption.eng,
      });
    }
  };
  const animFrame = useRef<any>();
  const youtubeRecordRef = useRef<any>();
  const tracePlayer = () => {
    if (youtubeRecordRef.current?.getPlayerState() === 1) {
      // const currentTime = youtubeRecordRef.current.getCurrentTime();
      changeSubtitle();
      animFrame.current = requestAnimationFrame(tracePlayer);
    } else {
      return cancelAnimationFrame(animFrame.current);
    }
  };
  const handleLeftGame = () => {
    router.push('/challenge');
  };
  return (
    <>
      <DetailPageNav
        className="fixed top-3 left-10 right-10 z-10"
        title="CHALLANGE"
        propEvent={handleLeftGame}
      />
      {!isDelete && (
        <>
          <div
            className="h-screen flex flex-col items-center overflow-hidden"
            ref={videoRef}
          >
            <div
              className="relative overflow-hidden rounded-xl z-0 sm:h-[736px] sm:w-[414px] h-[640px] w-[360px] bg-black sm:mt-20"
              ref={parentRef}
            >
              <div className="relative sm:h-[736px] sm:w-[414px] h-[640px] w-[360px] flex justify-center items-center overflow-hidden">
                <video
                  ref={memberPlayerRef}
                  src={challengeInfo?.curMemberChallenge.memberChallengeUrl}
                  className="sm:h-[736px] sm:w-[414px] h-[640px] w-[360px] relative"
                ></video>
                <div className="absolute top-10 w-full max-w-[90%] break-keep">
                  <pre
                    className="text-left font-black text-white md:text-xl whitespace-pre-wrap"
                    style={{
                      filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.9))',
                    }}
                  >
                    {caption?.eng}
                  </pre>
                </div>
                {data && (
                  <YouTube
                    videoId={
                      challengeInfo?.watchOriginalChallengeResponseDto
                        .challengeUrl
                    }
                    opts={opts}
                    onReady={(event) => {
                      youtubeRecordRef.current = event.target;
                      onPlayReady(event);
                    }}
                    ref={youtubePlayRef}
                    onStateChange={(event) => {
                      playingStateChange(event);
                      tracePlayer();
                    }}
                    className="absolute bottom-20 left-0 ml-2 mb-2"
                  />
                )}

                {user && (
                  <>
                    <div className="absolute bottom-20 right-0 mr-2 mb-2">
                      <div className="grid-rows-2 m-3">
                        <div className="flex justify-center">
                          <h1 className="font-semibold text-3xl">
                            {challengeInfo?.curMemberChallenge.isLike}
                          </h1>
                          {isLike && (
                            <AiFillHeart
                              size={'3rem'}
                              className="fill-[#fb3958]"
                              style={{
                                filter:
                                  'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                              }}
                              onClick={() => likeClick('delete')}
                            />
                          )}
                          {!isLike && (
                            <AiFillHeart
                              size={'3rem'}
                              className="fill-white"
                              style={{
                                filter:
                                  'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                              }}
                              onClick={() => likeClick('post')}
                            />
                          )}
                        </div>
                      </div>
                      <div className="grid-rows-2 m-3">
                        <div className="flex justify-center">
                          <RiShareForwardFill
                            size={'3rem'}
                            className="fill-white"
                            style={{
                              filter:
                                'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                            }}
                            onClick={() => shareClick()}
                          />
                        </div>
                        <div className="flex justify-center">
                          <p
                            className="text-md font-black text-white"
                            style={{
                              filter:
                                'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                            }}
                          >
                            공유하기
                          </p>
                        </div>
                      </div>
                      {challengeInfo?.curMemberChallenge
                        .memberChallengeNickname === user?.data.nickname && (
                        <div className="grid-rows-2 m-3">
                          <div className="flex justify-center">
                            <RiDeleteBin5Fill
                              size={'3rem'}
                              className="fill-white"
                              style={{
                                filter:
                                  'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                              }}
                              onClick={() => deleteChallenge()}
                            />
                          </div>
                          <div className="flex justify-center">
                            <p
                              className="text-md font-black text-white"
                              style={{
                                filter:
                                  'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                              }}
                            >
                              삭제하기
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleChallengeView;

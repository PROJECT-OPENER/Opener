'use client';

type Props = {
  challengeList: memberChallenge;
};

type videoInfoType = {
  start: number;
  end: number;
  engCaption: any;
  videoUrl: string;
};

import React, { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { memberChallenge, challengeDetail } from '@/types/share';
import {
  likeCreateApi,
  likeDeleteApi,
  deleteMemberChallenge,
} from '@/app/api/challengeApi';
import useUser from '@/app/hooks/userHook';
import { AiFillHeart } from 'react-icons/ai';
import { RiShareForwardFill, RiDeleteBin5Fill } from 'react-icons/ri';
import useSWR from 'swr';
import { fetcher } from '@/app/api/axiosConfig';
import { useRouter } from 'next/navigation';
import DetailPageNav from '@/app/components/DetailPageNav';

const ChallengeDetail = ({ challengeList }: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const { user } = useUser();
  const [caption, setCaption] = useState<any>();
  const [videoInfo, setVideoInfo] = useState<videoInfoType>(); // 가져온 영상 정보를 담는 state
  const { data, isLoading, error, mutate } = useSWR(
    `${BASE_URL}challenge-service/watch/member-challenges/${challengeList.memberChallengeId}/video`,
    fetcher,
  );
  const challengeInfo: challengeDetail = data?.data;
  useEffect(() => {
    const convert = (cap: string) => {
      // console.log(cap);
      const resArray = [];
      if (cap) {
        const subtitles = cap.replace('WEBVTT\n\n', '');
        const subtitle = subtitles.split('\n\n');
        for (let i = 0; i < subtitle.length; i++) {
          const sub = subtitle[i].split('\n');
          const subtitleTime = sub[0].split(' --> ');
          const subtitleText = sub.slice(1).join('\n');
          // console.log(subtitleTime);
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
    if (data) {
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
    const wholetime = timeString.split('.');
    const m_sec = Number(wholetime[1]) / 1000;
    // console.log(timeString, m_sec, wholetime[1]);
    const time = wholetime[0].split(/[:,]/).map(parseFloat);

    if (time.length > 2) {
      const [hours, minutes, seconds] = time;
      return hours * 3600 + minutes * 60 + seconds + m_sec;
    } else {
      const [minutes, seconds] = time;
      return minutes * 60 + seconds + m_sec;
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

  const youtubePlayRef = useRef<YouTube>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const memberPlayerRef = useRef<HTMLVideoElement>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const options = {
    root: null,
    threshold: [0.3, 0.7],
  };
  const [detailobserver, setDetailobserver] =
    useState<IntersectionObserver | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const onPlayReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
    if (parentRef.current) {
      parentRef.current.addEventListener('click', handleParentClick);
    }
  };

  const handleParentClick = async () => {
    // console.log('클릭');
    if (youtubePlayRef.current) {
      const player = youtubePlayRef.current.getInternalPlayer();
      const status = await player.getPlayerState();
      if (status === 1) {
        player.pauseVideo();
        // console.log('정지');
        // detailobserver?.disconnect();
      } else {
        player.playVideo();
        // console.log('시작');
      }
    }
  };

  const playingStateChange = (event: any) => {
    // 유튜브랑 싱크 맞추기 위해서 사용
    if (memberPlayerRef.current) {
      if (event.data === YouTube.PlayerState.PLAYING) {
        memberPlayerRef.current.play();
        // console.log('PLAYING');
      }
      if (event.data === YouTube.PlayerState.PAUSED) {
        memberPlayerRef.current.pause();
        // console.log('PAUSED');
      }
      if (event.data === YouTube.PlayerState.ENDED) {
        const player = youtubePlayRef.current?.internalPlayer;
        player.playVideo();
        memberPlayerRef.current.pause();
        memberPlayerRef.current.load();
        // console.log('ENDED');
      }
    }
  };

  const likeClick = async (method: string) => {
    if (method == 'post') {
      const response = await likeCreateApi(challengeList.memberChallengeId);
      // console.log('response', response);
      setIsLike(true);
      setLikeCnt(likeCnt + 1);
    } else {
      const response = await likeDeleteApi(challengeList.memberChallengeId);
      // console.log('response', response);
      setIsLike(false);
      setLikeCnt(likeCnt - 1);
    }
  };

  const deleteChallenge = async () => {
    const response = await deleteMemberChallenge(
      challengeList.memberChallengeId,
    );
    if (response.code === 200) {
      alert('영상이 삭제되었습니다.');
      router.push('/challenge');
    } else {
      // console.log(response);
    }
  };
  const youtubePlayStart = async () => {
    if (youtubePlayRef.current) {
      const player = await youtubePlayRef.current.internalPlayer;
      player.playVideo();
    }
  };

  const shareClick = () => {
    window.navigator.clipboard.writeText(
      `https://k8c1041.p.ssafy.io/challenge/p/${challengeList.memberChallengeId}`,
    );
    alert('클립보드에 복사를 완료했습니다.');
  };
  useEffect(() => {
    // 촬영 영상 실행 준비되면 유튜브 플레이
    if (isView) {
      youtubePlayStart();
    }
  }, [onPlayReady, isView]);

  useEffect(() => {
    if (data) {
      setIsLike(challengeInfo?.curMemberChallenge.isLike);
      setLikeCnt(challengeList.likeCount);
    }
  }, [data]);

  useEffect(() => {
    if (!detailobserver) {
      const newObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setIsView(true);
            youtubePlayStart();
          } else if (entry.intersectionRatio < 0.3) {
            const player = youtubePlayRef.current?.internalPlayer;
            player?.pauseVideo();
            setIsView(false);
          }
        });
      }, options);
      if (videoRef.current && newObserver) {
        newObserver.observe(videoRef.current);
      }
      setDetailobserver(newObserver);
    }
  }, []);

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
  const handleLeftGame = () => {
    router.push('/challenge');
  };

  return (
    <div className="md:py-5">
      <DetailPageNav
        className="lg:inline fixed top-3 left-10 right-10 z-10 hidden"
        title="CHALLANGE"
        propEvent={handleLeftGame}
      />
      {!isDelete && (
        <div
          className="h-screen w-screen min-h-max min-w-max flex flex-col items-center"
          ref={videoRef}
        >
          <div
            className="relative overflow-hidden rounded-xl z-0 sm:h-[736px] sm:w-[414px] h-[640px] w-[360px] bg-black lg:mt-20"
            ref={parentRef}
          >
            <div
              className={
                isView
                  ? 'relative sm:h-[736px] sm:w-[414px]  h-[640px] w-[360px] flex justify-center items-center overflow-hidden'
                  : 'hidden'
              }
            >
              <video
                ref={memberPlayerRef}
                src={challengeInfo?.curMemberChallenge.memberChallengeUrl}
                className="sm:h-[736px] sm:w-[414px]   h-[640px] w-[360px] relative"
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
                      ?.challengeUrl
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
                    <div className="grid-rows-2  m-3">
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
                                'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.9))',
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
                                'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.9))',
                            }}
                            onClick={() => likeClick('post')}
                          />
                        )}
                      </div>
                      <div className="flex justify-center">
                        <p
                          className="text-lg font-black text-white"
                          style={{
                            filter:
                              'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.9))',
                          }}
                        >
                          {likeCnt}
                        </p>
                      </div>
                    </div>
                    <div className="grid-rows-2 m-3">
                      <div className="flex justify-center">
                        <RiShareForwardFill
                          size={'3rem'}
                          className="fill-white"
                          style={{
                            filter:
                              'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.9))',
                          }}
                          onClick={() => shareClick()}
                        />
                      </div>
                      <div className="flex justify-center">
                        <p
                          className="text-md font-black text-white"
                          style={{
                            filter:
                              'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.9))',
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
            <div
              className={
                isView
                  ? 'hidden'
                  : 'relative rounded-xl flex justify-center items-center sm:h-[736px] sm:w-[414px]  h-screen w-auto  bg-black'
              }
            >
              <img
                src={challengeList?.memberChallengeImg}
                alt=""
                className="sm:h-[736px] sm:w-[414px] h-[640px] w-[360px] overflow-hidden relative"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail;

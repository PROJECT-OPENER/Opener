'use client';
import CheckDiction from './CheckDiction';
import ViewDict from './ViewDict';
import { useRef, useState, useEffect } from 'react';
import { WordTokenizer } from 'natural';
import styles from './ViewScript.module.css';
import YouTube, { YouTubePlayer } from 'react-youtube';
import {
  getVideoApi,
  setCountVideoApi,
  setBookmarkApi,
  getCaptionApi,
  translateCaptionApi,
  dictionaryApi,
  patchCaptionApi,
} from '@/app/api/shadowingApi';
import {
  BsMic,
  BsBookmarkPlus,
  BsBookmarkPlusFill,
  BsArrowRepeat,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import { TfiAngleLeft } from 'react-icons/tfi';
import { scriptInterface, searchWordInterface } from '@/types/share';
import Link from 'next/link';

type videoInfoType =
  | {
      start: number;
      end: number;
      engCaption: scriptInterface[];
      korCaption: scriptInterface[];
      videoUrl: string;
      marked: boolean | undefined;
      repeat: number | undefined;
    }
  | undefined;

const ViewScript = ({ params }: { params: { slug: string } }) => {
  const videoId = params.slug;
  const playerRef = useRef<YouTubePlayer>(null);
  const [checkDiction, setCheckDiction] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<searchWordInterface>();
  const [caption, setCaption] = useState<{
    eng: string[] | null;
    kor: string;
  }>();
  const [count, setCount] = useState<number>(1);
  const showCountRef = useRef<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [isMarked, setIsMarked] = useState<boolean>(false); // 북마크 여부를 담는 state
  const [isRepeat, setIsRepeat] = useState<boolean>(false); // 구간반복 상태 변경 시 css 변경을 위한 state
  const isRepeatRef = useRef<boolean>(false); // 구간반복 여부를 담는 참조값
  const tokenizer = new WordTokenizer(); // 단어 형태소 분석
  const subRangeRef = useRef<{ start: number; end: number }>(); // 현재 자막이 나오는 구간(시간)을 담는 참조값
  const [second, setSecond] = useState<number>(); // 발음체크 시 카운트를 담을 state
  const [videoInfo, setVideoInfo] = useState<videoInfoType>(); // 가져온 영상 정보를 담는 state

  useEffect(() => {
    const getVideo = async (videoId: string) => {
      const data = await getVideoApi(videoId);
      console.log(data);
      if (data.engCaption === null || data.engCaption === '') {
        data.engCaption = await getCaptionApi(data.videoUrl);
        data.korCaption = await translateCaptionApi(
          data.engCaption.replace('WEBVTT\n\n', ''),
        );
        // 자막 업데이트
        patchCaptionApi(
          {
            engCaption: data.engCaption,
            korCaption: data.korCaption,
          },
          videoId,
        );
      }
      setVideoInfo({
        start: convertTime(data.start),
        end: convertTime(data.end),
        engCaption: convert(data.engCaption),
        korCaption: convert(data.korCaption),
        videoUrl: data.videoUrl,
        marked: data?.marked,
        repeat: data?.repeat,
      });
      setCount(data.repeat ? data.repeat + 1 : 1);
    };

    const convert = (cap: string) => {
      const resArray: scriptInterface[] = [];
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
    getVideo(videoId);
  }, []);

  const searchDict = async (word: string) => {
    const res = await dictionaryApi(word);
    console.log(res);
    if (res.status === 200) {
      setSearchWord(res.data.data);
    }
  };

  const bookMark = () => {
    if (isMarked) {
      setBookmarkApi(videoId, false);
    } else {
      setBookmarkApi(videoId, true);
    }
    setIsMarked(!isMarked);
  };

  const repeat = () => {
    isRepeatRef.current = !isRepeatRef.current;
    setIsRepeat(!isRepeat);
  };

  const addCount = () => {
    console.log('addcound');
    setCount(count + 1);
    setCountVideoApi(videoId);
  };

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

  const findCaptionTime = (opt: string) => {
    const time = playerRef.current.getCurrentTime();
    // opt: next, prev
    if (videoInfo) {
      if (opt === 'next') {
        let min_time = Infinity;
        for (const subtitle of videoInfo.engCaption) {
          if (time < subtitle.startTime && min_time > subtitle.startTime) {
            min_time = subtitle.startTime;
          }
          // else if (time < subtitle.endTime && min_time > subtitle.endTime) {
          //   min_time = subtitle.endTime;
          // }
        }
        return min_time === Infinity ? -1 : min_time; //
      } else {
        let max_time = 0;
        for (const subtitle of videoInfo.engCaption) {
          if (time > subtitle.endTime && max_time < subtitle.endTime) {
            max_time = subtitle.startTime;
          }
        }
        return max_time === Infinity ? -1 : max_time; //
      }
    }
  };

  const changeSubtitle = (time: number) => {
    if (videoInfo) {
      for (let i = 0; i < videoInfo?.engCaption.length; i++) {
        if (
          time >= videoInfo?.engCaption[i].startTime &&
          time < videoInfo?.engCaption[i].endTime
        ) {
          if (
            !subRangeRef.current ||
            time < subRangeRef.current?.start ||
            time > subRangeRef.current?.end
          ) {
            console.log('change');
            subRangeRef.current = {
              start: videoInfo?.engCaption[i].startTime,
              end: videoInfo?.engCaption[i].endTime,
            };
            setCaption({
              ...caption,
              eng: tokenizer.tokenize(
                videoInfo?.engCaption[i].text,
              ) as string[],
              kor: videoInfo.korCaption[i].text,
            });
          }
          return;
        }
      }
    }
  };

  const raf = useRef<any>();
  const tracePlayer = () => {
    console.log('tracePlayer');
    if (playerRef.current?.getPlayerState() === 1) {
      const current = playerRef.current.getCurrentTime();
      if (!isRepeatRef.current) {
        changeSubtitle(current);
      } else {
        // console.log(current, subRangeRef.current?.end);
        if (subRangeRef.current && current >= subRangeRef.current.end + 1) {
          playerRef.current.seekTo(subRangeRef.current?.start, true);
        }
      }
      raf.current = requestAnimationFrame(tracePlayer);
    } else {
      console.log('cancel, state :', playerRef.current?.getPlayerState());
      return cancelAnimationFrame(raf.current);
    }
  };

  const debounceRef = useRef<any>(undefined); // 디바운싱
  const playerSeekTo = (time: number) => {
    // 빠르게 연타하는 경우 무시하고 한 번만 처리(디바운싱)
    if (!debounceRef.current && time > 0) {
      changeSubtitle(time);
      playerRef.current.seekTo(time, true);
      const timeout = setTimeout(() => {
        return (debounceRef.current = undefined);
      }, 500);
      debounceRef.current = timeout;
    }
  };

  const setPlayerSpeed = (): void => {
    let expected = speed;
    if (speed > 0.5) {
      expected = speed - 0.25;
    } else {
      expected = 1;
    }
    setSpeed(expected);
    playerRef.current.setPlaybackRate(expected);
  };

  useEffect(() => {
    return () => {
      console.log('clear');
      cancelAnimationFrame(raf.current); // requestAnimationFrame(tracePlayer) 후 clear <= 메모리 누수 방지
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center lg:absolute lg:top-0 lg:left-0 w-full h-full">
      <div className={styles.videoContainer}>
        {showCountRef.current ? (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 bg-[#00000083]">
            <p className="text-8xl t text-white">{second}</p>
          </div>
        ) : (
          <div></div>
        )}

        <YouTube
          onReady={(event) => {
            playerRef.current = event.target;
            // tracePlayer();
          }}
          onStateChange={tracePlayer}
          onEnd={() => {
            console.log('end');
            if (isRepeatRef.current) {
              playerRef.current.playVideo();
              playerRef.current.seekTo(subRangeRef.current?.start, true);
            } else {
              playerRef.current.seekTo(videoInfo?.start, true);
              playerRef.current.playVideo();
              addCount();
            }
          }}
          videoId={videoInfo?.videoUrl}
          opts={{
            height: '390',
            width: '640',
            playerVars: {
              loop: 0,
              start: videoInfo?.start,
              end: (videoInfo?.end || 0) + 1,
              controls: 0, // 컨트롤바(1: 표시, 0: 미표시)
              autoplay: 1, // 자동재생(1: 설정, 0: 취소)
              rel: 0, // 관련 동영상(1: 표시, 0: 미표시)
              modestbranding: 1, // 컨트롤 바 youtube 로고(1: 미표시, 0: 표시)
              iv_load_policy: 3, // 1: 동영상 특수효과 표시, 3: 동영상 특수효과 미표시
            },
          }}
        />
      </div>
      <div className="w-full lg:w-[85%] py-5 px-8 max-w-[1024px]">
        <div className="relative w-full rounded-lg bg-white shadow-custom py-6 px-8 flex flex-col lg:flex-row justify-between">
          <div className="w-full flex flex-col justify-between h-full">
            {checkDiction ? (
              <>
                <CheckDiction
                  setSecond={setSecond}
                  setCheckDiction={setCheckDiction}
                  playerRef={playerRef}
                  subRangeRef={subRangeRef}
                  showCountRef={showCountRef}
                  isRepeatRef={isRepeatRef}
                  captionArray={caption?.eng}
                />
              </>
            ) : (
              <>
                <div>
                  <div className="flex flex-row justify-between">
                    <button
                      className="rounded-2xl border w-[4rem] hover:bg-[#f7f7f7] active:bg-[#f1f1f1]"
                      onClick={setPlayerSpeed}
                    >
                      {speed}x
                    </button>
                    <div className="text-sm text-blue-500">
                      {count >= 0 && count <= 3 && (
                        <p>한글 자막만 표시됩니다</p>
                      )}
                      {count > 3 && count <= 13 && (
                        <p>한글 자막과 영어 자막이 함께 표시됩니다</p>
                      )}
                      {count > 13 && <p>이제부터는 자막 없이 재생됩니다</p>}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between ">
                    <button
                      className="p-2 absolute top-0 left-[-2rem]
              h-full"
                      onClick={() => {
                        playerSeekTo(findCaptionTime('prev') || 0);
                      }}
                    >
                      <BsChevronLeft />
                    </button>
                    <button
                      className="p-2 absolute top-0 right-[-2rem] h-full"
                      onClick={() => {
                        playerSeekTo(findCaptionTime('next') || 0);
                      }}
                    >
                      <BsChevronRight />
                    </button>
                  </div>
                </div>
                <div className="mt-2 mb-5 min-h-[60px]">
                  <div className="english_subtitle">
                    {count > 3 &&
                      count <= 13 &&
                      caption?.eng?.map((word, index) => {
                        return (
                          <span key={index}>
                            <span
                              onClick={() => searchDict(word)}
                              className={styles.word}
                            >
                              {word}
                            </span>{' '}
                          </span>
                        );
                      })}
                  </div>
                  <div className="korean_subtitle">
                    {count >= 0 && count <= 7 && caption?.kor}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <button
                    className="rounded-full p-2 bg-[#EFEFEF] hover:bg-[#f7f7f7] active:bg-[#f1f1f1]"
                    onClick={() => {
                      isRepeatRef.current = true;
                      setCheckDiction(true);
                    }}
                  >
                    <BsMic />
                  </button>
                  <div>
                    <button
                      onClick={bookMark}
                      className={
                        isMarked
                          ? 'rounded-full p-2 bg-brandP hover:bg-[#8e38ff] active:bg-[#6110ca]'
                          : 'rounded-full p-2 bg-[#EFEFEF] hover:bg-[#f7f7f7] active:bg-[#f1f1f1]'
                      }
                    >
                      {isMarked ? (
                        <BsBookmarkPlusFill color="white" />
                      ) : (
                        <BsBookmarkPlus />
                      )}
                    </button>
                    <button
                      onClick={repeat}
                      className={
                        isRepeat
                          ? 'rounded-full p-2 ml-2 bg-brandP hover:bg-[#8e38ff] active:bg-[#6110ca]'
                          : 'rounded-full p-2 ml-2 bg-[#EFEFEF] hover:bg-[#f7f7f7] active:bg-[#f1f1f1]'
                      }
                    >
                      {isRepeat ? (
                        <BsArrowRepeat color="white" />
                      ) : (
                        <BsArrowRepeat />
                      )}
                    </button>
                    <div className="inline-block rounded-2xl bg-[#EFEFEF] h-[32px] py-1 px-2 align-baseline ml-2">
                      {count}/20
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {searchWord ? (
            <div className="hidden lg:flex flex-col justify-between w-full pl-8 ml-8 border-l">
              <ViewDict word={searchWord} />
            </div>
          ) : (
            ''
          )}
        </div>

        {searchWord ? (
          <div className="lg:hidden shadow-custom mt-4 flex flex-col justify-between  py-6 px-8 relative w-full rounded-xl min-h-[200px] bg-white ">
            <ViewDict word={searchWord} />
          </div>
        ) : (
          ''
        )}
      </div>
      <Link
        href={'/shadowing'}
        className="hidden lg:block fixed left-4 bottom-5 bg-[#fff] hover:bg-brandY p-3 rounded-full shadow-custom"
      >
        <TfiAngleLeft size="1.8rem" />
      </Link>
    </div>
  );
};
export default ViewScript;

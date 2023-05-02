'use client';
import CheckDiction from './CheckDiction';
import ViewDict from './ViewDict';
import { useRef, useState, useEffect, useCallback } from 'react';
import { WordTokenizer } from 'natural';
import styles from './ViewScript.module.css';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { scriptType } from '@/app/types/share';
import {
  BsMic,
  BsBookmarkPlus,
  BsBookmarkPlusFill,
  BsArrowRepeat,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';

const start = '00:00:01.000';
const end = '00:00:09.000';
const subtitles =
  '00:00:01.000 --> 00:00:03.000\n- HELLO.\n\n00:00:03.000 --> 00:00:06.000\n- IM DANIEL. \n- NICE TO MEET YOU.\n\n00:00:06.000 --> 00:00:09.000\n- HHHH.';

const ViewScript = () => {
  const playerRef = useRef<YouTubePlayer>(null);
  const [checkDiction, setCheckDiction] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [tokenized, setTokenized] = useState<string[]>();
  const [speed, setSpeed] = useState<number>(1);
  const [isMarked, setIsMarked] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const isRepeatRef = useRef<boolean>(false);
  const intervalTimeRef = useRef<number>(10);
  const tokenizer = new WordTokenizer(); // 단어 형태소 분석
  const subRangeRef = useRef<{ start: number; end: number }>();

  const searchDict = (word: string): void => {
    setSearchWord(word);
  };

  const bookMark = () => {
    setIsMarked(!isMarked);
  };

  const repeat = () => {
    console.log('repeat click');
    isRepeatRef.current = !isRepeatRef.current;
    setIsRepeat(!isRepeat);
  };

  const convertTime = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(/[:,]/).map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const subtitleArray: scriptType[] = [];
  if (subtitles) {
    const subtitle = subtitles.split('\n\n');
    for (let i = 0; i < subtitle.length; i++) {
      const sub = subtitle[i].split('\n');
      const subtitleTime = sub[0].split(' --> ');
      const subtitleText = sub.slice(1).join('\n');
      if (subtitleTime) {
        subtitleArray.push({
          startTime: convertTime(subtitleTime[0]),
          endTime: convertTime(subtitleTime[1]),
          text: subtitleText,
        });
      }
    }
  }

  const findCaptionTime = (opt: string) => {
    const time = playerRef.current.getCurrentTime();
    // opt: next, prev
    // 반환값 : 양수 또는 -1(양수 == 인터벌, 음수 == 더이상 자막이 없는 경우)
    // 자막 변경이 이루어져야 할 시점을 찾는 함수
    if (opt === 'next') {
      let min_time = Infinity;
      for (const subtitle of subtitleArray) {
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
      for (const subtitle of subtitleArray) {
        if (time > subtitle.endTime && max_time < subtitle.endTime) {
          max_time = subtitle.startTime;
        }
      }
      return max_time === Infinity ? -1 : max_time; //
    }
  };

  const changeSubtitle = (time: number) => {
    for (let i = 0; i < subtitleArray.length; i++) {
      if (
        time >= subtitleArray[i].startTime &&
        time < subtitleArray[i].endTime
      ) {
        subRangeRef.current = {
          start: subtitleArray[i].startTime,
          end: subtitleArray[i].endTime,
        };
        return setTokenized(tokenizer.tokenize(subtitleArray[i].text));
      }
    }
    return setTokenized([]);
  };

  const traceRef = useRef<boolean>(false); // tracePlayer가 작업중인 경우 true
  const tracePlayer = () => {
    console.log(
      'tracePlayer, !traceRef.current:',
      !traceRef.current,
      'isRepeat:',
      isRepeatRef.current,
    );
    if (!traceRef.current) {
      traceRef.current = true;
      console.log('in tracePlayer', 'isRepeat:', isRepeatRef.current);
      return setTimeout(function () {
        console.log(playerRef.current?.getPlayerState());
        if (playerRef.current?.getPlayerState() === 1) {
          console.log(
            'in tracePlayer setTimeout',
            'isRepeatRef:',
            isRepeatRef.current,
          );
          if (!isRepeatRef.current) {
            console.log(
              'in tracePlayer setTimeout-isRepeatRef',
              'isRepeatRef:',
              isRepeatRef.current,
            );
            const current = playerRef.current.getCurrentTime();
            changeSubtitle(current);
            const next = findCaptionTime('next');
            if (next > 0) {
              intervalTimeRef.current = (2 - speed) * (next - current) * 1000; // (2 - 현재 스피드) ==> 자막 인터벌
            }
          } else {
            console.log(subRangeRef.current);
            console.log(intervalTimeRef.current);
            if (subRangeRef.current) {
              intervalTimeRef.current =
                (2 - speed) *
                (subRangeRef.current.end - subRangeRef.current.start) *
                1000;
            }
            // console.log('traceRef => false');
            // traceRef.current = false;
            // playerRef.current.playVideo();
            playerRef.current.seekTo(subRangeRef.current?.start, true);
            console.log(
              'playerRef.current.seekTo, subrange.start:',
              subRangeRef.current?.start,
            );
          }
        }
        console.log('traceRef => false');
        traceRef.current = false;
        // }
      }, intervalTimeRef.current);
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
    // traceRef.current = false;
    console.log('pre tracePlayer', 'isRepeatRef:', isRepeatRef.current);
    const myTimeout = tracePlayer();
    console.log('post tracePlayer', 'isRepeatRef:', isRepeatRef.current);
    return () => {
      clearTimeout(myTimeout); // setInterval(tracePlayer) 후 clear <= 메모리 누수 방지
    };
  }, [intervalTimeRef.current]);

  return (
    <div className="min-h-[150px]">
      <div className={styles.videoContainer}>
        <div id="player"></div>
        <YouTube
          onReady={(event) => {
            playerRef.current = event.target;
          }}
          onStateChange={tracePlayer}
          onEnd={() => {
            if (isRepeatRef.current) {
              playerRef.current.playVideo();
              playerRef.current.seekTo(subRangeRef.current?.start, true);
              tracePlayer();
            }
          }}
          videoId="D8-snVfekto"
          opts={{
            height: '390',
            width: '640',
            playerVars: {
              start: convertTime(start),
              end: convertTime(end) + 1,
              controls: 1, // 컨트롤바(1: 표시, 0: 미표시)
              autoplay: 1, // 자동재생(1: 설정, 0: 취소)
              rel: 0, // 관련 동영상(1: 표시, 0: 미표시)
              modestbranding: 1, // 컨트롤 바 youtube 로고(1: 미표시, 0: 표시)
            },
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.scriptBox}>
          {checkDiction ? (
            <>
              <button
                onClick={() => {
                  setCheckDiction(false);
                  isRepeatRef.current = false;
                }}
              >
                이전으로
              </button>
              <CheckDiction text={tokenized?.join(' ')} />
            </>
          ) : (
            <>
              <div>
                <button
                  className="rounded-2xl border w-[4rem]"
                  onClick={setPlayerSpeed}
                >
                  {speed}x
                </button>
                <button>drill</button>
                <div className="flex flex-row justify-between ">
                  <button
                    className="p-2 absolute top-0 left-[-2rem]
              h-full"
                    onClick={() => {
                      playerSeekTo(findCaptionTime('prev'));
                    }}
                  >
                    <BsChevronLeft />
                  </button>
                  <button
                    className="p-2 absolute top-0 right-[-2rem] h-full"
                    onClick={() => {
                      playerSeekTo(findCaptionTime('next'));
                    }}
                  >
                    <BsChevronRight />
                  </button>
                </div>
              </div>
              <div className="mt-2 mb-5">
                {tokenized?.map((word, index) => {
                  return (
                    <span key={index}>
                      <span
                        onClick={() => searchDict(word)}
                        className={styles.word}
                      >
                        {word}
                      </span>
                      <span> </span>
                    </span>
                  );
                })}
              </div>
              <div className="flex flex-row justify-between items-center">
                <button
                  className="rounded-full p-2 bg-[#EFEFEF]"
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
                        ? 'rounded-full p-2 bg-brandP'
                        : 'rounded-full p-2 bg-[#EFEFEF]'
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
                        ? 'rounded-full p-2 ml-2 bg-brandP'
                        : 'rounded-full p-2 ml-2 bg-[#EFEFEF]'
                    }
                  >
                    {isRepeat ? (
                      <BsArrowRepeat color="white" />
                    ) : (
                      <BsArrowRepeat />
                    )}
                  </button>
                  <div className="inline-block rounded-2xl bg-[#EFEFEF] h-[32px] py-1 px-2 align-baseline ml-2">
                    1/20
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {searchWord ? (
          <div className={styles.dictBox}>
            <ViewDict word={searchWord} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default ViewScript;

from starlette.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
from typing import Union
from fastapi import FastAPI


def int_to_str(time):
    if (time == 0):
        time = "00"
    elif (time//10 == 0):
        time = "0"+str(time)
    elif (time // 100 == 0):
        time = str(time)
    return time


def convert_msec(time):
    if time == 0:
        return "000"
    elif time < 10:
        return "00" + str(time)
    elif time < 100:
        return "0" + str(time)
    else:
        return str(time)


def get_caption(video_id):
    srt = YouTubeTranscriptApi.get_transcript(video_id)
    res = "WEBVTT\n\n"

    for caption in srt:
        st = caption['start']
        ed = caption['start'] + caption['duration']
        ns_hour, ns_min, ns_sec, ns_msec = int(
            st//3600), int(st//60), int(st % 60), int(round(((st % 60) % 1)*1000, 4))
        ne_hour, ne_min, ne_sec, ne_msec = int(
            ed//3600), int(ed//60), int(ed % 60), int(round(((ed % 60) % 1)*1000, 4))

        st_time = f'{int_to_str(ns_hour)}:{int_to_str(ns_min)}:{int_to_str(ns_sec)}.{convert_msec(ns_sec)}'
        ed_time = f'{int_to_str(ne_hour)}:{int_to_str(ne_min)}:{int_to_str(ne_sec)}.{convert_msec(ne_sec)}'

        res += st_time
        res += " --> "
        res += ed_time
        res += "\n"
        res += caption['text']
        res += "\n\n"

    return res


app = FastAPI()


origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/caption/{video_id}")
def read_item(video_id: str):
    return get_caption('SW14tOda_kI')

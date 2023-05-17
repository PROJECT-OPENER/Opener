from starlette.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
from typing import Union
from fastapi import FastAPI
from InterestRecommendations import get_recommendations_api
from Sentence import update_ratings, get_recommendations

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
    
async def get_video_data(video_id):
    query = f"SELECT * FROM shadowingvideo WHERE video_id = {video_id}"
    df = pd.read_sql_query(query, engine)
    return df.to_dict(orient='records')[0]  # Return the first record as a dict


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


@app.get("/fast/caption/{video_id}")
def read_item(video_id: str):
    return get_caption(video_id)

@app.get("/fast/recommendations/{nickname}/{start_index}/{end_index}")
async def get_recommendations_main_api(nickname: str, start_index: int, end_index: int):
    return await get_recommendations_api(nickname, start_index, end_index)

@app.get("/fast/recommendations/{nickname}")
async def get_sentence_api(nickname: str):
    # ratings를 갱신합니다.
    update_ratings()
    # 추천 비디오를 가져옵니다.
    recommended_videos = get_recommendations(nickname)

    return recommended_videos

from fastapi import FastAPI
from sqlalchemy import create_engine
import pandas as pd
from surprise import SVD
from surprise import Dataset, Reader
import numpy as np
import os
from dotenv import load_dotenv

load_dotenv()

mysql_user = os.getenv("MYSQL_USER")
mysql_password = os.getenv("MYSQL_PASSWORD")
mysql_host = os.getenv("MYSQL_HOST")
mysql_db = os.getenv("MYSQL_DB")

app = FastAPI()

engine = create_engine(f'mysql+pymysql://{mysql_user}:{mysql_password}@{mysql_host}/{mysql_db}')

def update_ratings():
    df = pd.read_sql_query("SELECT member_id, video_id, view_count FROM shadowingstatus", engine)
    max_views_by_user = df.groupby('member_id')['view_count'].max()
    df['normalized_views'] = df.apply(lambda row: row['view_count'] / max_views_by_user[row['member_id']], axis=1)
    df['ratings'] = df['normalized_views'] * 5
    df.to_sql('ratings', engine, if_exists='replace', index=False)

def get_recommendations(user_id):
    df = pd.read_sql_query("SELECT * FROM ratings", engine)
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(df[['member_id', 'video_id', 'ratings']], reader)
    trainset = data.build_full_trainset()

    model = SVD()
    model.fit(trainset)

    watched_videos = df[df['member_id'] == user_id]['video_id'].unique()
    all_videos = df['video_id'].unique()
    not_watched_videos = [video for video in all_videos if video not in watched_videos]

    estimated_ratings = [(video, model.predict(user_id, video).est) for video in not_watched_videos]
    estimated_ratings.sort(key=lambda x: x[1], reverse=True)

    recommended_videos = [video for video, rating in estimated_ratings]
    return recommended_videos, len(recommended_videos)

def get_all_unwatched_videos(user_id, recommended_videos):
    query = f"SELECT video_id FROM shadowingvideo WHERE video_id NOT IN (SELECT video_id FROM shadowingstatus WHERE member_id = {user_id})"
    df = pd.read_sql_query(query, engine)
    unwatched_videos = [video for video in df['video_id'].tolist() if video not in recommended_videos]
    return unwatched_videos

@app.get("/fast/recommendations/{member_id}/{start_index}/{end_index}")
async def get_recommendations_api(member_id: int, start_index: int, end_index: int):
    update_ratings()
    
    recommended_videos, recommended_length = get_recommendations(member_id)
    unwatched_videos = get_all_unwatched_videos(member_id, recommended_videos)
    
    all_videos = recommended_videos + unwatched_videos
    all_length = recommended_length + len(unwatched_videos)

    # 선택한 인덱스 범위의 비디오만 반환합니다.
    selected_videos = all_videos[start_index:end_index]
    selected_videos_info = pd.read_sql_query(f"SELECT video_id, thumbnail_url, eng_sentence, kor_sentence FROM shadowingvideo WHERE video_id IN ({','.join(map(str, selected_videos))})", engine)
    
    # Get the videos in the same order as in selected_videos
    selected_videos_info.set_index('video_id', inplace=True)
    selected_videos_info = selected_videos_info.loc[selected_videos]
    selected_videos_info.reset_index(inplace=True)
    
    return {'length': all_length, 'videos': selected_videos_info.to_dict('records')}
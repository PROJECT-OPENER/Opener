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



async def update_ratings():
    df = pd.read_sql_query("SELECT member_id, video_id, view_count FROM shadowingstatus", engine)
    max_views_by_user = df.groupby('member_id')['view_count'].max()
    df['normalized_views'] = df.apply(lambda row: row['view_count'] / max_views_by_user[row['member_id']], axis=1)
    df['ratings'] = df['normalized_views'] * 5
    df.to_sql('ratings', engine, if_exists='replace', index=False)

async def get_video_data(video_id):
    query = f"SELECT video_id, thumbnail_url, eng_sentence, kor_sentence FROM shadowingvideo WHERE video_id = {video_id}"
    df = pd.read_sql_query(query, engine)
    return df.to_dict(orient='records')[0]  # Return the first record as a dict

async def get_member_id(nickname: str):
    query = f"SELECT member_id FROM member WHERE nickname = '{nickname}'"
    df = pd.read_sql_query(query, engine)
    if df.empty:
        return None
    return df['member_id'].values[0]  # Return the first member_id found

async def get_recommendations(user_id):
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

async def get_all_unwatched_videos(user_id, recommended_videos):
    query = f"SELECT video_id FROM shadowingvideo WHERE video_id NOT IN (SELECT video_id FROM shadowingstatus WHERE member_id = {user_id})"
    df = pd.read_sql_query(query, engine)
    unwatched_videos = [video for video in df['video_id'].tolist() if video not in recommended_videos]
    return unwatched_videos

async def get_recommendations_api(nickname: str, start_index: int, end_index: int):
    member_id = await get_member_id(nickname)
    if member_id is None:
        return {"error": f"No member found with the nickname {nickname}."}

    await update_ratings()
    
    recommended_videos, recommended_length = await get_recommendations(member_id)
    unwatched_videos = await get_all_unwatched_videos(member_id, recommended_videos)
    
    all_videos = recommended_videos + unwatched_videos
    all_length = int(recommended_length) + len(unwatched_videos)  # Convert numpy.int64 to int
    
    if start_index > all_length:
        return {"error": "start_index is greater than the length of all videos."}
    
    end_index = min(end_index, all_length)
    
    videos_data = [await get_video_data(int(video)) for video in all_videos[start_index:end_index]]

    return {"length": all_length, "videos": videos_data}
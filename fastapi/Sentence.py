from fastapi import FastAPI
from sqlalchemy import create_engine
import pandas as pd
from surprise import SVD
from surprise import Dataset, Reader
from surprise.model_selection import train_test_split
import numpy as np
import os
import random
from dotenv import load_dotenv

load_dotenv()

mysql_user = os.getenv("MYSQL_USER")
mysql_password = os.getenv("MYSQL_PASSWORD")
mysql_host = os.getenv("MYSQL_HOST")
mysql_db = os.getenv("MYSQL_DB")

app = FastAPI()

engine = create_engine(f'mysql+pymysql://{mysql_user}:{mysql_password}@{mysql_host}/{mysql_db}')

def get_member_id(nickname):
    member_id = pd.read_sql_query(f"SELECT member_id FROM member WHERE nickname = '{nickname}'", engine)
    if not member_id.empty:
        return member_id['member_id'].iloc[0]
    else:
        return None

def update_ratings():
    # 모든 사용자의 조회수 데이터를 가져옵니다.
    df = pd.read_sql_query("SELECT member_id, video_id, view_count FROM shadowingstatus", engine)

    # 각 사용자의 최대 조회수를 계산합니다.
    max_views_by_user = df.groupby('member_id')['view_count'].max()

    # 각 사용자의 조회수를 해당 사용자의 최대 조회수로 나눠 정규화합니다.
    df['normalized_views'] = df.apply(lambda row: row['view_count'] / max_views_by_user[row['member_id']] if max_views_by_user[row['member_id']] else 0, axis=1)

    # 정규화된 조회수를 1~5 사이의 등급으로 변환합니다.
    df['ratings'] = df['normalized_views'] * 5

    # 생성된 ratings를 데이터베이스에 업데이트합니다.
    df.to_sql('ratings', engine, if_exists='replace', index=False)

def get_recommendations(nickname):

    member_id = get_member_id(nickname)
    if member_id is None:
        return {"error": "Nickname not found"}

    # 최신 ratings 데이터를 가져옵니다.
    df = pd.read_sql_query("SELECT * FROM ratings", engine)

    # SVD 모델을 학습합니다.
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(df[['member_id', 'video_id', 'ratings']], reader)
    trainset = data.build_full_trainset()

    model = SVD()
    model.fit(trainset)

    # 현재 사용자가 아직 보지 않은 비디오의 목록을 가져옵니다.
    watched_videos = df[df['member_id'] == member_id]['video_id'].unique()
    all_videos = df['video_id'].unique()
    not_watched_videos = [video for video in all_videos if video not in watched_videos]
    

    # 아직 보지 않은 비디오에 대해 예상 평점을 계산하고, 가장 높은 예상 평점을 가진 비디오를 추천합니다.
    estimated_ratings = [(video, model.predict(member_id, video).est) for video in not_watched_videos]
    estimated_ratings.sort(key=lambda x: x[1], reverse=True)

    # 상위 6개만 추출
    estimated_ratings = estimated_ratings[:6]

    # 만약 추천 가능한 비디오 수가 6개 미만인 경우 아직 사용자가 보지 않은 비디오를 추가합니다.
    if len(estimated_ratings) < 6:
        additional_videos_query = f"SELECT video_id FROM shadowingvideo WHERE video_id NOT IN ({','.join(map(str, watched_videos))},{','.join(map(str, [video for video, rating in estimated_ratings]))}) LIMIT {6 - len(estimated_ratings)}"
        additional_videos = pd.read_sql_query(additional_videos_query, engine)
        for video in additional_videos['video_id']:
            estimated_ratings.append((video, 0))  # 예상 평점을 0으로 설정

    # 추천된 비디오의 정보를 데이터베이스에서 가져옵니다.
    recommended_videos = [video for video, rating in estimated_ratings]
    recommended_videos_info = pd.read_sql_query(f"SELECT video_id, thumbnail_url, eng_sentence, kor_sentence FROM shadowingvideo WHERE video_id IN ({','.join(map(str, recommended_videos))})", engine)

    # 비디오 정보를 예상 평점 순으로 정렬합니다.
    recommended_videos_info['estimated_rating'] = recommended_videos_info['video_id'].map(dict(estimated_ratings))
    recommended_videos_info.sort_values('estimated_rating', ascending=False, inplace=True)
    recommended_videos_info.drop('estimated_rating', axis=1, inplace=True)

    return recommended_videos_info.to_dict('records')

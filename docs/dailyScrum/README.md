# 프로젝트를 하면서 매일 진행한 스크럼 내용입니다.

## 2023-04-18

### 1. Yesterday

- 그라운드 룰 회의
- Jira 컨벤션 회의
- Code 컨벤션 회의
    - IntelliJ 환경설정 확인
- Git 컨벤션을 정함
- 요구사항 회의
    - 기술적인 검증이 필요한게 많았음
- 와이어프레임 구조 회의

### 2. Today Todo

- 요구사항 검증, 검수
    - 완료되어야 DB ERD 설계가 가능
    - 완료되어야 피그마 설계가 가능
- STT 어떤 걸 쓸지, 금액이 얼마인지 조사

## 2023-04-19

### 1. Yesterday

- 요구사항들이 가능한지 검사
    - AI API DATA 사이트에서 발음 평가 AI를 사용해봤지만 API Key가 있어도 사용이 안됐음. ⇒ Azure 사이트를 오늘 이용해볼 예정
    - Openai를 이용하여 문맥검사와 문법검사가 가능한지를 검증 → 구현 가능
    - IFrame Player API를 이용해서 특정 구간 3반복하는 영상 검증 → 구현 가능
    - 유튜브 영상에서 m4a파일로 음원추출 검증 → 구현 가능
    - clova speech를 이용해서 음성 데이터 문자로 변환 → 구현 가능, 유료
    - 피그마 일부와 로고 제작 및 메인 컬러 지정

### 2. Today Todo

- 어제 실패한 발음평가 도전
- 기능 명세서 작성
    - 빠르게 끝이 난다면, ERD 설계 예정
- 피그마 와이어프레임 완성 및 목업 제작 시작
- 로고 제작

## 2023-04-20

### 1. Yesterday

- 피그마 목업 제작 시작
- 피그마 와이어프레임 제작 완료
- 로고 제작 완료
- 발음평가 가능 여부 확인
    - Microsoft Cognitive Services 중 Speech Service의 Pronunciation Assessment 기능DM 통해서 검사 예정
    - 파일을 통해서 할 지, 마이크를 통해서 할 지 추후 검토 예정
- 영상 녹화와 동시에 유튜브 재생 테스트 완료

### 2. Today Todo

- Azure - Backend를 거쳐야할지 여부 결정
- PPT 작성
- 목업 제작 완료하기
- 발표 피드백 받기
- 기능명세서 작성
    - 혹시, 빠르게 끝난다면 ERD 설계 대화 예정

## 2023-04-21

### 1. Yesterday

- 기능 명세
- 기획 발표 준비
    - PPT 작성
    - 스크립트 준비
    - 컨설턴트님과 팀미팅을 통한 피드백 반영
- 피그마 목업 제작완료

### 2. Today Todo

- 기획 발표 진행
- 발표 평가 진행
- Frontend 개발 환경 설정
    - 포팅 메뉴얼 작성
- 기능 명세 구체화
- DB ERD 설계
- 다음 주 지라 보드 작성
- 주간 회고 진행

## 2023-04-24

### 1. Last Week

- 필요한 기술 검증
- 요구사항 명세 작성
- 피그마 완성
- DB 설계 시작

### 2. Today Todo

- FE
    - 모바일 반응형 설계
    - 컴포넌트 CSR, SSR 설계
    - 라우팅 설계
- BE
    - DB 설계


## 2023-04-25

### 1. Yesterday
- FE
    - 컴포넌트 설계
    - 프로젝트 생성
    - 기능 별 레이아웃 시작
- BE
    - API 명세서 초안 작성
    - DB ERD 설계
### 2. Today Todo
- FE
    - 기능별 레이아웃 구현
- BE
    - API 기능 분배
    - DB 검증
    - 프로젝트 구조 설계
- 공통
    - Request, Response DTO 설계

## 2023-04-26

### 1. Yesterday

- 프론트
    - 각자 맡은 레이아웃 하나로 MERGE
- 백엔드
    - ERD 검토 및 완료
    - API 네이밍

### 2. Today Todo

- 프론트
    - STT 인식 제한에 대한 이슈로 다른 라이브러리 찾아볼 예정
    - Glosbe API(영어사전) 서비스 종료된 관계로 다른 API 찾아볼 예정
    - 챌린지 촬영 공식문서 활용하여 타입스크립트 에러 해결 및 무한스크롤 라이브러리 찾아볼 예정
- 백엔드
    - API 네이밍 검토
    - API Request, Response 작성
    - 역할 분담
    - 프로젝트 구조 만들기

## 2023-04-27

### 1. Yesterday

- 프론트
    - 챌린지 촬영 공식문서 활용하여 타입스크립트 에러 해결 및 무한스크롤 라이브러리 찾아볼 예정
- 백엔드
    - Open AI Java 작동 확인
- 공통
    - API URL 네이밍 검토
    - API Request, Response 작성
    - 기능 역할분담

### 2. Today Todo

- 프론트
    - 마이페이지 생성
    - 메모리 누수 코드 수정
    - 챌린지 촬영 공식문서 활용하여 타입스크립트 에러 해결 및 무한스크롤 라이브러리 선택
- 백엔드
    - 건의 사항 : db 추가 - 게임 전적이 있어야 elo 가능
        - 승, 패, 상대 닉네임, 내 닉네임, 상대 점수, 내 점수 ??
    - 프로젝트 구조 만들기
    - Spring Cloud Eureka-Service 만들기
    - Spring Cloud API-Gateway 만들기
- 공통
    - API Request, Response 검토

## 2023-04-28

### 1. Yesterday

- 프론트
    - 챌린지 상황에 맞게 원본 영상 출력 완료
    - 로그인, 회원가입 레아아웃 완료
    - 쉐도잉 학습페이지 메모리 누수 해결 완료
- 백엔드
    - 프로젝트 구조 설계 완료
    - Eureka-service 생성
    - API-service 생성
    - config server 생성
    - (Member, Shadowing, Challenge, Chatting) Service 생성
    - 채팅 점수 테이블 수정
- 공통
    - API Request, Response 검토

### 2. Today Todo

- 프론트
    - 유튜브 유저가 컨트롤 못하게 막기, 제목 및 구독 버튼 뜨는 거 해결하기
    - AI 채팅 레이아웃 완성
    - 마이페이지 레이아웃 시작
    - 로드맵 레이아웃 시작
    - 3시 PR
- 백엔드
    - Shadowing Service Entity, Repository, Service 생성을 통한 CRUD 생성
    - Challenge Service Entity, Repository, Service 생성을 통한 CRUD 생성
    - SQL database EC2 서버에 올리고 연결
- 공통
    - 다음주 Jira 생성


## 2023-05-01

### Last Week

#### FE

- 로드맵 레이아웃 완료
- 유튜브 유저 컨트롤에 맞춰서 챌린지 영상 조작 완료
- 쉐도잉 버튼 기능(구간반복, 속도조절, 이전-다음문장) 추가 완료
- 마이페이지 상단 레이아웃 완료
- AI 채팅 레이아웃 완성

#### BE

- user-service 프로젝트 생성
- api gateway 프로젝트 생성
- eureka 서비스 생성
- config server 구성
- shadowing-service 프로젝트 생성
- challenge-service 프로젝트 생성
- 각 서비스의 SQL database EC2 서버에 올리고 연결
- 회원가입, 닉네임 및 이메일 중복검사, 인증코드 발송 API 작성

#### 공통

- 모든 API 설계 및 검토 완료 (Request, Response까지)

### Today

#### FE

- 채팅 로딩 레이아웃
- 유저 채팅 레이아웃
- 회원가입 API 연결
- 무한스크롤 레이아웃
- 발음체크, 영단어 검색 기능 추가
- 3시 PR

#### BE

- 챌린지 원본 영상 API 구조 생성 및 개발
- 더미 데이터 생성
- 메인 로드맵 비로그인, 로그인 api 개발
- 회원가입, 닉네임 및 이메일 중복검사, 인증코드 발송 API 검증
- 로그인 및 마이페이지 API 개발

## 2023-05-02

### 1. Yesterday

- 프론트
    - 무한스크롤 레이아웃 완료
    - 마이페이지 레이아웃 틀 완료
    - 쉐도잉 학습페이지 버튼 기능구현 완료
    - 유저 채팅 레이아웃 진행 중
- 백엔드
    - jwt 토큰 발급
    - 로그인 로직 작성
    - spring security 인증 진행 중
    - 비로그인 상세 조회 api 작성
    - QueryDsl 학습
    - CI/CD 구축

### 2. Today Todo

- 프론트
    - 무한스크롤 시 지연 로딩 intersection observer로 구현하기
    - 회원가입 API 연결 및 테스트
    - 쉐도잉 목록 페이지 무한스크롤 구현하기
- 백엔드
    - Spring Security 끝내기
    - QueryDsl 학습 및 쿼리 작성

## 2023-05-03

### 1. Yesterday

- 프론트
    - 무한스크롤 시 지연 로딩 intersection observer로 구현하기
    - 회원가입 API 연결 및 테스트
    - 쉐도잉 목록 페이지 무한스크롤 구현하기 << API 연결 후로 미룸
- 백엔드
    - Spring Security 끝내기
    - QueryDsl 학습 및 쿼리 작성
    - CI / CD 구축 완료

### 2. Today Todo

- 프론트
    - 메인페이지 레이아웃 완성
    - 데스크탑 네브바 제작
    - 로그인 api
    - 무한스크롤 페이지 CSS
    - 마이페이지
- 백엔드
    - 챌린지 서비스 원본 영상 API 개발
    - 쉐도잉 영상 조회  api 개발

## 2023-05-04

### 1. Yesterday

- 프론트
    - 메인페이지 레이아웃 완성
    - 데스크탑 네브바 제작
    - 로그인 api
    - 무한스크롤 페이지 CSS
    - 마이페이지 회원정보 수정 페이지 레이아웃
- 백엔드
    - 챌린지 서비스 원본 영상 API 개발
    - 쉐도잉 영상 조회  api 개발

### 2. Today

- 프론트
    - next-auth 통한 로그인, 토큰 관리
    - 챌린지 api 연결
    - 영어사전 json파일 제작
    - 쉐도잉 녹음 기능 일부 수정

- 백엔드
    - Firebase 영상, 사진 업로드
    - 유저 서비스 api 죄다.
    - Spring security 적용
    - 멤버 챌린지 영상 API 개발
    - 쉐도잉 서비스 비로그인 관련 API 개발

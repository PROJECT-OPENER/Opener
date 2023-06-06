![logo (2)](exec/images/%EB%A1%9C%EA%B3%A0.png)

# Opener - 영어 회화 연습을 위한 웹 사이트


## 👉프로젝트 소개

### 서비스 개요

- 스피킹을 통한 영어 학습 웹 사이트

### 주요 기능

- 내 학습 로드맵을 따라 영어 영상 학습
- 쉐도잉을 통한 반복 연습 및 발음 평가를 통한 영어 학습
- 사용자 정보 기반 추천 쉐도잉 영상 제공
- 선택한 주제 기반 AI와의 음성 채팅
- 유저와의 음성 채팅으로 문법, 문맥 점수 기반 게임
- 다양한 상황별 챌린지를 통한 자연스러운 영어 구사 연습
- ELO 점수 시스템을 이용한 랭킹 시스템

</br>

## 🏞️개발 환경

<h3> Frontend</h3>

| Next.js | 13.3 |
| --- | --- |
| Node.js | 18.16.0 |
| VSCode | 1.77.0 |
| react-three-fiber | 8.13.0 |
| tailwind | 3.3.1 |
| npm | 8.19.2 |
| eslint | 8.36.0 |

### Backend

| Spring Boot | 2.7.11 |
| --- | --- |
| Java | 11 |
| IntelliJ | 2022.3.1 |
| FastAPI | 0.95.0 |
| Python | latest |
| MySQL | 8.0.32 |
| Redis | latest |

</br>

## 🤲팀원 구성
<table>
  <tbody>
    <tr>
      <td align="center"><img src="https://github.com/PROJECT-OPENER/Opener/assets/75800620/5727c2a0-fcc7-4e34-b541-e05e7be963dc" width="100px;" height="100px;" alt=""/><br /><sub><b><a href="https://github.com/daydeuk">👑신대득</a></b></sub><br />Backend</td>
      <td align="center"><img src="https://github.com/PROJECT-OPENER/Opener/assets/75800620/b4548dd1-ec6e-47b7-8631-eb8bd1e4a14e" width="100px;" height="100px;" alt=""/><br /><sub><b><a href="https://github.com/imnooy">⭐김윤미</a></b></sub><br />Backend</td>
      <td align="center"><img src="https://github.com/PROJECT-OPENER/Opener/assets/75800620/78c4b438-ad20-4105-b832-8babe2c8abd9" width="100px;" height="100px;" alt=""/><br /><sub><b><a href="https://github.com/L-Woo">이우승</a></b></sub><br />Backend</td>
    </tr>
      <td align="center"><img src="https://github.com/PROJECT-OPENER/Opener/assets/75800620/c783324c-5f10-4a47-92f6-0db2b01b227a" width="100px;" height="100px;" alt=""/><br /><sub><b><a href="https://github.com/moonthree">⭐이문삼</a></b></sub><br />Frontend</td>
      <td align="center"><img src="https://github.com/PROJECT-OPENER/Opener/assets/75800620/e28b6567-1e86-4f5c-8f97-58269dcdae99" width="100px;" height="100px;" alt=""/><br /><sub><b><a href="https://github.com/itmakesmesoft">이은혁</a></b></sub><br />Frontend</td>
      <td align="center"><img src="https://github.com/PROJECT-OPENER/Opener/assets/75800620/c1f66998-b3e5-49fe-8e96-fa761e591d1a" width="100px;" height="100px;" alt=""/><br /><sub><b><a href="https://github.com/sooyeonlee127">이수연</a></b></sub><br />Frontend</td>
   </tr>  
  </tbody>
</table>

<br>

## 📐아키텍처 설계

![image](exec/images/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.png)

</br>

## 💻피그마 설계

![image](exec/images/%ED%94%BC%EA%B7%B8%EB%A7%88.png)

</br>

## 💽ERD 설계

### Member Service / Shaodowing Service
<p align="center">
<img src=exec/images/%EB%A9%A4%EB%B2%84erd.png width="350" height="200">
<img src=exec/images/%EC%89%90%EB%8F%84%EC%9E%89erd.png width="350" height="200">
</p>

### Challenge Service / Chatting Service
<p align="center">
<img src=exec/images/%EC%B1%8C%EB%A6%B0%EC%A7%80erd.png width="350" height="200">
<img src=exec/images/%EC%B1%84%ED%8C%85erd.png width="350" height="200">
</p>

</br>

# 📺주요 화면

## 메인 페이지

### 학습 로드맵 / 인기 챌린지

</br>

- 자신이 현재 학습 중인 쉐도잉 영상 진도가 나타납니다.
- 좋아요 순 인기 챌린지 목록이 나타납니다.

<p align="center">
<img src=exec/images/%EB%82%B4%EB%A1%9C%EB%93%9C%EB%A7%B5.png width="550" height="200">
<img src=exec/images/%EC%9D%B8%EA%B8%B0%EC%B1%8C%EB%A6%B0%EC%A7%80.png width="350" height="200">
</p>


</br>

### 추천 문장 / TREB 랭킹

</br>

<p align="center">
<img src=exec/images/%EC%B6%94%EC%B2%9C%EB%AC%B8%EC%9E%A5.png width="450" height="200">
<img src=exec/images/%EB%9E%AD%ED%82%B9.png width="450" height="200">
</p>


</br>

- 사용자 정보를 기반으로 영어 문장을 추천해줍니다.
- 유저 게임 상위 10위권 사용자들이 나타납니다.

</br>

## 쉐도잉 학습 페이지

### 카테고리 별 쉐도잉 영상 목록

</br>

![쉐도잉목록](exec/images/%EC%89%90%EB%8F%84%EC%9E%89%EB%AA%A9%EB%A1%9D.gif)

</br>

- 카테고리 별로 쉐도잉 영상 목록을 볼 수 있습니다.

</br>

### 쉐도잉 영상 학습 페이지

</br>

![발음평가](exec/images/%EB%B0%9C%EC%9D%8C%ED%8F%89%EA%B0%80.gif)

</br>

- 마이크 버튼을 누르고 문장을 따라 말해 발음 평가를 받을 수 있습니다.
- 정확도, 완성도, 발음, 유창성에 대한 점수를 얻을 수 있습니다.

</br>

![쉐도잉학습상세](exec/images/%EC%89%90%EB%8F%84%EC%9E%89%ED%95%99%EC%8A%B5%EC%83%81%EC%84%B8.png)

</br>

- 쉐도잉 영상의 문장을 반복하면서 학습할 수 있습니다.
- 문장의 단어를 누르면 단어장을 볼 수 있습니다.

</br>

![다음자막](exec/images/%EC%89%90%EB%8F%84%EC%9E%89%ED%95%99%EC%8A%B5%EC%83%81%EC%84%B8.gif)

- 화살표 버튼으로 다음 자막으로 이동해 학습할 수 있습니다.
- 구간 영상을 20번 반복 학습하게 되면 학습이 완료됩니다.

</br>

## 챌린지 페이지

### 원본 챌린지 목록 페이지

</br>

![챌린지목록](exec/images/%EC%B1%8C%EB%A6%B0%EC%A7%80%EB%AA%A9%EB%A1%9D.gif)

</br>

- 참여할 수 있는 챌린지 목록을 볼 수 있습니다.

</br>

### 챌린지를 참여한 사람들의 챌린지 목록 페이지

</br>

![챌린지참여하기](exec/images/%EC%B1%8C%EB%A6%B0%EC%A7%80%EC%83%81%EC%84%B8.png)

</br>

- 해당 챌린지에 참여한 사용자들의 챌린지 목록을 볼 수 있습니다.
- 미리보기를 누르면 원본 챌린지 영상을 볼 수 있습니다.
- 참여하기를 누르면 해당 챌린지에 참여할 수 있습니다.

</br>

### 사용자 챌린지 페이지

</br>

![챌린지재생](exec/images/%EC%B1%8C%EB%A6%B0%EC%A7%80%EC%9E%AC%EC%83%9D.gif)

</br>

- 사용자 챌린지를 볼 수 있습니다.
- 좋아요를 누를 수 있습니다.
- 자신의 챌린지면 삭제할 수 있습니다.
- 공유 버튼을 눌러 링크를 복사할 수 있습니다.

</br>

## 채팅 페이지

</br>

![채팅페이지](exec/images/%EC%B1%84%ED%8C%85%EC%84%A0%ED%83%9D.png)

</br>

- AI와 채팅, 사용자와의 채팅 중 선택할 수 있습니다.

</br>

### AI 채팅

</br>

![AI채팅주제선택](exec/images/%EC%B1%84%ED%8C%85%EA%B4%80%EC%8B%AC%EC%82%AC%EC%84%A0%ED%83%9D.png)

</br>

- 대화하고 싶은 주제를 선택할 수 있습니다.

</br>

![ai채팅시작](exec/images/ai%EC%B1%84%ED%8C%85%EC%8B%9C%EC%9E%91.gif)

</br>

- 선택한 주제를 바탕으로 AI의 첫 채팅이 나옵니다. AI와 자유롭게 대화할 수 있습니다.

</br>

![ai채팅](exec/images/ai%EC%B1%84%ED%8C%85%EB%B3%B4%EB%83%84.gif)

-  마이크 버튼을 눌러 말한 내용이 대화창에 표시됩니다.
-  인식을 잘못한 부분이 있다면 키보드 버튼을 눌러 수정할 수 있습니다.
-  채팅을 보내면 AI의 답장을 받으며 계속 채팅을 이어갈 수 있습니다.
-  말을 잘못 인식했다면 내용을 초기화할 수 있습니다.

</br>

### 유저와 채팅 게임

![유저게임매칭](exec/images/%EB%A7%A4%EC%B9%AD%EA%B8%B0%EB%8B%A4%EB%A6%BC.gif)

</br>

- 대화 게임하기 버튼을 눌러 매칭을 기다릴 수 있습니다.
- ELO 시스템을 통해 자신의 점수 구간에 맞는 사람들이 매칭됩니다.

</br>

![매칭성공](exec/images/%EB%A7%A4%EC%B9%AD%EB%90%A8.gif)

</br>

- 게임할 수 있는 상대가 대기열에 들어오면 매칭되고, 채팅방으로 이동합니다.

</br>

![내가보냄](exec/images/%EC%9C%A0%EC%A0%80%EC%B1%84%ED%8C%85%EB%A7%90%ED%95%A8.gif)
![상대방이보냄](exec/images/%EB%8B%B5%EC%9E%A5%EC%98%B4.gif)

</br>

- 자기 턴에만 음성 채팅을 보낼 수 있습니다.
- 제시어를 포함해 말하면 보너스 점수가 부여됩니다.

</br>

![패스](exec/images/pass.gif)

</br>

- 제한시간 안에 말하지 못하면 pass가 됩니다.

</br>

### 채팅 결과 페이지

</br>

![결과창이동](exec/images/%EA%B2%B0%EA%B3%BC%EB%A1%9C%EC%9D%B4%EB%8F%99.gif)

</br>

- 10번의 턴이 끝나면 결과 페이지로 이동합니다.
- ELO 기반 점수 시스템으로 점수가 부여됩니다.
- 상대와 나의 문법 점수, 문맥 점수를 볼 수 있습니다.
- 
</br>

![문법피드백](exec/images/%EA%B2%B0%EA%B3%BC%ED%8E%98%EC%9D%B4%EC%A7%80.gif)

</br>

- 오른쪽에서 내 문장의 각각 문법 피드백을 볼 수 있습니다.

</br>

## 로드맵 페이지

</br>

![로드맵](exec/images/%EB%A1%9C%EB%93%9C%EB%A7%B5.gif)

</br>

- 현재 내 학습 로드맵을 볼 수 있습니다.
- 순서대로 학습할 시 다음 단계를 볼 수 있습니다.

<br>

---

# 😄프로젝트 회고

## 이문삼

- 공통
    - 프로젝트 설계부터 모두가 적극적으로 참여하여 즐겁게 프로젝트에 참여할 수 있었습니다.
    - 시작부터 문서화를 확실히 하여 개발에 불편함이 없었습니다.
    - 일정관리, 버전관리, 문서관리 툴을 적극 활용하여 협업으로 인한 자원 소모 없이 시너지를 낼 수 있었습니다.
- 프론트엔드
    - 영어 학습 플랫폼이라는 점에서 SEO 최적화와 빠른 초기 페이지 렌더링을 위해 Next.js  채택
    - 코드 안정성을 위해 타입스크립트 사용
    - 코드 리뷰를 통해 코드 퀄리티 상승과 함께 성장 도모
    - 리팩토링을 통해 가독성과 유지보수성, 재사용성을 향상
- 트러블슈팅
    - 핵심 기능인 유저 채팅의 AI 기반 승패 판정의 구현 가능성이 미지수였음
        - 요구사항 분석 ⇒ 제약사항 분석 ⇒ 비교와 평가 ⇒ 프로토타입 검증의 단계를 걸쳐 OpenAI와 BingSpellCheck을 최종적으로 결정

## 이수연

- 이번 프로젝트에서 프론트엔드, 백엔드 모두 각자 도전적인 과제를 했던 거 같습니다.  그렇기 때문에 어떻게 구현해야할지 고민하고 설계하는 과정에서 어려웠지만 구현하고 난 뒤에 성취감이 컸던 거 같습니다.
프로젝트를 진행하며 구현으로 끝나는 게 아니라 성능을 어떻게 개선하면 좋을지에 대해 고민을 많이 했고, 지연 로딩, 무한 스크롤, 커스텀 hook 사용 등 성능 개선을 위해 노력한 부분이 좋았습니다.
마지막 프로젝트에서 즐겁게 협업하여 좋은 프로젝트를 만들 수 있었던 것 같다 모두에게 감사합니다.

## 이은혁

- 역대 가장 힘들고 가장 컸던 프로젝트였다. 작은 실수가 프로젝트에 큰 영향을 줄 수 있었기 때문에 설계부터 꼼꼼히 할 수 밖에 없었다.
- 설계를 꼼꼼히 한 덕분인지, 구현 과정에서 변수는 많지 않았다. 다만 구현하려는 기능과 관련된 라이브러리가 존재하지 않거나, 메모리 누수가 발생하는 등 설계 외적인 부분은 많았다.  이러한 과정 덕분에 이번 프로젝트에서 가장 많은 것을 얻어가는 느낌임
- Next.js와 TypeScript, SWR, THREE.js 등 이번 프로젝트에서 처음 시도해보는 기술도 수 가지…
- 하지만 모든 것을 극복 ⇒ 아주 맛있는 프로젝트였다. 냠냠

## 신대득

- 삼성청년SW아카데미 마지막 프로젝트로서 그동안 배웠던 내용들을 활용하며 정리할 수 있었던 프로젝트
- 마지막 프로젝트인만큼 팀원들이 충분한 능력을 가지고 열심히 참여해주어 팀장으로서의 역할을 편하게 진행할 수 있었다.
- 프로젝트 설계 단계에서 부터 기능 검증 등을 진행하고 필요한 모든 API 목록을 문서화하였던 점이 좋았다.
- 각 기능이 많은 발음평가 등의 많은 API를 사용했기 때문에 MSA 구조로 프로젝트를 설계하게 되었고, 결합도를 최대한 낮추기 위해서 Kafka를 이용한 비동기 통신 및 DB 동기화를 진행하며 많은 경험을 얻어볼 수 있었다.
- 트러블 슈팅
    - 여러 DB를 동기화하는 과정에서 delete쿼리를 사용시에 동기화에 문제가 발생
        - 데이터를 지우는 방식을 delete 쿼리가 아닌 isDelete라는 삭제 여부를 판별할 수 있는 컬럼을 따로 두어 삭제를 관리하여 해결
    - 유저간의 대화를 진행할 때, 새로고침을 하거나 웹 페이지를 닫아 탈주를 하게 되더라도, 상대방이 해당 정보를 모르고 혼자 방에 남는 문제 발생
        - Redis에 현재 접속중이라는 API를 일정한 주기로 통신하여 접속중인 유저의 상태를 알 수 있도록 해결

## 이우승

처음으로 MSA 구조를 적용해본 프로젝트였음에도 불구하고, 그에 필요한 학습 과정을 성공적으로 거쳐 프로젝트에 잘 적용하였습니다.

설계 단계에서는 예외 상황들을 미리 심도있게 검토하여, 그에 대비한 개발을 진행할 수 있었습니다. 이런 준비 과정 덕분에 프로젝트는 순조롭게 진행되었습니다.

마지막 싸피 프로젝트였는데 좋은 팀원들과 즐겁게 개발할 수 있어서 좋았습니다.

## 김윤미

메인 기능이 크고 많은 프로젝트를 개발하면서, 다른 기능이 중단되어도 정상적인 기능은 동작할 수 있게끔 Micro Servie 기반 구조를 설계해본 점이 좋았습니다. 동기적으로 연관 서비스들간의 요청을 처리하는 Feign Client 대신 DB 동기화를 위해 Kafka Connect를 이용했고, Kafka를 이용해 메세지 큐잉 방식으로 비동기적으로 요청을 처리해볼 수 있어 좋았습니다.

백엔드 PL과 Jira를 담당했습니다. 최대한 코드 리뷰를 많이 진행할려고 노력했고, 제 코드도 개선하려고 노력했습니다. 코드 리뷰를 진행하며 더욱 간결하고 구조화된 코드를 작성할 수 있었을 뿐만 아니라 현재 어느 정도까지 개발이 진행된 지 직관적으로 알 수 있어 좋았습니다.

또한 새로운 주가 시작하기 전 미리 할 일을 생각해 등록했고, CSV형태로 Jira 스토리 보드를 작성해 스프린트 시작 시 바로 벌크 파일로 이슈들을 등록해 Jira 이슈 생성 시간을 단축시켜 개발에 집중할 수 있게 한 점도 뿌듯했습니다.

프론트엔드와 백엔드 간의 책임 분리와 철저한 에러 처리도 좋았습니다. 원활한 API 통신을 위해 에러 코드를 직접 커스텀하며 설계했습니다. UX를 생각하며 일어날 에러들에 대해 충분히 생각해 설계하고 개발을 시작한 점이 좋았습니다. 

SSAFY 마지막 프로젝트를 진행하며 좋은 팀원들과 양질의 프로젝트를 진행할 수 있어 너무 행복했습니다. 우승팀 최고~~~!!!

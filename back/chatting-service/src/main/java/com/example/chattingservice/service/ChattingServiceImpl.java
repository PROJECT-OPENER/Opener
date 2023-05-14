package com.example.chattingservice.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.chattingservice.common.exception.ApiException;
import com.example.chattingservice.common.exception.ExceptionEnum;
import com.example.chattingservice.dto.request.FinishGameRequestDto;
import com.example.chattingservice.dto.request.SendMessageRequestDto;
import com.example.chattingservice.dto.response.ChatRoomResponseDto;
import com.example.chattingservice.dto.response.FinishGameResponseDto;
import com.example.chattingservice.dto.response.InterestResponseDto;
import com.example.chattingservice.dto.response.ScoreResponseDto;
import com.example.chattingservice.dto.response.ResultResponseDto;
import com.example.chattingservice.entity.Interest;
import com.example.chattingservice.entity.Keyword;
import com.example.chattingservice.entity.chat.WaitingRoom;
import com.example.chattingservice.entity.member.Member;
import com.example.chattingservice.repository.InterestRepository;
import com.example.chattingservice.repository.MemberRepository;
import com.example.chattingservice.repository.KeywordRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static com.example.chattingservice.entity.redis.RedisKey.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChattingServiceImpl implements ChattingService {
	private final InterestRepository interestRepository;
	private final KeywordRepository keywordRepository;
	private final MemberRepository memberRepository;
	private final SimpMessagingTemplate messagingTemplate;
	private final RedisService redisService;
	private final ObjectMapper objectMapper;

	private final RedisTemplate redisTemplate;

	@Value("${spring.img.baseurl}")
	private String baseImgUrl;

	@PostConstruct
	public void init() {
		redisService.deleteRooms(WAITING.getKey());
	}

	/**
	 * 김윤미
	 * explain : 전체 관심사 조회
	 * @return : 전체 관심사 정보
	 */
	@Override
	@Transactional
	public List<InterestResponseDto> getInterests() {
		List<Interest> interests = interestRepository.findAll();
		if (interests == null)
			throw new ApiException(ExceptionEnum.INTERESTS_NOT_FOUND_EXCEPTION);
		return interests.stream()
			.map(InterestResponseDto::new)
			.collect(Collectors.toList());
	}

	/**
	 * 김윤미
	 * explain : 대기열 생성
	 * @param token : 사용자 토큰
	 */
	@Override
	public synchronized void createWaiting(String token) {
		Member member = getMember(token);

		int score = member.getScore();
		int scoreLimit = getScoreLimit(score);
		boolean existRoom = redisService.existRooms(WAITING.getKey(), score - scoreLimit, score + scoreLimit);
		WaitingRoom chatRoom = WaitingRoom.builder()
			.roomId(UUID.randomUUID().toString())
			.createdBy(member.getNickname())
			.createdAt(LocalDateTime.now())
			.build();
		if (!existRoom) {
			redisService.addWaitingRoom(WAITING.getKey(), chatRoom, score);
		} else {
			if (!redisService.existRoom(WAITING.getKey(), chatRoom)) {
				createRoom(member, score, scoreLimit);
			}
		}
	}

	/**
	 * ELO
	 * @param score
	 * @return
	 */
	public int getScoreLimit(int score) {
		return (score >= 30 && score <= 70) ? 30 : 40;
	}

	/**
	 * 김윤미
	 * explain : 들어갈 방 조회 후 입장 - 방 참여자들에게 방 정보 발신
	 * @param member
	 * @param score
	 * @param scoreLimit
	 */
	public void createRoom(Member member, int score, int scoreLimit) {
		Set<WaitingRoom> waitingRoomSet = redisService.getWaitingRoom(WAITING.getKey(), score - scoreLimit,
			score + scoreLimit);
		List<WaitingRoom> waitingRooms = new ArrayList<>();
		for (Object roomObject : waitingRoomSet) {
			WaitingRoom waitingRoom = objectMapper.convertValue(roomObject, WaitingRoom.class);
			waitingRooms.add(waitingRoom);
		}
		waitingRooms.sort(Comparator.comparing(WaitingRoom::getCreatedAt));
		WaitingRoom room = waitingRooms.get(0);
		Member opposite = memberRepository.findMemberByNickname(room.getCreatedBy())
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

		Keyword keyword = keywordRepository.findKeyword();

		String startNickname = getStartNickname(member.getNickname(), opposite.getNickname());
		ChatRoomResponseDto chatRoom = ChatRoomResponseDto.builder()
			.roomId(room.getRoomId())
			.startNickname(startNickname)
			.keyword(keyword.getKeyword())
			.exampleEng(keyword.getExampleEng())
			.exampleKor(keyword.getExampleKor())
			.build();

		chatRoom.setOtherInfo(opposite.getNickname(), getProfileImg(opposite.getProfile()));
		sendChatRoomToUser(member.getNickname(), chatRoom);
		log.info("{}'s ROOM: {}", member.getNickname(), chatRoom);
		chatRoom.setOtherInfo(member.getNickname(), getProfileImg(member.getProfile()));
		sendChatRoomToUser(opposite.getNickname(), chatRoom);
		log.info("{}'s ROOM: {}", opposite.getNickname(), chatRoom);
		redisService.deleteRoom(WAITING.getKey(), room);
	}

	/**
	 * 김윤미
	 * explain : 첫번째 턴 랜덤 닉네임 반환
	 * @param myNickname : 내 닉네임
	 * @param opNickname : 상대 닉네임
	 * @return
	 */
	private String getStartNickname(String myNickname, String opNickname) {
		int randomVal = (int)(Math.random() * 2);
		return randomVal == 0 ? myNickname : opNickname;
	}

	/**
	 * 김윤미
	 * explain : 프로필 이미지 반환 - null일 시 기본 이미지
	 * @param profile : 프로필 이미지 url
	 * @return
	 */
	private String getProfileImg(String profile) {
		return profile == null ? baseImgUrl : profile;
	}

	/**
	 * 김윤미
	 * explain : 방 정보 발신
	 * @param senderNickname : 수신자 닉네임
	 * @param chatRoom : 방 정보
	 */
	private void sendChatRoomToUser(String senderNickname, ChatRoomResponseDto chatRoom) {
		messagingTemplate.convertAndSend("/sub/user-chat/" + senderNickname, chatRoom);
	}

	/**
	 * 김윤미
	 * explain : 토큰으로 현재 사용자 객체 얻기
	 * @param token : 로그인 토큰
	 * @return : 사용자 객체
	 */
	private Member getMember(String token) {
		token = token.replace("Bearer ", "");
		Long memberId = Long.valueOf(redisService.getMemberId(token));
		if (memberId == null) {
			new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION);
		}
		return memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));
	}

	/**
	 * 김윤미
	 * explain : 게임 종료
	 * @param token : 사용자 토큰
	 * @param finishGameRequestDto : 게임 결과 정보
	 * @param roomId : 방 ID
	 */
	@Override
	public void finishGame(String token, FinishGameRequestDto finishGameRequestDto, String roomId) {
		Member member = getMember(token);
		Member other = memberRepository.findMemberByNickname(finishGameRequestDto.getOtherNickname())
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

		int myChangeScore = finishGameRequestDto.getScoreRequestDto().getMyGrammarScore() + getScoreToInt(
			finishGameRequestDto.getScoreRequestDto().getMyContextScore()) + isWordUsed(
			finishGameRequestDto.getScoreRequestDto().isMyWordUsed());
		int otherChangeScore = finishGameRequestDto.getScoreRequestDto().getOtherGrammarScore() + getScoreToInt(
			finishGameRequestDto.getScoreRequestDto().getOtherContextScore()) + isWordUsed(
			finishGameRequestDto.getScoreRequestDto().isOtherWordUsed());

		String winner = getWinner(member.getNickname(), other.getNickname(), myChangeScore, otherChangeScore);
		int myEloScore = member.getScore();
		int otherEloScore = other.getScore();
		if (winner != null) {
			boolean myWin = winner.equals(member.getNickname());
			myEloScore = getNewEloScore(member.getScore(), other.getScore(), myWin);
			otherEloScore = getNewEloScore(other.getScore(), member.getScore(), !myWin);
		}

		ScoreResponseDto myScoreResponseDto = createScoreResponseDto(member, myEloScore,
			getScoreToInt(finishGameRequestDto.getScoreRequestDto().getMyContextScore()),
			finishGameRequestDto.getScoreRequestDto().getMyGrammarScore(),
			finishGameRequestDto.getScoreRequestDto().isMyWordUsed());
		ScoreResponseDto otherScoreResponseDto = createScoreResponseDto(other, otherEloScore,
			getScoreToInt(finishGameRequestDto.getScoreRequestDto().getOtherContextScore()),
			finishGameRequestDto.getScoreRequestDto().getOtherGrammarScore(), finishGameRequestDto.getScoreRequestDto()
				.isOtherWordUsed());

		FinishGameResponseDto finishGameResponseDto = createFinishGameResponseDto(finishGameRequestDto.getMessageList(),
			myScoreResponseDto, otherScoreResponseDto, winner, other.getNickname());
		sendGameResult(finishGameResponseDto, roomId);

		/**
		 * TODO : kafka producer로 점수 반영 전송
		 */
	}

	/**
	 * 김윤미
	 * explain : 새 ELO 점수 얻기
	 * @param myScore : 내 점수
	 * @param otherScore : 상대 점수
	 * @param hasWon : 승리 유무
	 * @return 새 ELO 점수 반환
	 */
	private int getNewEloScore(int myScore, int otherScore, boolean hasWon) {
		final int K = 32;
		double expectedWinRate = predictWinRate(otherScore, myScore);
		return (int)Math.round(myScore + (K * ((hasWon ? 1 : 0) - expectedWinRate)));
	}

	/**
	 * 김윤미
	 * explain : 승리자 닉네임 반환
	 * @param memberNickname : 내 닉네임
	 * @param otherNickname : 상대 닉네임
	 * @param myChangeScore : 내 증감 점수
	 * @param otherChangeScore : 상대 증감 점수
	 * @return : 승리자 닉네임 - 동점일 시 null
	 */
	private String getWinner(String memberNickname, String otherNickname, int myChangeScore, int otherChangeScore) {
		if (myChangeScore == otherChangeScore) {
			return null;
		}
		return myChangeScore > otherChangeScore ? memberNickname : otherNickname;
	}

	/**
	 * 김윤미
	 * explain : 승률 예측
	 * @param otherScore : 상대 점수
	 * @param myScore : 내 점수
	 * @return : 예측 승률
	 */
	public double predictWinRate(int otherScore, int myScore) {
		return 1 / (1 + Math.pow(10, (otherScore - myScore) / 400));
	}

	/**
	 * 김윤미
	 * explain : int형 점수 반환
	 * @param score : 문자열 점수
	 * @return : int형 점수
	 */
	private int getScoreToInt(String score) {
		score = score.replaceAll("[^0-9]", "");
		return Integer.parseInt(score);
	}

	/**
	 * 김윤미
	 * explain : 제시어 사용 우무 검사해 보너스 점수 반환
	 * @param wordUsed : 제시어 사용 유무
	 * @return : 보너스 점수
	 */
	private int isWordUsed(boolean wordUsed) {
		return wordUsed ? 10 : 0;
	}

	/**
	 * 김윤미
	 * explain : 점수 정보 DTO 얻기
	 * @param member : 사용자 정보
	 * @param eloScore : 사용자의 ELO 점수
	 * @param contextScore : 문맥 점수
	 * @param grammarScore : 문법 점수
	 * @param wordUsed : 제시어 사용 유무
	 * @return : 점수 정보 DTO
	 */
	private ScoreResponseDto createScoreResponseDto(Member member, int eloScore, int contextScore, int grammarScore,
		boolean wordUsed) {
		return ScoreResponseDto.builder()
			.nickname(member.getNickname())
			.currentScore(member.getScore())
			.changeScore(eloScore - member.getScore())
			.contextScore(contextScore)
			.grammarScore(grammarScore)
			.wordUsed(wordUsed)
			.build();
	}

	/**
	 * 김윤미
	 * explain : 게임 결과 DTO 얻기
	 * @param messages : 메시지 정보들
	 * @param myScoreResponseDto : 내 점수 정보
	 * @param otherScoreResponseDto : 상대방 점수 정보
	 * @param winner : 승리 사용자 닉네임
	 * @param otherNickname : 상대 닉네임
	 * @return : 게임 결과 DTO
	 */
	private FinishGameResponseDto createFinishGameResponseDto(
		List<SendMessageRequestDto> messages,
		ScoreResponseDto myScoreResponseDto, ScoreResponseDto otherScoreResponseDto, String winner,
		String otherNickname) {
		return FinishGameResponseDto.builder()
			.result(getResults(messages))
			.myScore(myScoreResponseDto)
			.otherScore(otherScoreResponseDto)
			.winnerNickname(winner)
			.otherNickname(otherNickname)
			.build();
	}

	/**
	 * 김윤미
	 * explain : 게임 결과 정보 발신
	 * @param finishGameResponseDto : 게임 결과 정보
	 * @param roomId : 방 ID
	 */
	public void sendGameResult(FinishGameResponseDto finishGameResponseDto, String roomId) {
		messagingTemplate.convertAndSend("/sub/user-chat/rooms/result/" + roomId, finishGameResponseDto);
	}

	/**
	 * TODO : Open AI
	 * @return
	 */
	private List<ResultResponseDto> getResults(List<SendMessageRequestDto> messages) {
		return messages.stream().map(ResultResponseDto::new)
			.collect(Collectors.toList());
	}
}

package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Business implements TipType {
	TIP1("가장 기억에 남는 업무 성과에 대해 얘기해보세요.", "Talk about your most memorable work achievement"),
	TIP2("당신만의 업무 시작 전 업무 루틴이 있나요? 있으면 공유해주세요.", "Do you have your own pre-work routine? please share if you have."),
	TIP3("당신의 직업의 장점에 대해 얘기해보세요.", "Talk about the strengths of your job."),
	TIP4("최근에 배운 업무 기술에 대해 얘기해보세요.", "Talk about a job skill you learned recently."),
	;

	private String tipTitle;
	private String tipDescription;

}

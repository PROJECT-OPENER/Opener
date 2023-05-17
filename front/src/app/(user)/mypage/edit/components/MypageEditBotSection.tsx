'use client';
import Button from '@/app/components/Button';
import InterestsEdit from './InterestsEdit';
import { useState, useReducer } from 'react';
import { updateNicknameApi, updatePasswordApi } from '@/app/api/userApi';
import useUser from '@/app/hooks/userHook';

interface State {
  nickname: string;
  password: string;
  newPassword1: string;
  newPassword2: string;
}

const reducer = (state: State, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const MypageEditBotSection = () => {
  const { mutate } = useUser();
  const [interestEdit, setInterestEdit] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, {
    nickname: '',
    password: '',
    newPassword1: '',
    newPassword2: '',
  });

  const { nickname, newPassword1, newPassword2 } = state;

  const onChange = (e: { target: any }) => {
    dispatch(e.target);
  };

  const changeNickname = async (newNickname: string) => {
    const response = await updateNicknameApi(newNickname);
    alert(response.message);
    return response;
  };

  const changePassword = async () => {
    if (newPassword1 !== newPassword2) {
      alert('비밀번호가 동일하지 않습니다.');
    } else {
      const response = await updatePasswordApi(newPassword1);
      console.log(response);
    }
  };

  return (
    <div className="my-10">
      <div className="">
        <h1 className=" text-xl font-bold mx-20 my-3">닉네임 수정</h1>
        <div className="relative bg-white rounded-2xl drop-shadow-md mx-20 py-1">
          <input
            name="nickname"
            value={nickname}
            onChange={onChange}
            type="text"
            className="p-3 w-full border-slate-100 focus:outline-none focus:border-[1px] focus:border-brandP pl-12 rounded-2xl"
            placeholder="닉네임"
          />
          <Button
            type="submit"
            text="수정"
            className="modification-submit top-3"
            onClick={() => {
              changeNickname(nickname).then((response) => {
                mutate();
              });
            }}
          />
        </div>
      </div>
      <div className="my-16">
        <h1 className=" text-xl font-bold mx-20 my-3">비밀번호 수정</h1>
        <div className="relative rounded-2xl  drop-shadow-md mx-20 py-1">
          <input
            type="password"
            name="newPassword1"
            value={newPassword1}
            onChange={onChange}
            className="p-3 w-full border-slate-100 focus:outline-none focus:border-[1px] focus:border-brandP pl-12 rounded-t-2xl"
            placeholder="새 비밀번호"
          />
          <input
            type="password"
            name="newPassword2"
            value={newPassword2}
            onChange={onChange}
            className="p-3 w-full border-slate-100 focus:outline-none focus:border-[1px] focus:border-brandP pl-12 rounded-b-2xl"
            placeholder="새 비밀번호 확인"
          />
          <Button
            type="submit"
            text="비밀번호 변경"
            className="validator-submit"
            onClick={() => changePassword()}
          />
        </div>
      </div>
      <div className="my-16">
        <h1 className=" text-xl font-bold mx-20 my-3">나의 관심사 수정</h1>
        <div className="relative rounded-2xl drop-shadow-md mx-20">
          <div className="space-x-2 text-xs py-3">
            {!interestEdit && (
              <>
                <Button
                  type="submit"
                  text="수정"
                  onClick={() => setInterestEdit(!interestEdit)}
                  className="modification-submit -top-10"
                />
              </>
            )}
            {interestEdit && (
              <>
                <Button
                  type="submit"
                  text="접기"
                  className="modification-submit -top-10"
                  onClick={() => {
                    setInterestEdit(false);
                  }}
                />
                <InterestsEdit></InterestsEdit>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MypageEditBotSection;

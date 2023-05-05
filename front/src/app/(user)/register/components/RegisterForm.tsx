'use client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userRegisterInterface } from '@/types/share';
import {
  AiOutlineCalendar,
  AiOutlineCheck,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from 'react-icons/ai';
import { MdOutlineMailLock } from 'react-icons/md';
import { handleDate, secToTime } from '@/util/Math';
import Button from '@/app/components/Button';
import {
  emailAuthApi,
  emailAuthCheckApi,
  emailDuplicateCheckApi,
  nicknameDuplicateCheckApi,
  registerApi,
} from '@/app/api/userApi';

const schema = yup
  .object({
    nickname: yup.string().required('닉네임을 입력해주세요.'),
    email: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('이메일을 입력해주세요.'),
    password: yup
      .string()
      .required('비밀번호를 입력해주세요.')
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
        '비밀번호는 최소 8자 이상, 1개 이상의 숫자, 특수문자, 소문자를 포함해야 합니다.',
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요.'),
    birth: yup
      .date()
      .transform((originalValue) => {
        if (originalValue === '') {
          return null;
        }
        const date = new Date(originalValue);
        return isNaN(date.getTime()) ? null : date;
      })
      .nullable()
      .required('생일을 입력해주세요.'),
    gender: yup
      .mixed()
      .oneOf(Object.values(['MALE', 'FEMALE']))
      .required('성별을 선택해주세요.'),
  })
  .required();

const genderOptions = [
  { value: 'MALE', label: '남' },
  { value: 'FEMALE', label: '여' },
];

const RegisterForm = () => {
  // 이메일 state
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isEmailAuthActive, setIsEmailAuthActive] = useState(false);
  const [checkEmailDuplicate, setCheckEmailDuplicate] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isAuthEmail, setIsAuthEmail] = useState(false);
  const [count, setCount] = useState(180);
  const [eamilAuthCode, setEmailAuthCode] = useState('');
  // 비밀번호 state
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isPasswordConfirmActive, setIsPasswordConfirmActive] = useState(false);
  // 닉네임 state
  const [isNicknameActive, setIsNicknameActive] = useState(false);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  // 생일 state
  const [isBirthActive, setIsBirthActive] = useState(false);
  // 성별 state
  const [gender, setGender] = useState('');

  // 이메일 인증 시간
  useEffect(() => {
    if (isSendEmail) {
      setCount(180);
      const id = setInterval(() => {
        setCount((count) => {
          if (count === 0) {
            clearInterval(id);
            return count;
          }
          return count - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isSendEmail]);

  // react-hook-form, yup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<userRegisterInterface>({
    resolver: yupResolver(schema),
  });
  // form submit : 회원가입
  const handleRegister: SubmitHandler<userRegisterInterface> = async (data) => {
    if (!isAuthEmail) return alert('이메일 인증을 해주세요.');
    if (!isNicknameDuplicate) return alert('닉네임 중복확인을 해주세요.');
    const birth = await handleDate(data.birth);
    const payload = {
      ...data,
      birth,
    };
    try {
      const res = await registerApi(payload);
      if (res) {
        alert('회원가입이 완료되었습니다.');
        window.location.href = '/';
      }
    } catch (err) {
      if (typeof err === 'string') return alert(err);
      return alert('예상치 못한 오류가 발생했습니다.');
    }
  };
  // 이메일 value 체크
  const watchEmail = watch('email');
  useEffect(() => {
    setCheckEmailDuplicate(false);
    setIsSendEmail(false);
    setIsAuthEmail(false);
    setEmailAuthCode('');
  }, [watchEmail]);
  // 이메일 중복확인
  const handleEmailDuplicateCheck = async () => {
    try {
      const email = await schema.validateAt('email', { email: watchEmail });
      const duplicateCheck = await emailDuplicateCheckApi(email);
      if (duplicateCheck) setCheckEmailDuplicate(!checkEmailDuplicate);
      alert('사용 가능한 이메일입니다.');
    } catch (err) {
      if (typeof err === 'string') return alert(err);
      return alert('예상치 못한 오류가 발생했습니다.');
    }
  };
  // 이메일 인증 코드 발송
  const handleSendEmailAuthCode = async () => {
    try {
      const emailAuthCheck = await emailAuthApi(watchEmail);
      if (emailAuthCheck) setIsSendEmail(!isSendEmail);
    } catch (err) {
      if (typeof err === 'string') return alert(err);
      return alert('예상치 못한 오류가 발생했습니다.');
    }
  };
  // 이메일 인증 코드 확인
  const handleEmailAuth = async () => {
    if (count === 0) {
      alert('인증 시간이 초과되었습니다.');
      setCheckEmailDuplicate(false);
      setIsSendEmail(false);
      setIsAuthEmail(false);
      return;
    }
    try {
      const payload = {
        email: watchEmail,
        code: eamilAuthCode,
      };
      const res = await emailAuthCheckApi(payload);
      if (res) setIsAuthEmail(!isAuthEmail);
      alert('인증되었습니다.');
    } catch (err) {
      if (typeof err === 'string') return alert(err);
      return alert('예상치 못한 오류가 발생했습니다.');
    }
  };
  // 닉네임 중복확인
  const watchNickname = watch('nickname');
  useEffect(() => {
    setIsNicknameDuplicate(false);
  }, [watchNickname]);
  const handleNicknameDuplicateCheck = async () => {
    try {
      const nickname = await schema.validateAt('nickname', {
        nickname: watchNickname,
      });
      const res = await nicknameDuplicateCheckApi(nickname);
      if (res) {
        setIsNicknameDuplicate(!isNicknameDuplicate);
      }
    } catch (err) {
      if (typeof err === 'string') return alert(err);
      return alert('예상치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="mt-5 w-[450px]">
      {/* 이메일 */}
      <div className="shadow rounded-md">
        <div className="relative" onBlur={() => setIsEmailActive(false)}>
          <input
            type="text"
            className="validator-input rounded-t-md"
            placeholder="이메일"
            maxLength={30}
            onFocus={() => setIsEmailActive(true)}
            {...register('email')}
          />
          <AiOutlineMail
            className={`${
              isEmailActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
          {!checkEmailDuplicate && !isSendEmail && (
            <button
              type="button"
              className="absolute top-[0.5rem] p-2 bg-brandP text-white right-1 rounded-md text-sm"
              onClick={handleEmailDuplicateCheck}
            >
              중복 확인
            </button>
          )}
          {checkEmailDuplicate && !isSendEmail && (
            <button
              type="button"
              className="absolute top-[0.5rem] p-2 bg-brandP text-white right-1 rounded-md text-sm"
              onClick={handleSendEmailAuthCode}
            >
              인증 하기
            </button>
          )}
          {checkEmailDuplicate && isSendEmail && (
            <button
              type="button"
              className={`${
                isAuthEmail
                  ? 'hidden'
                  : 'absolute top-[0.3rem] w-[77px] p-2 bg-white text-brandP border-2 border-brandP right-1 rounded-md text-sm'
              }`}
              disabled={true}
            >
              {secToTime(count)}
            </button>
          )}
        </div>
        <hr />
        <div className="relative" onBlur={() => setIsEmailAuthActive(false)}>
          <input
            type="text"
            className="validator-input rounded-b"
            placeholder="인증코드"
            onChange={(e) => setEmailAuthCode(e.target.value)}
            value={eamilAuthCode}
            disabled={!isSendEmail}
            onFocus={() => setIsEmailAuthActive(true)}
          />
          {isSendEmail && !isAuthEmail && (
            <button
              type="button"
              className="absolute top-[0.5rem] p-2 bg-brandP text-white right-1 rounded-md text-sm"
              onClick={handleEmailAuth}
            >
              인증 하기
            </button>
          )}
          {isSendEmail && isAuthEmail && (
            <button
              type="button"
              className="absolute top-[0.5rem] p-2 bg-white text-brandP border-2 border-brandP right-1 rounded-md text-sm"
              disabled
            >
              인증 완료
            </button>
          )}
          <MdOutlineMailLock
            className={`${
              isEmailAuthActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
        </div>
      </div>
      <div className="my-3 text-red-500">{errors.email?.message}</div>
      {/* 패스워드 */}
      <div className="shadow rounded-md mt-10">
        <div className="relative" onBlur={() => setIsPasswordActive(false)}>
          <input
            type="password"
            className="validator-input rounded-t"
            placeholder="비밀번호"
            {...register('password')}
            onFocus={() => setIsPasswordActive(true)}
          />
          <AiOutlineLock
            className={`${
              isPasswordActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
        </div>
        <hr />
        <div
          className="relative"
          onBlur={() => setIsPasswordConfirmActive(false)}
        >
          <input
            type="password"
            className="validator-input rounded-b"
            placeholder="비밀번호 확인"
            {...register('confirmPassword')}
            onFocus={() => setIsPasswordConfirmActive(true)}
          />
          <AiOutlineCheck
            className={`${
              isPasswordConfirmActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
        </div>
      </div>
      <div className="my-3 text-red-500">
        {errors.password
          ? errors.password.message
          : errors.confirmPassword?.message}
      </div>
      {/* 닉네임 생년월일 성별 */}
      <div className="shadow rounded-md mt-10">
        <div className="relative" onBlur={() => setIsNicknameActive(false)}>
          <input
            type="text"
            className="validator-input rounded-t"
            placeholder="닉네임"
            {...register('nickname')}
            onFocus={() => setIsNicknameActive(true)}
          />
          <button
            type="button"
            className={`${
              isNicknameDuplicate ? 'bg-gray-400' : 'bg-brandP'
            } absolute top-[0.5rem] p-2 text-white right-1 rounded-md text-sm`}
            onClick={handleNicknameDuplicateCheck}
          >
            {isNicknameDuplicate ? '사용 가능' : '중복 확인'}
          </button>
          <AiOutlineUser
            className={`${
              isNicknameActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
        </div>
        <hr />
        <div className="relative" onBlur={() => setIsBirthActive(false)}>
          <input
            type="date"
            className="validator-input"
            max="9999-12-31"
            {...register('birth')}
            onFocus={() => setIsBirthActive(true)}
          />
          <AiOutlineCalendar
            className={`${
              isBirthActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
        </div>
        <hr />
        <div className="w-full rounded-b bg-white">
          <div className="grid grid-cols-2 rounded-b">
            {genderOptions.map((option) => (
              <div
                key={option.value}
                className={`${
                  gender === option.value ? 'bg-brandP text-white' : 'bg-white'
                } flex justify-center items-center border-r-2 cursor-pointer rounded-b`}
              >
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  {...register('gender')}
                  className="sr-only"
                />
                <label
                  htmlFor={option.value}
                  className={`${
                    gender === option.value ? 'bg-brandP text-white' : ''
                  } w-full h-full p-3 text-center ${
                    option.value === 'MALE' ? 'rounded-bl' : 'rounded-br'
                  }`}
                  onClick={() => {
                    setGender(option.value);
                  }}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-3 text-red-500">
        {errors.nickname
          ? errors.nickname.message
          : errors.birth
          ? errors.birth.message
          : errors.gender?.message}
      </div>
      <Button type="submit" text="회원가입" className="validator-submit" />
    </form>
  );
};

export default RegisterForm;

// 유저 관련 타입
export interface userInterface {
  name: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  birth: string; // Use string instead of Date to avoid validation errors
}
export interface userLoginInterface {
  email: string;
  password: string;
}
export interface userRegisterInterface {
  email: string;
  password: string;
  confirmPassword?: string;
  nickname: string;
  birth: string; // YYYY-MM-DD string format
  gender: 'MALE' | 'FEMALE'; // enum
}
// end of 유저 관련 타입

// 쉐도잉 관련 타입
export interface scriptType {
  startTime: number;
  endTime: number;
  text: string;
}
// end of 쉐도잉 관련 타입

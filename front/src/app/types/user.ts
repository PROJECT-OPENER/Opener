// 예시 용도
export interface user {
  name: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  birth: string; // Use string instead of Date to avoid validation errors
}
export interface scriptType {
  startTime: number;
  endTime: number;
  text: string;
}

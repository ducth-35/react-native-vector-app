import {
  HANDLE_SIGN_IN,
  USER_LOGOUT,
  VERIFY_OTP,
  HANDLE_REGISTER,
  CREATE_OTP,
  GET_USER_INFOR,
  GET_OTP,
} from "./auth.type";

export const signIn = (body?: SignInParam) => ({
  type: HANDLE_SIGN_IN,
  payload: { body },
});

export const register = (body?: RegisterInterface) => ({
  type: HANDLE_REGISTER,
  payload: { body },
});

export const createOTP = (body: OTPInterface) => ({
  type: CREATE_OTP,
  payload: { body },
});

export const getOTP = (body: OTPInterface) => ({
  type: GET_OTP,
  payload: { body },
});

export const verifyOTP = (body: VerifiyOTPinterface) => ({
  type: VERIFY_OTP,
  payload: { body },
});

export const getUserInfor = (body: { role: string }) => ({
  type: GET_USER_INFOR,
  payload: { body },
});

export const logOut = () => ({
  type: USER_LOGOUT,
});

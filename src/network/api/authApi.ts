import { NetWork } from "..";
import { API_URL } from "../url";
import { getRequestUrl } from "../utils";

const signIn = (body: SignInParam) => {
  const url = getRequestUrl(API_URL.login);
  return NetWork.post(url, body);
};

const register = (body: RegisterInterface) => {
  const url = getRequestUrl(API_URL.register);
  return NetWork.post(url, body);
};

const registerTutor = (body: SignUpTutorInterface) => {
  const url = getRequestUrl(API_URL.register_tutor);
  return NetWork.post(url, body);
};
const registerParent = (body: SignUpParentInterface) => {
  const url = getRequestUrl(API_URL.register_parent);
  return NetWork.post(url, body);
};
const refreshToken = () => {
  const url = getRequestUrl(API_URL.refresh_token);
  return NetWork.post(url);
};

const createOTP = (body: OTPInterface) => {
  const url = getRequestUrl(API_URL.create_otp);
  return NetWork.post(url, body);
};

const getOTP = (phone: string) => {
  const params = {
    phone: phone,
  };
  return NetWork.get(API_URL.get_otp, params);
};

const verifyOTP = (body: VerifiyOTPinterface) => {
  const url = getRequestUrl(API_URL.verify_otp);
  return NetWork.post(url, body);
};

export const AuthApi = {
  signIn,
  register,
  registerTutor,
  registerParent,
  refreshToken,
  createOTP,
  getOTP,
  verifyOTP,
};

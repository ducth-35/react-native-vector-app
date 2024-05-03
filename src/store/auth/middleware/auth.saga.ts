import { call, put, takeLatest } from "redux-saga/effects";
import {
  HANDLE_SIGN_IN,
  VERIFY_OTP,
  USER_LOGOUT,
  HANDLE_REGISTER,
  CREATE_OTP,
  GET_USER_INFOR,
  GET_OTP,
} from "./auth.type";
import { IAction, IResponse } from "../configStore";
import { authAction } from "../authSlice";
import { AuthApi } from "@/network/api/authApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import {
  navigate,
  navigateAndSimpleReset,
} from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { homeApi } from "@/network/api/homeApi";
import { dispatch } from "@/common/redux";
import { USER_TYPE } from "@/utils/enum";
import ToastUtils from "@/utils/toastUtils";
import { getOTP } from "./auth.action";

function* handleSignIn(action: IAction) {
  const {
    payload: {
      body: { phoneNumber, password, deviceToken },
    },
  } = action;
  // yield put(authAction.removeAllData());
  yield put(authAction.authStart());
  const bodySignIn: SignInParam = {
    phoneNumber: phoneNumber,
    password: password,
    deviceToken: deviceToken,
  };
  const res: IResponse = yield call(AuthApi.signIn, bodySignIn);

  if (res?.status === RESPONSE_CODE.SUCCESS) {
    const {
      data: { accessToken },
    } = res?.data;
    console.log(accessToken);

    yield put(authAction.setToken(accessToken));
    const response: IResponse = yield call(homeApi.getUserInfor);

    if (response?.status === RESPONSE_CODE.SUCCESS) {
      dispatch(authAction.updateUserInfor(response?.data?.data));
      yield put(authAction.setAuthen(true));
      navigateAndSimpleReset(APP_SCREEN.MAIN_TAB);
      // ToastUtils.show("Đăng nhập thành công !");
    }
  } else {
    const messageError = getErrorMessage(res);
    if (typeof messageError?.message !== "string") {
      ToastUtils.show("Đăng nhập thất bại !");
    } else {
      yield put(authAction.authFail(messageError?.message));
    }
  }
  yield put(authAction.authFinished());
}

function* handleCreateOTP(action: IAction) {
  const {
    payload: {
      body: { phoneNumber },
    },
  } = action;
  yield put(authAction.authStart());
  const bodyCreateOTP: OTPInterface = {
    phoneNumber: phoneNumber,
  };
  const res: IResponse = yield call(AuthApi.createOTP, bodyCreateOTP);
  if (res?.status === RESPONSE_CODE.SUCCESS) {
    yield put(getOTP({ phoneNumber: phoneNumber }));
  } else {
    yield put(authAction.authFinished());
  }
}

function* handleGetOTP(action: IAction) {
  const {
    payload: {
      body: { phoneNumber },
    },
  } = action;
  const response: IResponse = yield call(AuthApi.getOTP, phoneNumber);
  if (response?.status === RESPONSE_CODE.SUCCESS) {
    const {
      data: { otp_code },
    } = response?.data;
    console.log(otp_code);
    navigate(APP_SCREEN.VERIFY_NUMBER_SCREEN, { phone: phoneNumber });
    yield put(authAction.authFinished());
  } else {
    yield put(authAction.authFinished());
  }
}

function* handleVerifyOTP(action: IAction) {
  const {
    payload: {
      body: { phoneNumber, otpCode },
    },
  } = action;
  yield put(authAction.authStart());
  const bodyVerify = {
    phoneNumber: phoneNumber,
    otpCode: otpCode,
  };
  const res: IResponse = yield call(AuthApi.verifyOTP, bodyVerify);
  if (res?.status === RESPONSE_CODE.SUCCESS) {
    navigate(APP_SCREEN.CREATE_PASSWORD_SCREEN, { phone: phoneNumber });
    yield put(authAction.authFinished());
  } else {
    const messageError = getErrorMessage(res);
    yield put(authAction.authFail(messageError?.message));
    yield put(authAction.authFinished());
  }
}

function* handleRegister(action: IAction) {
  try {
    yield put(authAction.authStart());
    const {
      payload: {
        body: { fullName, phone, deviceToken, password, confirmPassword, role },
      },
    } = action;
    const bodyRegister: RegisterInterface = {
      fullName: fullName,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
      deviceToken: deviceToken,
      role: role,
    };
    const res: IResponse = yield call(AuthApi.register, bodyRegister);

    if (res?.status === RESPONSE_CODE.SUCCESS) {
      yield put(authAction.authFinished());
      const {
        data: { accessToken },
      } = res?.data;
      yield put(authAction.setToken(accessToken));
      const response: IResponse = yield call(homeApi.getUserInfor);
      if (response?.status === RESPONSE_CODE.SUCCESS) {
        dispatch(authAction.updateUserInfor(response?.data?.data));
        //set authen state will navigate screen to homeScreen
        yield put(authAction.setAuthen(true));
        if (role === USER_TYPE.TUTOR) {
          navigate(APP_SCREEN.REGISTER_INFOR_TUTOR_SCREEN);
        } else {
          navigate(APP_SCREEN.REGISTER_INFOR_PARENT_SCREEN);
        }
      }
    } else {
      yield put(authAction.authFinished());
    }
  } catch (error) {
    yield put(authAction.authFinished());
  }
}
function* handleGetUserInfor(action: IAction) {
  const response: IResponse = yield call(homeApi.getUserInfor);
  if (response?.status === RESPONSE_CODE.SUCCESS) {
    dispatch(authAction.updateUserInfor(response?.data?.data));
  }
}

function* logOutAccount() {}

function* authSaga() {
  yield takeLatest(HANDLE_SIGN_IN, handleSignIn);
  yield takeLatest(HANDLE_REGISTER, handleRegister);
  yield takeLatest(CREATE_OTP, handleCreateOTP);
  yield takeLatest(GET_OTP, handleGetOTP);
  yield takeLatest(VERIFY_OTP, handleVerifyOTP);
  yield takeLatest(GET_USER_INFOR, handleGetUserInfor);
  yield takeLatest(USER_LOGOUT, logOutAccount);
}

export default authSaga;

import { getFcmToken } from "@/common/firebase/FirebaseMessage";
import { dispatch } from "@/common/redux";
import { authAction } from "@/store/auth/authSlice";

const handleUpdateFcmToken = async () => {
  const fcmToken = await getFcmToken();
  if (fcmToken) {
    dispatch(authAction.setDeviceToken(fcmToken));
  }
};

export default {
  handleUpdateFcmToken,
};

import { dispatch } from "@/common/redux";
import { navigateAndSimpleReset } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { AuthApi } from "@/network/api/authApi";
import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import { authAction } from "@/store/auth/authSlice";
import ToastUtils from "@/utils/toastUtils";
import { useState } from "react";

export const useUpdateInforParent = () => {
  const [state, setState] = useState<{
    loading: boolean;
  }>({
    loading: false,
  });
  const updateInforParent = async (body: SignUpParentInterface) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const res = await AuthApi.registerParent(body);
      if (res?.status === RESPONSE_CODE.SUCCESS) {
        const response = await homeApi.getUserInfor();
        if (response?.status === RESPONSE_CODE.SUCCESS) {
          dispatch(authAction.updateUserInfor(response?.data?.data));
          setState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          navigateAndSimpleReset(APP_SCREEN.MAIN_TAB);
          ToastUtils.show("Cập nhật thông tin phụ huynh thành công !");
        }
      } else {
        const messageError = getErrorMessage(res);
        ToastUtils.show(messageError?.message);
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    } catch (error) {
      console.log(error);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };
  return { state, updateInforParent };
};

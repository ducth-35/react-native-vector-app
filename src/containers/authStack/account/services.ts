import { dispatch } from "@/common/redux";
import { goBack } from "@/navigators/navigation-services";
import { AuthApi } from "@/network/api/authApi";
import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import { UploadService } from "@/services/upload-image";
import { authAction } from "@/store/auth/authSlice";
import ToastUtils from "@/utils/toastUtils";
import { useState } from "react";

export const useUpdateInforParent = () => {
  const [state, setState] = useState<{
    loading: boolean;
  }>({
    loading: false,
  });
  const { uploadImage } = UploadService.useUploadImage();

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
          goBack();
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

export const useUpdateInforTutor = () => {
  const [state, setState] = useState({
    loading: false,
  });
  const updateInforTutor = async (body: SignUpTutorInterface) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    try {
      const res = await AuthApi.registerTutor(body);
      if (res?.status === RESPONSE_CODE.SUCCESS) {
        const response = await homeApi.getUserInfor();
        if (response?.status === RESPONSE_CODE.SUCCESS) {
          dispatch(authAction.updateUserInfor(response?.data?.data)); // what happening? error when calling in here
          setState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          goBack();
          ToastUtils.show("Cập nhật thông tin gia sư thành công !");
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

  return { state, updateInforTutor };
};

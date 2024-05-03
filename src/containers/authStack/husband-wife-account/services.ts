import { dispatch } from "@/common/redux";
import { goBack } from "@/navigators/navigation-services";
import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import { authAction } from "@/store/auth/authSlice";
import ToastUtils from "@/utils/toastUtils";
import { useState } from "react";

export const useDeleteParent = () => {
  const [state, setState] = useState<{
    loading: boolean;
  }>({
    loading: false,
  });
  const addParent = async (body: ParentInterface) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = await homeApi.addParent(body);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const response = await homeApi.getUserInfor();

      if (response?.status === RESPONSE_CODE.SUCCESS) {
        dispatch(authAction.updateUserInfor(response?.data?.data));
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        goBack();
        ToastUtils.show("Thêm tài khoản thành công !");
      }
    } else {
      const messageError = getErrorMessage(res);
      ToastUtils.show(messageError?.message);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };
  const deleteParent = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = await homeApi.deleteParent();
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const response = await homeApi.getUserInfor();
      if (response?.status === RESPONSE_CODE.SUCCESS) {
        dispatch(authAction.updateUserInfor(response?.data?.data));
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        ToastUtils.show("Xoá tài khoản thành công !");
      }
    } else {
      const messageError = getErrorMessage(res);
      ToastUtils.show(messageError?.message);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };
  return { state, deleteParent, addParent };
};

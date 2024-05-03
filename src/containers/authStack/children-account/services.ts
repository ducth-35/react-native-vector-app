import { dispatch } from "@/common/redux";
import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import { authAction } from "@/store/auth/authSlice";
import ToastUtils from "@/utils/toastUtils";
import { useState } from "react";

export const useAddStudents = () => {
  const [state, setState] = useState<{
    loading: boolean;
  }>({
    loading: false,
  });
  const addStudent = async (body: ChildrenInterface[]) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = await homeApi.addStudents(body);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const response = await homeApi.getUserInfor();
      if (response?.status === RESPONSE_CODE.SUCCESS) {
        dispatch(authAction.updateUserInfor(response?.data?.data));
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        ToastUtils.show("Thêm tài khoản con thành công !");
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
  const deleteStudent = async (body: { ids: number[] }) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = await homeApi.deleteStudents(body);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const response = await homeApi.getUserInfor();
      if (response?.status === RESPONSE_CODE.SUCCESS) {
        dispatch(authAction.updateUserInfor(response?.data?.data));
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        ToastUtils.show("Xoá tài khoản con thành công !");
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

  return { state, addStudent, deleteStudent };
};

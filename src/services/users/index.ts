import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import ToastUtils from "@/utils/toastUtils";
import React from "react";


export const useDeleteUser = () => {

  const deleteUser = async () => {
    const res = await homeApi.deleteUser();
    return res
  };
  return {deleteUser};
};

export const useLogout = () => {
  const logoutCallAPI = async () => {
    const res = await homeApi.logoutUser();
    return res
  };
  return {logoutCallAPI};
}
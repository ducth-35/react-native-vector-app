import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import { refreshDataSelector } from "@/store/auth/authSelector";
import ToastUtils from "@/utils/toastUtils";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export const useGetBooking = () => {
  const refreshData = useSelector(refreshDataSelector);
  const [status, setStatus] = useState<string>("");
  const [state, setState] = useState<{
    loading: boolean;
    data: BookingInterface[];
  }>({
    loading: false,
    data: [],
  });
  const getBooking = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = await homeApi.getBooking(status);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const { data } = res?.data;
      setState((prevState) => ({
        ...prevState,
        loading: false,
        data: data,
      }));
    } else {
      const messageError = getErrorMessage(res);
      ToastUtils.show(messageError?.message);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  React.useEffect(() => {
    getBooking();
  }, [refreshData, status]);

  return { state, setStatus };
};

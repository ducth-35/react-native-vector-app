import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import ToastUtils from "@/utils/toastUtils";
import React, { useState } from "react";

export const useGetBooking = () => {
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
    const res = await homeApi.getBooking();
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
  }, []);

  return { state };
};

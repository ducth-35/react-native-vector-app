import { dispatch } from "@/common/redux";
import { goBack } from "@/navigators/navigation-services";
import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import ToastUtils from "@/utils/toastUtils";
import React, { useState } from "react";
import { authAction } from "@/store/auth/authSlice";

export const useGetBookingDetails = (id: number) => {
  const [state, setState] = useState<{
    loading: boolean;
    data: BookingInterface;
  }>({
    loading: false,
    data: {},
  });
  const getBooking = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = await homeApi.getBookingDetails(id);
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

export const useUpdateBooking = () => {
  const [stateBooking, setStateBooking] = useState<{
    loading: boolean;
    data: BookingInterface;
  }>({
    loading: false,
    data: {},
  });
  const updateBooking = async (body: BookingInterface) => {
    setStateBooking((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = await homeApi.updateBooking(body);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setStateBooking((prevState) => ({
        ...prevState,
        loading: false,
      }));
      goBack();
      ToastUtils.show("Cập nhật thông tin thành công");
      dispatch(authAction.refreshData());
    } else {
      setStateBooking((prevState) => ({
        ...prevState,
        loading: false,
      }));
      const messageError = getErrorMessage(res);
      ToastUtils.show(messageError?.message);
    }
  };
  return { stateBooking, updateBooking };
};

import { goBack, navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import ToastUtils from "@/utils/toastUtils";
import { useState } from "react";

export const usePostBooking = () => {
  const [state, setState] = useState<{
    loading: boolean;
    showModal: boolean;
  }>({
    loading: false,
    showModal: false,
  });
  const postBooking = async (body: BookingInterface) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = await homeApi.postBooking(body);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const { id } = res.data?.data;
      setState((prevState) => ({
        ...prevState,
        loading: false,
        showModal: true,
      }));
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          showModal: false,
        }));
        navigate(APP_SCREEN.BOOKING_INFOR_PARENT_SCREEN, { id: id });
      }, 2000);
    } else {
      const messageError = getErrorMessage(res);
      ToastUtils.show(messageError?.message);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };
  return { state, postBooking };
};

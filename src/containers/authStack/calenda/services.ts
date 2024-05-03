import { goBack, navigate } from "@/navigators/navigation-services";
import { calendarApi } from "@/network/api/calendarApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import ToastUtils from "@/utils/toastUtils";
import React from "react";
import { formatDateTime } from "@/utils/format-time";
import { TimelineEventProps } from "react-native-calendars";
import { authAction } from "@/store/auth/authSlice";
import { dispatch } from "@/common/redux";
import { useSelector } from "react-redux";
import { refreshDataSelector } from "@/store/auth/authSelector";
import { APP_SCREEN } from "@/navigators/screen-type";

export const useCreateEvent = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const createEvent = async (params: calendarInterface) => {
    setLoading(true);
    const res = await calendarApi.createCalendar(params);
    if (res.status === RESPONSE_CODE.SUCCESS) {
      setLoading(false);
      ToastUtils.show("Thêm lịch thành công !");
      dispatch(authAction.refreshData());
      goBack();
    } else {
      const messageError = getErrorMessage(res);
      ToastUtils.show(messageError?.message);
      setLoading(false);
    }
  };
  return { loading, createEvent };
};

export const useGetEvent = (month: number) => {
  const refreshData = useSelector(refreshDataSelector);
  const [data, setData] = React.useState<TimelineEventProps[]>([]);
  const getEvent = async () => {
    const params = { month: month, year: new Date().getFullYear() };
    const res = await calendarApi.getCalendar(params);
    const { data } = res?.data;
    if (res.status === RESPONSE_CODE.SUCCESS) {
      const transformedEvents = data.map((event?: calendarInterface) => ({
        id: event?.id?.toString() || "",
        start: formatDateTime(event?.startTime) || "",
        end: formatDateTime(event?.endTime) || "",
        title: event?.title || "",
        summary: event?.description || "",
        color: event?.bookingId === null ? "#cfecff" : "#fdf1db",
      }));
      setData(transformedEvents ? transformedEvents : []);
    }
  };
  React.useEffect(() => {
    getEvent();
  }, [month, refreshData]);
  return { data };
};

export const useGetEventDetail = (id: number) => {
  const refreshData = useSelector(refreshDataSelector);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<calendarInterface>();

  const getEventDetail = async () => {
    setLoading(true);
    const res = await calendarApi.getCalendarDetails(id);
    const { data } = res?.data;
    if (res.status === RESPONSE_CODE.SUCCESS) {
      setData(data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getEventDetail();
  }, [refreshData]);
  return { loading, data };
};

export const useUpdateEvent = (id: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const updateEvent = async (params: calendarInterface, type?: string) => {
    setIsLoading(true);
    const res = await calendarApi.updateCalendar(id, params);
    if (res.status === RESPONSE_CODE.SUCCESS) {
      setIsLoading(false);
      ToastUtils.show("Cập nhật thành công !");
      dispatch(authAction.refreshData());
      if (type === "end") {
        navigate(APP_SCREEN.CREATE_RESULT_LEARNING, { id: id });
      } else {
        goBack();
      }
    } else {
      const messageError = getErrorMessage(res);
      ToastUtils.show(messageError?.message);
      setIsLoading(false);
    }
  };
  return { isLoading, updateEvent };
};

export const useCancelEvent = (id: number) => {
  const [isloading, setIsLoading] = React.useState<boolean>(false);
  const cancelEvent = async () => {
    let params = { status: "Cancelled" };
    setIsLoading(true);
    const res = await calendarApi.cancelCalendar(id, params);
    if (res.status === RESPONSE_CODE.SUCCESS) {
      setIsLoading(false);
      ToastUtils.show("Xoá lịch thành công !");
      dispatch(authAction.refreshData());
      goBack();
    } else {
      const messageError = getErrorMessage(res);
      ToastUtils.show(messageError?.message);
      setIsLoading(false);
    }
  };
  return { isloading, cancelEvent };
};

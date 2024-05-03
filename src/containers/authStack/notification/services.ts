import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import ToastUtils from "@/utils/toastUtils";
import React from "react";

export const useNotification = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<NotificationInterface[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = async () => {
    setLoading(true);
    const response = await homeApi.getNotification();
    const { data } = response.data;
    if (response?.status === RESPONSE_CODE.SUCCESS) {
      setData(data);
      setLoading(false);
      setRefreshing(false);
      await homeApi.getTotalNotification();
    } else {
      const messageError = getErrorMessage(response);
      ToastUtils.show(messageError?.message);
      setLoading(false);
      setRefreshing(false);
    }
  }; 

  const onRefresh = () => {
    setRefreshing(true);
  };

  React.useEffect(() => {
    if (refreshing) {
      getAllNotifications();
    }
  }, [refreshing]);

  return { loading, data, refreshing, onRefresh };
};

export const useTotalNotification = () => {
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    getTotalNotification();
  }, []);

  const getTotalNotification = async () => {
    const response = await homeApi.getTotalNotification();
    const { data } = response.data;
    if (response?.status === RESPONSE_CODE.SUCCESS) {
      setTotal(data?.total);
    }
  };

  return { total };
};

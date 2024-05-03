import { navigateAndSimpleReset } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { tutorApi } from "@/network/api/tutorApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import ToastUtils from "@/utils/toastUtils";
import React, { useState } from "react";
export const useGetTeachingClassTutor = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData([]);
    }, 1000);
  }, []);
  return { data, loading };
};

export const useCreateRating = () => {
  const [state, setState] = useState<{
    loading: boolean;
  }>({
    loading: false,
  });
  const createRating = async (body: RatingPayload) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = await tutorApi.createRating(body);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
        }));
        navigateAndSimpleReset(APP_SCREEN.MAIN_TAB);
      }, 1000);
    } else {
      const messageError = getErrorMessage(res);
      ToastUtils.show(messageError?.message);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };
  return { state, createRating };
};

export const useGetRating = (tutorId: number) => {
  const [ratings, setRatings] = React.useState<RatingResponseItem[]>([]);

  const fetchData = async () => {
    const res = await tutorApi.getRating({ tutorId: tutorId });
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const ratings = res?.data?.data.map(
        (item: RatingResponseItem) => item
      ) as RatingResponseItem[];
      setRatings(ratings);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return { ratings };
};

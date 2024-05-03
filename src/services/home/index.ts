import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import React from "react";

export const useGetTutorSuggestion = () => {
  const [state, setState] = React.useState<{
    data: TutorSuggestionInterface[];
    loading: boolean;
  }>({
    data: [],
    loading: true,
  });

  const fetchData = async () => {
    const res = await homeApi.getTutorSuggestion();
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const { data } = res?.data;
      setState((prevState) => ({ ...prevState, data: data, loading: false }));
    } else {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return { state };
};

export const useGetCenters = () => {
  const [state, setState] = React.useState<{
    data: CenterInterface[];
    loading: boolean;
  }>({
    data: [],
    loading: true,
  });

  const fetchData = async () => {
    const res = await homeApi.getCenters();
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const { data } = res?.data;
      setState((prevState) => ({ ...prevState, data: data, loading: false }));
    } else {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return { state };
};

export const getDetailsTutor = (tutor_id: number) => {
  const [state, setState] = React.useState<{
    data: TutorSuggestionInterface | null;
    loading: boolean;
  }>({
    data: null,
    loading: true,
  });

  const fetchData = async () => {
    const res = await homeApi.getDetailsTutor(tutor_id);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      if (res?.status === RESPONSE_CODE.SUCCESS) {
        const { data } = res?.data;
        setState((prevState) => ({ ...prevState, data: data, loading: false }));
      } else {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return { state };
};

import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { useState, useEffect } from "react";

export const useFilter = (
  params: ParamsFilter
): {
  state: {
    data: TutorSuggestionInterface[];
    loading: boolean;
  };
  onLoadMore: () => void;
} => {
  const pageSize = 10;
  const [state, setState] = useState<{
    data: TutorSuggestionInterface[];
    loading: boolean;
  }>({
    data: [],
    loading: true,
  });

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async (pageNumber: number, appendData: boolean) => {
    const res = await homeApi.filter(params, pageNumber, pageSize);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const { data } = res?.data;
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      setState((prevState) => ({
        data: appendData ? [...prevState.data, ...data] : data,
        loading: false,
      }));
    } else {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const onLoadMore = () => {
    if (!state.loading && hasMore) {
      const nextPage = page + 1;
      fetchData(nextPage, true);
      setPage(nextPage);
    }
  };

  useEffect(() => {
    setPage(1); // Reset page when params change
    setHasMore(true); // Reset hasMore flag
    setState({ data: [], loading: false }); // Reset data to an empty array
    fetchData(1, false);
  }, [params]);

  return { state, onLoadMore };
};

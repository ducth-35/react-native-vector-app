import { resultApi } from "@/network/api/resultsApi";
import { RESPONSE_CODE } from "@/network/config";
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from "@/utils/constant";
import React from "react";

const useGetResultOverview = (): {
  resultOverview: ResultOverviewInterface[];
  loading: boolean;
} => {
  const [resultOverview, setResultOverview] = React.useState<
    ResultOverviewInterface[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    const res = await resultApi.getResultOverview();
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const resultOverviewResponse: ResultOverviewResponseInterface[] =
        res?.data?.data;
      const result: ResultOverviewInterface[] = [];
      for (const item of resultOverviewResponse) {
        result.push({
          studentId: item.studentId,
          studentName: item.studentName,
          title: item.studentName
            ? item.studentName
            : "" + " - " + item.studentGrade,
          studentGrade: item.studentGrade,
          data: item.subjects.map((obj) => ({
            ...obj,
            studentName: item.studentName,
            studentId: item.studentId
          })),
        });
      }
      setResultOverview(result);
    }
  };

  React.useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);
  return { resultOverview, loading };
};

const useGetResults = (
  params: ResultParams
): { results: ResultResponseItem[]; loadingGetResult: boolean } => {
  const [results, setResults] = React.useState<ResultResponseItem[]>([]);
  const [loadingGetResult, setLoadingGetResult] = React.useState(true);
  const fetchData = async () => {
    if (params.page === undefined) {
      params.page = PAGE_DEFAULT;
    }
    if (params.pageSize === undefined) {
      params.pageSize = PAGE_SIZE_DEFAULT;
    }
    const res = await resultApi.getResults(params);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const resultResponse: ResultResponseItem[] = res?.data?.data;
      setResults(resultResponse);
    }
  };
  React.useEffect(() => {
    fetchData();
    setLoadingGetResult(false);
  }, []);
  return { results, loadingGetResult };
};

const useGetResultDetail = (
  resultId: number
): { resultDetail?: ResultDetail; loadingGetResultDetail: boolean } => {
  const [resultDetail, setResultDetail] = React.useState<ResultDetail>();
  const [loadingGetResultDetail, setLoadingGetResultDetail] =
    React.useState(true);
  const fetchData = async () => {
    const res = await resultApi.getResultDetail(resultId);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const resultDetailResponse: ResultDetail = res?.data?.data;
      setResultDetail(resultDetailResponse);
    }
  };
  React.useEffect(() => {
    fetchData();
    setLoadingGetResultDetail(false);
  }, []);
  return { resultDetail, loadingGetResultDetail };
};
export { useGetResultOverview, useGetResults, useGetResultDetail };

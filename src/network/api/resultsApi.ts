import { NetWork } from "..";
import { API_URL } from "../url";
import { getRequestUrl } from "../utils";

const getResultOverview = () => {
  const url = getRequestUrl(API_URL.result_overview);
  return NetWork.get(url);
};

const getResults = (params: ResultParams) => {
  const url = getRequestUrl(API_URL.results);
  return NetWork.get(url, params);
};

const getResultDetail = (resultId: number) => {
  const url = getRequestUrl(API_URL.results) + `/${resultId}`;
  return NetWork.get(url);
};

export const resultApi = {
  getResultOverview,
  getResults,
  getResultDetail
};

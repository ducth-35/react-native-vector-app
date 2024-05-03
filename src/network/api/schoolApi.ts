import { NetWork } from "..";
import { API_URL } from "../url";
import { getRequestUrl } from "../utils";

const getSchools = (search?: string) => {
  const url = getRequestUrl(API_URL.school);
  if (search === undefined) {
    return NetWork.get(url);
  }
  const params = {
    search: search,
  };
  return NetWork.get(url, params);
};

export const schoolApi = {
  getSchools,
};

import { NetWork } from "..";
import { API_URL } from "../url";
import { getRequestUrl } from "../utils";

const getProvinces = () => {
  const url = getRequestUrl(API_URL.location + "/provinces");
  return NetWork.get(url);
};

const getDistricts = (provinceCode: string | undefined) => {
  const url = getRequestUrl(API_URL.location + "/districts");
  return NetWork.get(url, { provinceCode: provinceCode });
};

const getWards = (districtCode: string | undefined) => {
  const url = getRequestUrl(API_URL.location + "/wards");
  return NetWork.get(url, { districtCode: districtCode });
};

export const locationApi = {
  getProvinces,
  getDistricts,
  getWards,
};

import { locationApi } from "@/network/api/location";
import { RESPONSE_CODE } from "@/network/config";

export const useLocations = () => {
  const getProvinces = async () => {
    try {
      const res = await locationApi.getProvinces();
      if (res?.status === RESPONSE_CODE.SUCCESS) {
        const { data } = res?.data;
        return data?.provinces;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDistrict = async (provinceCode: string | undefined) => {
    try {
      const res = await locationApi.getDistricts(provinceCode);
      if (res?.status === RESPONSE_CODE.SUCCESS) {
        const { data } = res?.data;
        return data?.districts;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getWard = async (districtCode: string | undefined) => {
    try {
      const res = await locationApi.getWards(districtCode);
      if (res?.status === RESPONSE_CODE.SUCCESS) {
        const { data } = res?.data;
        return data.wards;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getProvinces,
    getDistrict,
    getWard,
  };
};

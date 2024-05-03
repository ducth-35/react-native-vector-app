import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import React from "react";

export const useGetGrades = () => {
  const [grades, setGrades] = React.useState<string[]>([]);

  const fetchData = async () => {
    const res = await homeApi.getGrades();
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const names = res?.data?.data.map(
        (item: dataSubjectsInterface) => item.name
      ) as string[];
      setGrades(names);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return { grades };
};

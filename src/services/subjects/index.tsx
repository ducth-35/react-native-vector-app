import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import React from "react";

export const useGetSubject = () => {
  const [subjects, setSubjects] = React.useState<string[]>([]);

  const fetchData = async () => {
    const res = await homeApi.getSubjects();
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const names = res?.data?.data.map(
        (item: dataSubjectsInterface) => item.name
      ) as string[];
      setSubjects(names);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return { subjects };
};

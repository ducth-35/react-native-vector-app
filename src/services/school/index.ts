import { schoolApi } from "@/network/api/schoolApi";
import { RESPONSE_CODE } from "@/network/config";
import React from "react";

export const useGetSchool = (search?: string) => {
  const [schools, setSchools] = React.useState<string[]>([]);

  const fetchData = async () => {
    const res = await schoolApi.getSchools(search);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const name = res?.data?.data.map(
        (item: DataShoolInterface) => item.name
      ) as string[];
      setSchools(name);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [search]); // Include 'search' as a dependency in the useEffect dependency array.

  return { schools };
};

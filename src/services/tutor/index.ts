import { DATA_UNPAID } from "@/utils/mock-data";
import { DATA_PAID } from "@/utils/mock-data";
import React from "react";
type DATA_PAID = {
  id: number;
  class: string;
  student: string;
  sessions: number;
  startDate: string;
  endDate: string;
  pay: boolean;
  price: string;
  color: string;
}[];

export const useGetIncomeTutor = () => {
  const [dataPaid, setDataPaid] = React.useState<DATA_PAID>([]);
  const [dataUnPaid, setDataUnPaid] = React.useState<DATA_PAID>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setDataPaid(DATA_PAID);
      setDataUnPaid(DATA_UNPAID);
    }, 1000);
  }, []);
  return { dataPaid, dataUnPaid, loading };
};

export const useGetTeachingClassTutor = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData([]);
    }, 1000);
  }, []);
  return { data, loading };
};

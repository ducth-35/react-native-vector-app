import React from "react";

export const useGetResultLatestDetails = () => {
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

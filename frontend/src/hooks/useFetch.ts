import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}`, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }, [url]);

  return { data, loading, error };
};

import { useState, useCallback } from "react";

export const useFetchData = <T, P extends unknown[]>(
  fetchFunction: (...args: P) => Promise<T>,
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (...params: P) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(...params);
        setData(result);
      } catch (err) {
        setError("Ошибка при загрузке данных");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction],
  );

  return { data, loading, error, fetchData };
};

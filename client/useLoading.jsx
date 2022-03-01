import { useEffect, useState } from "react";

export function useLoading(fn) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    try {
      setData(await fn());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, []);

  return { data, error, loading, reload };
}

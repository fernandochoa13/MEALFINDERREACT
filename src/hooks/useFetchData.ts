import { useEffect, useState } from "react";



export default function useFetchData<T>(url: string, extractData?: (json: any) => T[]) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();


  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;
    async function hook() {
      setLoading(true);
      try {
        const response = await fetch(url, {signal});
        if(!response.ok) throw new Error(`${response.status}`);
        const json = await response.json();
        const extracted = extractData ? extractData(json) : json;

        if (!Array.isArray(extracted)) {
          throw new Error("La respuesta no es un arreglo.");
        }

        setData(extracted);
        setError(undefined);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false)
      }
    }
    hook()
  }, [url]) 
  return {data, loading, error};
}


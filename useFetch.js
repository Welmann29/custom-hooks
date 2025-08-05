import { useEffect, useState } from "react"


const localCache = {};


export const useFetch = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });

    const { data, isLoading, hasError, error } = state;

    useEffect(() => {
      getFetch();
    }, [url])

    const setLoading = (loading) => {
        setState({
            ...state,
            isLoading: loading,
            hasError: false,
        });
    }
    

    const getFetch = async () => {

        setLoading(true);

        if (localCache[url]) {
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });
            return;
        }

        const response = await fetch(url);

        if (!response.ok) {
            setState({
                ...state,
                isLoading: false,
                hasError: true,
                error: {
                    code: response.status,
                    message: response.statusText
                }
            });
            return;
        }

        const data = await response.json();

        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null
        });

        localCache[url] = data; 

    }

  return {
    data,
    isLoading,
    hasError,
  }
}

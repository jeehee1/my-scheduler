import { useCallback, useReducer, useState } from "react";

const useHttp = () => {
  const [httpState, setHttpState] = useState<{
    loading: boolean;
    data: any;
    error: string | null;
    identifier: string;
    extra: any;
  }>({ loading: false, data: null, error: null, identifier: "", extra: null });

  const sendRequest = useCallback(
    async (
      url: string,
      method: string,
      body: any,
      manipulatedData: any,
      identifier: string
    ) => {
      setHttpState({ ...httpState, loading: true });
      console.log("send request");
      const response = await fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const data = await response.json();
        setHttpState({
          ...httpState,
          loading: false,
          data: null,
          error: data.error
            ? data.error.message
            : "Something went wrong - reponse is not ok",
        });
        return;
      }
      const data = await response.json();
      setHttpState({
        extra: manipulatedData,
        loading: false,
        data: data,
        error: null,
        identifier: identifier,
      });
    },
    []
  );

  return {
    loading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    identifier: httpState.identifier,
    extra: httpState.extra,
    sendRequest: sendRequest,
  };
};

export default useHttp;

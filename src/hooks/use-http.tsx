import { useCallback, useState } from "react";

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

  const sendMultipleRequest = async (
    updateData: { body: any; method: string; url: string }[],
    manipulatedData: any,
    identifier: string
  ) =>
    //manipulatedData  = {body: deleteId, method: "DELETE"}, {body: deleteId, method: "DELETE"}, {body: newSchedule, method: "POST"}

    {
      const dataArr = [];
      for (const m of updateData) {
        const response = await fetch(m.url, {
          method: m.method,
          body: m.body ? JSON.stringify(m.body) : null,
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
        const data  = await response.json();
        dataArr.push(data);
      }
      setHttpState({
        extra: manipulatedData,
        loading: false,
        data: dataArr,
        error: null,
        identifier: identifier
      })
    };

  return {
    loading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    identifier: httpState.identifier,
    extra: httpState.extra,
    sendRequest: sendRequest,
    sendMultipleRequest: sendMultipleRequest
  };
};

export default useHttp;

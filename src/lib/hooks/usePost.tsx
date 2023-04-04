import { throttle } from "lodash";
import { useState, useEffect, useReducer, useRef, useMemo } from "react";

type ApiResponse = {
  ok: number;
  data?: any;
  error?: string;
};

interface State<G, T> {
  data?: T;
  error?: string;
  loading: boolean;
  reload: (body: G) => void;
}

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: string }
  | { type: "update"; payload: any };

function usePost<G = unknown, T = unknown>(args: {
  url: string;
  onComplete?: (data: T | null) => void;
  onError?: () => void;
}): State<G, T> {
  const { url, onComplete } = args;
  // const [start, setStart] = useState(false);
  const [currentBody, setCurrentBody] = useState<G | null>(null);

  const initialState: State<G, T> = {
    error: undefined,
    data: undefined,
    loading: false,
    reload: throttle((body: G) => {
      setCurrentBody(body);
      // fetchData(url, body);
    }, 500),
  };

  useEffect(() => {
    if (currentBody) {
      fetchData(url, currentBody);
    }
  }, [currentBody]);

  // Keep state logic separated
  const fetchReducer = (state: State<G, T>, action: Action<T>): State<G, T> => {
    switch (action.type) {
      case "loading":
        return { ...state, loading: true };
      case "fetched":
        return {
          ...initialState,
          data: action.payload,
          loading: false,
        };
      case "error":
        return { ...initialState, error: action.payload, loading: false };
      case "update":
        return { ...initialState, reload: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = useMemo(() => {
    return async (url: string, body: G) => {
      dispatch({ type: "loading" });

      const response = await fetch(`/api${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setCurrentBody(null);

      const data = (await response.json()) as ApiResponse;

      if (data.ok) {
        dispatch({ type: "fetched", payload: data.data });
        onComplete && onComplete(data.data);
      } else {
        alert(data.error);
        dispatch({ type: "error", payload: data.error ?? "Not Specified" });
      }
    };
  }, [dispatch, onComplete]);

  return state;
}

export default usePost;

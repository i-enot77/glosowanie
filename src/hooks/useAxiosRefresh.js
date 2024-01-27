// useAxiosRefresh.js

import { useEffect, useContext } from "react";
import axios from "axios";
import useRefreshToken from "./useRefreshToken";
import { LoginContext } from "../components/LoginContext";

const useAxiosRefresh = () => {
  const axiosPrivate = axios.create({
    baseURL: "http://localhost:3500",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  const refresh = useRefreshToken();
  const { auth } = useContext(LoginContext);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.__isRetryRequest) {
          prevRequest.__isRetryRequest = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosRefresh;

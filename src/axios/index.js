import axios from "axios";

export const BaseUrl =
  process.env.REACT_APP_PORT === "DEV"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

const axiosInstance = axios.create({
  baseURL: BaseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/signin";
    }
    return Promise.reject(error.response || "Something went wrong!");
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers["token"] = localStorage.accessToken;
    config.headers["TimeZone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;

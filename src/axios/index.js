import axios from "axios";

export const BaseUrl = "http://13.203.78.221:4000";

const axiosInstance = axios.create({ baseURL: BaseUrl });

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

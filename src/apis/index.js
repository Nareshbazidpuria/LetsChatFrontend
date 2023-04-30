import axiosInstance from "../axios";
const ENDPOINT = {
  SIGNUP: "/pub/signup",
  LOGIN: "/pub/login",
  LOGOUT: "/api/auth/logout",
  PROFILE: "/api/profile",
  USERS: "/api/user",
};

export const signUpApi = (payload) => {
  return axiosInstance.post(ENDPOINT.SIGNUP, payload);
};

export const loginApi = (payload) => {
  return axiosInstance.post(ENDPOINT.LOGIN, payload);
};

export const getProfileApi = () => {
  return axiosInstance.get(ENDPOINT.PROFILE);
};

export const logoutApi = () => {
  return axiosInstance.post(ENDPOINT.LOGOUT);
};

export const getUsersApi = () => {
  return axiosInstance.get(ENDPOINT.USERS);
};

import app from "../axios";
export const ENDPOINT = {
  SIGNUP: "/pub/signup",
  LOGIN: "/pub/login",
  LOGOUT: "/api/auth/logout",
  PROFILE: "/api/profile",
  USERS: "/api/user",
  UPLOAD: "/api/generic/upload",
  REQUEST: "/api/request",
};

export const signUpApi = (payload) => app.post(ENDPOINT.SIGNUP, payload);

export const loginApi = (payload) => app.post(ENDPOINT.LOGIN, payload);

export const getProfileApi = () => app.get(ENDPOINT.PROFILE);

export const updateProfileApi = (payload) => app.put(ENDPOINT.PROFILE, payload);

export const logoutApi = () => app.post(ENDPOINT.LOGOUT);

export const getUsersApi = (params) => app.get(ENDPOINT.USERS, { params });

export const uploadImageApi = (formData) => app.post(ENDPOINT.UPLOAD, formData);

export const getReqsApi = (params) => app.get(ENDPOINT.REQUEST, { params });

export const sendRequestApi = (payload) => app.post(ENDPOINT.REQUEST, payload);

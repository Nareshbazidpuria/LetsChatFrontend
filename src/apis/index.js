import app from "../axios";
export const ENDPOINT = {
  SIGNUP: "/pub/signup",
  LOGIN: "/pub/login",
  LOGOUT: "/api/auth/logout",
  CHANGE_PASSWORD: "/api/auth/change-password",
  DELETE_ACCOUNT: "/api/auth/account",
  PROFILE: "/api/profile",
  PREFERENCES: "/api/user/preferences",
  USERS: "/api/user",
  UPLOAD: "/api/generic/upload",
  REQUEST: "/api/request",
  MESSAGE: "/api/message",
};

export const signUpApi = (payload) => app.post(ENDPOINT.SIGNUP, payload);

export const loginApi = (payload) => app.post(ENDPOINT.LOGIN, payload);

export const getProfileApi = () => app.get(ENDPOINT.PROFILE);

export const setPreferencesApi = (payload) =>
  app.put(ENDPOINT.PREFERENCES, payload);

export const updateProfileApi = (payload) => app.put(ENDPOINT.PROFILE, payload);

export const logoutApi = () => app.post(ENDPOINT.LOGOUT);

export const changePasswordApi = (payload) =>
  app.post(ENDPOINT.CHANGE_PASSWORD, payload);

export const deleteAccountApi = () => app.delete(ENDPOINT.DELETE_ACCOUNT);

export const getUsersApi = (params) =>
  app.get(ENDPOINT.USERS, { params: { ...params, limit: 20 } });

export const getUserInfoApi = (id) => app.get(`${ENDPOINT.USERS}/${id}`);

export const unfriendApi = (id) => app.put(`${ENDPOINT.USERS}/${id}`);

export const uploadImageApi = (formData) => app.post(ENDPOINT.UPLOAD, formData);

export const getReqsApi = (params) => app.get(ENDPOINT.REQUEST, { params });

export const sendRequestApi = (payload) => app.post(ENDPOINT.REQUEST, payload);

export const confirmRequestApi = (reqId) =>
  app.put(`${ENDPOINT.REQUEST}/${reqId}`);

export const rejectReqApi = (reqId, params) =>
  app.delete(`${ENDPOINT.REQUEST}/${reqId}`, { params });

export const sendMsgApi = (roomId, payload) =>
  app.post(`${ENDPOINT.MESSAGE}/${roomId}`, payload);

export const getMsgsApi = (roomId, page = 1, limit = 20) =>
  app.get(`${ENDPOINT.MESSAGE}/${roomId}`, { params: { page, limit } });

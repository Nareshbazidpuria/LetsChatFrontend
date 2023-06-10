import { DARK_MODE, SELECTED_USER, USER } from "./actionTypes";

export const setUser = (payload) => {
  return {
    type: USER,
    payload,
  };
};

export const setSelectedUser = (payload) => {
  return {
    type: SELECTED_USER,
    payload,
  };
};

export const setDarkMode = (payload) => {
  return {
    type: DARK_MODE,
    payload,
  };
};

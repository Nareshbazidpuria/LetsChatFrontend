import { SELECTED_USER, USER } from "./actionTypes";

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

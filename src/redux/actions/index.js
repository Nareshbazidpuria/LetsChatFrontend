import { USER } from "./actionTypes";

export const setUser = (payload) => {
  return {
    type: USER,
    payload,
  };
};

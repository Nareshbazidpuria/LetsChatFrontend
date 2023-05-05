import { USER } from "../actions/actionTypes";

const initialUser = { name: "redux" };
export const user = (state = initialUser, action) => {
  if (action.type === USER) state = action.payload;
  return state;
};

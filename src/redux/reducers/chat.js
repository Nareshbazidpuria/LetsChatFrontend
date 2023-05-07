import { SELECTED_USER } from "../actions/actionTypes";

const initialUser = null
export const selectedUser = (state = initialUser, action) => {
  if (action.type === SELECTED_USER) state = action.payload;
  return state;
};

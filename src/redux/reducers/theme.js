import { DARK_MODE } from "../actions/actionTypes";

const defaulMode = false;
export const darkMode = (state = defaulMode, action) => {
  if (action.type === DARK_MODE) state = action.payload;
  return state;
};

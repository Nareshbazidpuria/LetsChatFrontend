import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./auth";
import { selectedUser } from "./chat";
import { darkMode } from "./theme";

export const reducer = combineReducers({ user, selectedUser, darkMode });

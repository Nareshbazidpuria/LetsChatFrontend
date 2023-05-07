import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./auth";
import { selectedUser } from "./chat";

export const reducer = combineReducers({ user, selectedUser });

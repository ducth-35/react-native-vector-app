import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
export const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

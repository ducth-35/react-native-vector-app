import { createDeepEqualSelector } from "@/common/redux";
import { RootState } from "../rootReducer";
import { createSelector } from "@reduxjs/toolkit";

export const userInforSelector = createDeepEqualSelector(
  (state: RootState) => state.auth,
  (auth: AppState) => auth.userInfor
);

export const authErrorSelector = createDeepEqualSelector(
  (state: RootState) => state.auth,
  (auth: AppState) => auth.msgError
);

export const authLoadingSelector = createSelector(
  (state: RootState) => state.auth,
  (auth: AppState) => auth.isLoading
);

export const authenStateSelector = createDeepEqualSelector(
  (state: RootState) => state.auth,
  (app: AppState) => app.isAuthen
);

export const refreshDataSelector = createDeepEqualSelector(
  (state: RootState) => state.auth,
  (app: AppState) => app.refreshData
);

export const selectDeviceToken = createDeepEqualSelector(
  (state: RootState) => state.auth,
  (app: AppState) => app.deviceToken
);

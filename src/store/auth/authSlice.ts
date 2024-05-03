import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppState = {
  userInfor: {
    achievement: "",
    createdAt: "",
    email: "",
    fullName: "",
    grade: [],
    id: 0,
    literacy: "",
    modifiedAt: "",
    phoneNumber: "",
    role: "",
    school: "",
    subject: [],
    children: [],
    userId: 0,
    otherParent: undefined,
    location: "",
    locationId: "",
    avatar: "",
  },
  token: "",
  deviceToken: "",
  isLoading: false,
  msgError: "",
  isAuthen: false,
  refreshData: false,
};

//3-define reducer, action;
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.isLoading = true;
      state.msgError = "";
    },
    authFinished: (state) => {
      state.isLoading = false;
    },
    authFail: (state, action: PayloadAction<string>) => {
      state.msgError = action.payload;
    },
    updateUserInfor: (state, action: PayloadAction<UserInforInterface>) => {
      state.userInfor = action.payload;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setDeviceToken: (state, { payload }: PayloadAction<string>) => {
      state.deviceToken = payload;
    },
    setAuthen: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthen = payload;
    },
    removeAllData: (state) => {
      state.userInfor = initialState.userInfor;
      state.isLoading = false;
      state.msgError = "";
      state.token = "";
      state.isAuthen = false;
      state.deviceToken = "";
    },
    removeToken: (state) => {
      state.token = "";
    },
    removeAuthen: (state) => {
      state.isAuthen = false;
    },
    clearLoadingErrorAuth: (state) => {
      state.isLoading = false;
      state.msgError = "";
    },
    refreshData: (state) => {
      state.refreshData = !state.refreshData;
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;

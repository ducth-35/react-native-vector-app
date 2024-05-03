import { getState } from "@/common/redux";

export const AccessTokenInterceptor = {
  addAccessToken: (config: any) => {
    const token = getState("auth").token;
    if (token) {
      const headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        Language: "vi",
      };
      config.headers = headers;
    }
    return config;
  },
  onRejected: (error: any) => {
    return error;
  },
};

export const LogInterceptor = {
  requestLog: (config: any) => {
    return config;
  },
  requestError: (error: any) => {
    return error;
  },
  responseLog: (response: any) => {
    return response;
  },
  responseError: (error: any) => {
    return error;
  },
};

export enum AUTH_ACTION {
  AUTH_TOKEN = "TOKEN",
}

export enum SLICE_NAME {
  APP = "APP_",
  AUTHENTICATION = "AUTHENTICATION_",
}
export interface IResponse {
  status?: number;
  data?: any;
  response?: any;
}

export interface IAction {
  type: string;
  payload?: any;
}

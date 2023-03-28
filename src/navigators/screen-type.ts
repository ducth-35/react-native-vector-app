import { NativeStackScreenProps as RNStackScreenProps } from "@react-navigation/native-stack";
export enum APP_SCREEN {
  SPLASH = "SPLASH",
  ONBOARDING_SCREEN = "ONBOARDING_SCREEN",
  LOGIN_SCREEN = "LOGIN_SCREEN",
  REGISTER_SCREEN = "REGISTER_SCREEN",
  INPUT_NUMBER_SCREEN = "INPUT_NUMBER_SCREEN",
  VERIFY_NUMBER_SCREEN = "VERIFY_NUMBER_SCREEN",
  SELECT_ACCOUNT_TYPE_SCREEN = "SELECT_ACCOUNT_TYPE_SCREEN",
  MAIN_TAB = "MAIN_TAB",
  HOME_SCREEN = "HOME_SCREEN",
  CALENDA_SCREEN = "CALENDA_SCREEN",
  RESULT_SCREEN = "RESULT_SCREEN",
  PAYMENT_SCREEN = "PAYMENT_SCREEN",
  ACCOUNT_SCREEN = "ACCOUNT_SCREEN",
}

export type StackParamsList = {
  [APP_SCREEN.SPLASH]: undefined;
  [APP_SCREEN.ONBOARDING_SCREEN]: undefined;
  [APP_SCREEN.LOGIN_SCREEN]: undefined;
  [APP_SCREEN.REGISTER_SCREEN]: undefined;
  [APP_SCREEN.INPUT_NUMBER_SCREEN]: undefined;
  [APP_SCREEN.VERIFY_NUMBER_SCREEN]: undefined;
  [APP_SCREEN.SELECT_ACCOUNT_TYPE_SCREEN]: undefined;
  [APP_SCREEN.MAIN_TAB]: undefined;
  [APP_SCREEN.HOME_SCREEN]: undefined;
  [APP_SCREEN.CALENDA_SCREEN]: undefined;
  [APP_SCREEN.RESULT_SCREEN]: undefined;
  [APP_SCREEN.PAYMENT_SCREEN]: undefined;
  [APP_SCREEN.ACCOUNT_SCREEN]: undefined;
};
export type RootNativeStackParamList = StackParamsList;

export type StackScreenProps<T extends keyof StackParamsList> =
  RNStackScreenProps<StackParamsList, T>;

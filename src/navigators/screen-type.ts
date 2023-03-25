import { NativeStackScreenProps as RNStackScreenProps } from "@react-navigation/native-stack";
export enum APP_SCREEN {
  SPLASH = "SPLASH",
  ONBOARDING_SCREEN = "ONBOARDING_SCREEN",
  LOGIN_SCREEN = "LOGIN_SCREEN",
  REGISTER_SCREEN = "REGISTER_SCREEN",
}

export type StackParamsList = {
  [APP_SCREEN.SPLASH]: undefined;
  [APP_SCREEN.ONBOARDING_SCREEN]: undefined;
  [APP_SCREEN.LOGIN_SCREEN]: undefined;
  [APP_SCREEN.REGISTER_SCREEN]: undefined;
};
export type RootNativeStackParamList = StackParamsList;

export type StackScreenProps<T extends keyof StackParamsList> =
  RNStackScreenProps<StackParamsList, T>;

import {
  LoginManager,
  AccessToken,
  LoginResult,
} from "react-native-fbsdk-next";

export type AccessTokenResult = AccessToken | null;

export const loginWithFacebook =
  async (): Promise<AccessTokenResult | null> => {
    const result: LoginResult = await LoginManager.logInWithPermissions([
      "public_profile",
    ]);
    if (result.isCancelled) {
      return null;
    }
    const accessToken: AccessTokenResult | null =
      await AccessToken.getCurrentAccessToken();
    return accessToken;
  };

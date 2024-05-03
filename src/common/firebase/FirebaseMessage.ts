import messaging from "@react-native-firebase/messaging";

export async function getFcmToken(): Promise<string> {
  return messaging()
    .getToken()
    .then((token) => {
      return token;
    })
    .catch((error) => {
      console.log("====error get FCM Token", error);
      return "GET_TOKEN_FAIL";
    });
}

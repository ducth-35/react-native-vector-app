import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const signInWithGoogle = async () => {
  GoogleSignin.configure({
    androidClientId:
      "550452989904-fkcer59vu943sg819itokvthkor41096.apps.googleusercontent.com",
    iosClientId:
      "550452989904-rkt6gj44ifodemfivuds8vn0egrkc5ai.apps.googleusercontent.com",
    forceCodeForRefreshToken: true,
  });

  await GoogleSignin.hasPlayServices()
    .then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn()
          .then((userInfo) => {
            console.log(JSON.stringify(userInfo));
            GoogleSignin.getTokens().then((tokens) => {
              console.log(tokens);
              console.log(userInfo);
            });
          })
          .catch((e) => {
            console.log("ERROR IS: " + e);
          });
      }
    })
    .catch((e) => {
      console.log("ERROR IS: " + e);
    });
};

import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./appStack";
import { navigationRef } from "./navigation-services";
import { Host } from "react-native-portalize";
import messaging from "@react-native-firebase/messaging";
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIos from "@react-native-community/push-notification-ios";
import { RXStore, dispatch } from "@/common/redux";
import { useSelector } from "react-redux";
import { authenStateSelector } from "@/store/auth/authSelector";
import { RootSiblingParent } from "react-native-root-siblings";
import { authAction } from "@/store/auth/authSlice";

const AppContainer = () => {
  const isSignIn = useSelector(authenStateSelector);
  React.useEffect(() => {
    requestPermission();
    subcribeNotification();
  }, []);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      await getTokenFCM();
    }
  };

  const getTokenFCM = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      dispatch(authAction.setDeviceToken(fcmToken));
      createChannel();
      configurePushNotifications();
    }
  };

  const subcribeNotification = async () => {
    const subcribed = messaging().onMessage(async (remoteMessage: any) => {
      if (Platform.OS === "ios") {
        PushNotificationIos.addNotificationRequest({
          id: remoteMessage.messageId,
          body: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          userInfo: remoteMessage.data,
        });
      } else {
        PushNotification.localNotification({
          message: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          channelId: "Vector",
          playSound: true,
          soundName: "default",
        });
      }
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    return subcribed;
  };

  const configurePushNotifications = () => {
    PushNotification.configure({
      onNotification: (notification) => {
        if (notification) {
          console.log("Notification Received:", notification);
        }
      },
      requestPermissions: true,
    });
  };

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "Vector", // (required)
        channelName: "Vector", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <NavigationContainer ref={navigationRef}>
        <Host>
          <RootSiblingParent>{AppStack(isSignIn)}</RootSiblingParent>
        </Host>
        <RXStore />
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
};
export default AppContainer;

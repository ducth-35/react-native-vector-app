import {
  PERMISSIONS,
  Permission,
  request,
  check,
  RESULTS,
} from "react-native-permissions";
type PermissionStatus =
  | "unavailable"
  | "denied"
  | "blocked"
  | "granted"
  | "limited";

import { Platform } from "react-native";

export const requestCameraPermission = async () => {
  const status = await request(
    // @ts-ignore
    Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    })
  );
  return status;
};
export const requestMediaPermission = async () => {
  const statusRead = await request(
    // @ts-ignore
    Platform.select({
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    })
  );
  return statusRead;
};

export const checkPermission = async (
  permission: Permission,
  onBlocked?: Function,
  onGranted?: Function,
  onUnAvailable?: Function,
  onDenied?: Function,
  onLimited?: Function
) => {
  check(permission)
    .then((result: PermissionStatus) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          /*
       This feature is not available (on this device / in this context)
       */
          onUnAvailable && onUnAvailable();
          break;
        case RESULTS.DENIED:
          /*
       The permission has not been requested / is denied but requestable
       */
          onDenied && onDenied();
          break;
        case RESULTS.GRANTED:
          /*
      The permission is granted
       */
          onGranted && onGranted();
          break;
        case RESULTS.BLOCKED:
          /*
      The permission is denied and not requestable anymore
       */
          onBlocked && onBlocked();
          break;
        case RESULTS.LIMITED:
          onLimited && onLimited();
          break;
      }
    })
    .catch(() => {
      console.log("Exception in checking permission!");
    });
};

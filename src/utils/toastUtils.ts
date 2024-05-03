import RNReactNativeHapticFeedback from "react-native-haptic-feedback";
import Toast from "react-native-root-toast";
import { OPTION_HAPTIC } from "./enum";

export default class ToastUtils {
  static show(message: string, duration = 2000) {
    RNReactNativeHapticFeedback.trigger("notificationSuccess", OPTION_HAPTIC);
    Toast.show(message, {
      duration: duration,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }
}

import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import TextApp from "../textApp";
import { scale } from "../../common/scale";
import { FontFamily } from "../../common/constant";

type ButtonConfirmProps = {
  textCancel?: string;
  textConfirm?: string;
  pressCancel?: () => void;
  pressConfirrm?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  newstyle?: ViewStyle;
  newtext?: TextStyle;
};

export const ButtonConfirm = ({
  isLoading,
  textConfirm,
  textCancel,
  pressCancel,
  pressConfirrm,
  disabled,
  newstyle,
  newtext,
}: ButtonConfirmProps) => {
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.cancel} onPress={pressCancel}>
        {isLoading ? (
          <ActivityIndicator color={"#3d5cff"} />
        ) : (
          <TextApp style={style.textcancel}>{textCancel}</TextApp>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabled}
        style={[style.confirm, disabled && newstyle]}
        onPress={pressConfirrm}
      >
        {isLoading ? (
          <ActivityIndicator color={"#fff"} />
        ) : (
          <TextApp style={[style.textconfirm, disabled && newtext]}>
            {textConfirm}
          </TextApp>
        )}
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cancel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3d5cff",
    paddingVertical: scale(10),
    marginRight: scale(10),
  },
  confirm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3d5cff",
    borderRadius: 12,
    paddingVertical: scale(10),
  },
  textcancel: {
    color: "#3d5cff",
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 16,
  },
  textconfirm: {
    color: "#fff",
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 16,
  },
});

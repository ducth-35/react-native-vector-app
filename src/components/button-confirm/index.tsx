import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "../../common/scale";
import { FontFamily } from "../../common/constant";

type ButtonConfirmProps = {
  textCancel?: string;
  textConfirm?: string;
  pressCancel?: () => void;
  pressConfirrm?: () => void;
};

export const ButtonConfirm = ({
  textConfirm,
  textCancel,
  pressCancel,
  pressConfirrm,
}: ButtonConfirmProps) => {
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.cancel} onPress={pressCancel}>
        <TextApp style={style.textcancel}>{textCancel}</TextApp>
      </TouchableOpacity>
      <TouchableOpacity style={style.confirm} onPress={pressConfirrm}>
        <TextApp style={style.textconfirm}>{textConfirm}</TextApp>
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
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(16),
  },
  textconfirm: {
    color: "#fff",
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(16),
  },
});

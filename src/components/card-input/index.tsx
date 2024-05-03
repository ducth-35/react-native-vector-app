import React, { Dispatch, SetStateAction } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { scale } from "../../common/scale";
import TextApp from "../textApp";
import { HomeSVG } from "../../asset";

type CardSearchProps = {
  lable?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: Dispatch<SetStateAction<string>>;
  keyboardType?: KeyboardTypeOptions;
};

export const CardInput = ({
  lable,
  placeholder,
  value,
  onChangeText,
  keyboardType,
}: CardSearchProps) => {
  return (
    <View style={style.container}>
      <TextApp style={style.lable}>{lable}</TextApp>
      <View style={style.viewSelect}>
        <TextInput
          placeholder={placeholder}
          style={style.flex_1}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    borderRadius: scale(12),
    marginHorizontal: scale(20),
  },
  viewSelect: {
    height: scale(45),
    backgroundColor: "#f4f3fd",
    borderRadius: scale(8),
    paddingRight: scale(15),
  },
  lable: {
    marginTop: scale(20),
    color: "#000",
    marginBottom: scale(5),
  },
  flex_1: {
    flex: 1,
    padding: scale(15),
  },
});

import React, { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { scale } from "../../common/scale";
import TextApp from "../textApp";
import { HomeSVG } from "../../asset";

type CardSearchProps = {
  lable?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: Dispatch<SetStateAction<string>>;
};

export const CardInput = ({
  lable,
  placeholder,
  value,
  onChangeText,
}: CardSearchProps) => {
  return (
    <View style={style.container}>
      <TextApp style={style.lable}>{lable}</TextApp>
      <View style={style.viewSelect}>
        <View style={style.flex_1}>
          <TextInput
            placeholder={placeholder}
            style={{ padding: scale(15) }}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
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
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    paddingRight: scale(15),
  },
  lable: {
    marginVertical: scale(15),
  },
  flex_1: {
    flex: 1,
  },
});

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
  isAdd?: boolean;
};

export const InputRegister = ({
  lable,
  placeholder,
  value,
  isAdd,
  onChangeText,
}: CardSearchProps) => {
  return (
    <View style={style.container}>
      <TextApp preset="text14" style={style.lable}>
        {lable}
      </TextApp>
      <View style={style.viewSelect}>
        {isAdd ? (
          <Pressable style={style.viewAdd}>
            <HomeSVG.PLUS />
            <TextApp preset="text14Normal" style={{ marginTop: scale(10) }}>
              Thêm tài khoản
            </TextApp>
          </Pressable>
        ) : (
          <View style={style.flex_1}>
            <TextInput
              placeholder={placeholder}
              style={{ padding: scale(15) }}
              value={value}
              onChangeText={onChangeText}
            />
          </View>
        )}
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
    justifyContent: "center",
    borderRadius: scale(8),
    paddingRight: scale(15),
    borderWidth: 1,
    borderColor: "#b8b8d2",
  },
  lable: {
    marginTop: scale(15),
    marginBottom: scale(5),
  },
  flex_1: {},
  viewAdd: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(20),
  },
});

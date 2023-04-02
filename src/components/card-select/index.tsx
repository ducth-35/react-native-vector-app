import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { scale } from "../../common/scale";
import TextApp from "../textApp";
import { FontFamily } from "../../common/constant";

type CardSearchProps = {
  lable: string;
  placeholder: string;
  onPressIn: () => void;
  dataSelect: string[];
};

export const CardSelect = ({
  lable,
  placeholder,
  onPressIn,
  dataSelect,
  ...props
}: CardSearchProps) => {
  return (
    <Pressable style={style.container}>
      <TextApp style={style.lable}>{lable}</TextApp>
      <View style={style.viewSelect}>
        <TextInput
          placeholder={placeholder}
          editable={false}
          style={{ padding: scale(15), color: "#3d5cff" }}
          onPressIn={onPressIn}
          value={dataSelect.join(', ')}
          {...props}
        />
      </View>
    </Pressable>
  );
};
const style = StyleSheet.create({
  container: {
    borderRadius: scale(12),
    marginHorizontal: scale(20),
  },
  viewSelect: {
    height: 50,
    backgroundColor: "#f4f3fd",
    borderRadius: scale(8),
  },
  lable: {
    marginVertical: scale(15),
  },
});

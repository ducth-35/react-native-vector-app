import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { scale } from "../../common/scale";
import { HomeSVG } from "../../asset";

type SearchProps = {
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
};

export const Search = ({ leftIcon, rightIcon, ...props }: SearchProps) => {
  return (
    <Pressable style={style.container}>
      {leftIcon}
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Tìm gia sư, lớp năng khiếu..."
          style={{ padding: scale(15) }}
          {...props}
        />
      </View>
      {rightIcon}
    </Pressable>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "#f4f3fd",
    borderRadius: scale(12),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(15),
  },
});

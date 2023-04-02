import React from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { scale } from "../../common/scale";

export const Search = ({ ...props }) => {
  return (
    <Pressable style={style.container}>
      <TextInput
        placeholder="Tìm gia sư, lớp năng khiếu..."
        style={{ padding: scale(15) }}
        {...props}
      />
    </Pressable>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "#f4f3fd",
    borderRadius: scale(12),
  },
});

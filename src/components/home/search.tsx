import { scale } from "@/common/scale";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type SearchProps = {
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  onPressIn?: () => void;
  editable?: boolean;
  placeholder?: string;
  onChangeText?: Dispatch<SetStateAction<string>>;
};

export const Search = ({
  leftIcon,
  rightIcon,
  onPressIn,
  placeholder,
  onChangeText,
  ...props
}: SearchProps) => {
  return (
    <Pressable style={style.container} onPress={onPressIn}>
      {leftIcon}
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder={placeholder}
          style={{ height: scale(45), marginHorizontal: scale(10) }}
          onPressIn={onPressIn}
          onChangeText={onChangeText}
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

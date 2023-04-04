import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { scale } from "../../common/scale";
import TextApp from "../textApp";
import { HomeSVG } from "../../assets";

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
    <Pressable style={style.container} onPress={onPressIn}>
      <TextApp style={style.lable}>{lable}</TextApp>
      <View style={style.viewSelect}>
        <View style={style.flex_1}>
          <TextInput
            placeholder={placeholder}
            editable={false}
            style={{ padding: scale(15), color: "#3d5cff" }}
            onPressIn={onPressIn}
            value={dataSelect.join(", ")}
            {...props}
          />
        </View>
        <HomeSVG.DROPDOWN />
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
    height: scale(50),
    backgroundColor: "#f4f3fd",
    borderRadius: scale(8),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: scale(15)
  },
  lable: {
    marginVertical: scale(15),
  },
  flex_1: {
    flex: 1,
  },
});

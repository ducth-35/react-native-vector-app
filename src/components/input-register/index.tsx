import React, { Dispatch, SetStateAction } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { scale } from "../../common/scale";
import TextApp from "../textApp";
import { HomeSVG } from "../../asset";
import { HIT_SLOP } from "@/utils/helper";

type CardSearchProps = {
  lable?: string;
  placeholder?: string;
  value?: string | Array<string> | number;
  onChangeText?: Dispatch<SetStateAction<string | number>>;
  isAdd?: boolean;
  editable?: boolean;
  isSelect?: boolean;
  onPressIn?: () => void;
  onPress?: () => void;
  keyboardType?: KeyboardTypeOptions;
  disable?: boolean;
  multiline?: boolean;
  txtIsAdd?: string;
  newStyle?: ViewStyle;
  newStyleInput?: ViewStyle;
  numberOfLines?: number;
  maxLength?: number;
  rightLable?: JSX.Element;
  hiddenLable?: boolean;
};

export const InputRegister = ({
  lable,
  placeholder,
  value,
  isAdd,
  onChangeText,
  keyboardType,
  isSelect,
  onPressIn,
  onPress,
  disable,
  txtIsAdd,
  newStyle,
  newStyleInput,
  multiline,
  maxLength,
  rightLable,
  hiddenLable = false,
  ...props
}: CardSearchProps) => {
  const displayValue =
    typeof value === "number"
      ? value.toString()
      : Array.isArray(value)
      ? value.join(" - ")
      : value;
  return (
    <View style={style.container}>
      {!hiddenLable && (
        <TextApp preset="text14" style={style.lable}>
          {lable}
        </TextApp>
      )}
      <View style={[style.viewSelect, newStyle]}>
        {isAdd ? (
          <Pressable style={style.viewAdd} hitSlop={HIT_SLOP} onPress={onPress}>
            <HomeSVG.PLUS />
            <TextApp preset="text14Normal" style={{ marginTop: scale(10) }}>
              {txtIsAdd}
            </TextApp>
          </Pressable>
        ) : (
          <Pressable style={[style.flex_1, newStyleInput]} onPress={onPress}>
            <TextInput
              placeholder={placeholder}
              style={[style.input, disable && style.txtDisable]}
              value={displayValue}
              onPressIn={onPress}
              onChangeText={onChangeText}
              multiline={multiline}
              keyboardType={keyboardType}
              {...props}
            />
            {isSelect ? (
              <Pressable hitSlop={HIT_SLOP} onPress={onPressIn}>
                <HomeSVG.DROPDOWN />
              </Pressable>
            ) : (
              <>{rightLable}</>
            )}
          </Pressable>
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
    marginTop: scale(5),
    borderWidth: 1,
    borderColor: "#b8b8d2",
  },
  lable: {
    marginTop: scale(15),
  },
  flex_1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAdd: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(20),
  },
  input: {
    minHeight: scale(45),
    paddingLeft: scale(10),
    flex: 1,
    color: "#000",
  },
  txtDisable: {
    color: "#b8b8d2",
  },
});

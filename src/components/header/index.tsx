import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { HomeSVG } from "../../asset";
import TextApp from "../textApp";
import { scale } from "../../common/scale";
import { goBack } from "../../navigators/navigation-services";
import { HIT_SLOP } from "@/utils/helper";

type HeaderProps = {
  title?: string;
  backIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  canBack?: boolean;
  isRightIcon?: boolean;
  handleRightIcon?: () => void;
};

export const Header = ({
  title,
  backIcon,
  rightIcon,
  isRightIcon,
  canBack,
  handleRightIcon,
}: HeaderProps) => {
  return (
    <View style={styles.viewheader}>
      {canBack && (
        <TouchableOpacity
          hitSlop={HIT_SLOP}
          style={styles.close}
          onPress={() => goBack()}
        >
          {backIcon}
        </TouchableOpacity>
      )}
      {isRightIcon && (
        <TouchableOpacity
          hitSlop={HIT_SLOP}
          style={styles.right}
          onPress={handleRightIcon}
        >
          {rightIcon}
        </TouchableOpacity>
      )}

      <TextApp preset="text18">{title}</TextApp>
    </View>
  );
};

const styles = StyleSheet.create({
  viewheader: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: scale(10),
  },
  close: {
    position: "absolute",
    left: scale(20),
  },
  right: {
    position: "absolute",
    right: scale(20),
  },
});

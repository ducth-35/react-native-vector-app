import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { HomeSVG } from "../../assets";
import TextApp from "../textApp";
import { scale } from "../../common/scale";
import { goBack } from "../../navigators/navigation-services";

type HeaderProps = {
  title: string;
  backIcon?: JSX.Element;
  canBack?: boolean;
};

export const Header = ({ title, backIcon, canBack }: HeaderProps) => {
  return (
    <View style={styles.viewheader}>
      {canBack ? (
        <TouchableOpacity style={styles.close} onPress={() => goBack()}>
          {backIcon}
        </TouchableOpacity>
      ) : null}

      <TextApp preset="text18">{title}</TextApp>
    </View>
  );
};

const styles = StyleSheet.create({
  viewheader: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  close: {
    position: "absolute",
    left: scale(20),
  },
});

import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
export const LoadingView = () => {
  return (
    <View style={[styles.loadingStyle]}>
      <ActivityIndicator size="large" color={"#000"} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

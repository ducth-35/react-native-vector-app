import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
export const LoadingView = () => {
  return (
    <View style={[styles.loadingStyle]}>
      <ActivityIndicator size="large" color={"#fff"} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    backgroundColor: "#1A212B80",
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
export const Loading = () => {
  return (
    <View style={[styles.loadingStyle]}>
      <ActivityIndicator size="large" color={"#000"} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    position: "absolute",
    top: 20,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

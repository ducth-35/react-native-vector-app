import React, { Component } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import { navigationRef } from "./Navigation-services";

const AppContainer = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <NavigationContainer ref={navigationRef}>
        <AppStack />
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
};
export default AppContainer;

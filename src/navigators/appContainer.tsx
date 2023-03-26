import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./appStack";
import { navigationRef } from "./navigation-services";
import { SafeAreaView } from "react-native-safe-area-context";

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

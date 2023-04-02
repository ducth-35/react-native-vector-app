import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./appStack";
import { navigationRef } from "./navigation-services";
import { Host } from "react-native-portalize";

const AppContainer = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Host>
          <AppStack />
        </Host>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
};
export default AppContainer;

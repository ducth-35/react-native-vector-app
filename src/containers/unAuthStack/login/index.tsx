import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { navigate } from "../../../navigators/navigation-services";
import { APP_SCREEN } from "../../../navigators/screen-type";
export const LoginScreen = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigate(APP_SCREEN.REGISTER_SCREEN)}>
        <Text> Login Screen </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
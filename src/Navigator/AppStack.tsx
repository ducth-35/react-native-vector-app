import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/login";
import { RegisterScreen } from "../screens/register";
import { APP_SCREEN } from "./Screen-type";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"DetailProfileScreen"}
    >
      <Stack.Screen name={APP_SCREEN.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={APP_SCREEN.REGISTER_SCREEN}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

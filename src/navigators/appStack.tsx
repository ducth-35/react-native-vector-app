import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { APP_SCREEN } from "./screen-type";
import { LoginScreen } from "../containers/unAuthStack/login";
import { RegisterScreen } from "../containers/unAuthStack/register";
import { InputNumberScreen } from "../containers/unAuthStack/input-phone";
import { VerifyNumberScreen } from "../containers/unAuthStack/verifycations";
import { SelectAccountType } from "../containers/unAuthStack/select-account-type";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={APP_SCREEN.LOGIN_SCREEN}
    >
      <Stack.Screen name={APP_SCREEN.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={APP_SCREEN.REGISTER_SCREEN}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={APP_SCREEN.INPUT_NUMBER_SCREEN}
        component={InputNumberScreen}
      />
      <Stack.Screen
        name={APP_SCREEN.VERIFY_NUMBER_SCREEN}
        component={VerifyNumberScreen}
      />
      <Stack.Screen
        name={APP_SCREEN.SELECT_ACCOUNT_TYPE_SCREEN}
        component={SelectAccountType}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { APP_SCREEN } from "./screen-type";
import { LoginScreen } from "../containers/unAuthStack/login";
import { RegisterScreen } from "../containers/unAuthStack/register";
import { InputNumberScreen } from "../containers/unAuthStack/input-phone";
import { VerifyNumberScreen } from "../containers/unAuthStack/verifycations";
import { SelectAccountType } from "../containers/unAuthStack/select-account-type";
import { MainTab } from "./main-tab";
import { HomeScreen } from "../containers/authStack/home-screen";
import { CalendaScreen } from "../containers/authStack/calenda-screen";
import { ResultScreen } from "../containers/authStack/results-screen";
import { PaymentScreen } from "../containers/authStack/payment-screen";
import { AccountScreen } from "../containers/authStack/account-screen";
import { SearchScreen } from "../containers/authStack/search";
import { FilterScreen } from "../containers/authStack/filter";
import { TutorDetailScreen } from "../containers/authStack/tutor-details";
import { BookingInfor } from "../containers/authStack/book-infor";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={APP_SCREEN.MAIN_TAB}
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
      <Stack.Screen name={APP_SCREEN.MAIN_TAB} component={MainTab} />
      <Stack.Screen name={APP_SCREEN.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen
        name={APP_SCREEN.CALENDA_SCREEN}
        component={CalendaScreen}
      />
      <Stack.Screen name={APP_SCREEN.RESULT_SCREEN} component={ResultScreen} />
      <Stack.Screen
        name={APP_SCREEN.PAYMENT_SCREEN}
        component={PaymentScreen}
      />
      <Stack.Screen
        name={APP_SCREEN.ACCOUNT_SCREEN}
        component={AccountScreen}
      />
      <Stack.Screen name={APP_SCREEN.SEARCH_SCREEN} component={SearchScreen} />
      <Stack.Screen name={APP_SCREEN.FILTER_SCREEN} component={FilterScreen} />
      <Stack.Screen
        name={APP_SCREEN.TUTOR_DETAIL_SCREEN}
        component={TutorDetailScreen}
      />
        <Stack.Screen
        name={APP_SCREEN.BOOKING_SCREEN}
        component={BookingInfor}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import { HomeScreen } from "../containers/authStack/home-screen";
import { CalendaScreen } from "../containers/authStack/calenda-screen";
import { ResultScreen } from "../containers/authStack/results-screen";
import { PaymentScreen } from "../containers/authStack/payment-screen";
import { AccountScreen } from "../containers/authStack/account-screen";
import { IconAsset } from "../assets";
import { APP_SCREEN } from "./screen-type";
import { FontFamily } from "../common/constant";
import { scale } from "../common/scale";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const BOTTOM_TAB_ROUTE = {
  HOME_SCREEN: "Home",
  CALENDA_SCREEN: "Lịch",
  RESULT_SCREEN: "Kết quả",
  PAYMENT_SCREEN: "Thanh toán",
  ACCOUNT_SCREEN: "Account",
};

export const MainTab = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["bottom"]}
    >
      <Tab.Navigator
        initialRouteName={APP_SCREEN.HOME_SCREEN}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: FontFamily.poppins_regular,
          },
          tabBarActiveTintColor: "#e83f3f",
          tabBarInactiveTintColor: "#858597",
          tabBarIcon: ({ focused }) => {
            switch (route.name) {
              case BOTTOM_TAB_ROUTE.HOME_SCREEN:
                return (
                  <Image
                    source={IconAsset.home}
                    style={[style.icon, focused && style.iconSelected]}
                    resizeMode={"cover"}
                  />
                );
              case BOTTOM_TAB_ROUTE.CALENDA_SCREEN:
                return (
                  <Image
                    source={IconAsset.calenda}
                    style={[style.icon, focused && style.iconSelected]}
                    resizeMode={"cover"}
                  />
                );
              case BOTTOM_TAB_ROUTE.RESULT_SCREEN:
                return (
                  <Image
                    source={IconAsset.result}
                    style={[style.icon, focused && style.iconSelected]}
                    resizeMode={"cover"}
                  />
                );
              case BOTTOM_TAB_ROUTE.PAYMENT_SCREEN:
                return (
                  <Image
                    source={IconAsset.payment}
                    style={[style.icon, focused && style.iconSelected]}
                    resizeMode={"cover"}
                  />
                );
              case BOTTOM_TAB_ROUTE.ACCOUNT_SCREEN:
                return (
                  <Image
                    source={IconAsset.account}
                    style={[style.icon, focused && style.iconSelected]}
                    resizeMode={"cover"}
                  />
                );
              default:
                break;
            }
          },
        })}
      >
        <Tab.Screen
          name={BOTTOM_TAB_ROUTE.HOME_SCREEN}
          component={HomeScreen}
        />
        <Tab.Screen
          name={BOTTOM_TAB_ROUTE.CALENDA_SCREEN}
          component={CalendaScreen}
        />
        <Tab.Screen
          name={BOTTOM_TAB_ROUTE.RESULT_SCREEN}
          component={ResultScreen}
        />
        <Tab.Screen
          name={BOTTOM_TAB_ROUTE.PAYMENT_SCREEN}
          component={PaymentScreen}
        />
        <Tab.Screen
          name={BOTTOM_TAB_ROUTE.ACCOUNT_SCREEN}
          component={AccountScreen}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  icon: {
    width: scale(20),
    height: scale(20),
  },
  iconSelected: {
    tintColor: "#e83f3f",
  },
});

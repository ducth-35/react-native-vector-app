import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { HomeScreen } from "../containers/authStack/home-screen";
import { CalendaScreen } from "../containers/authStack/calenda-screen";
import { ResultScreen } from "../containers/authStack/results-screen";
import { PaymentScreen } from "../containers/authStack/payment-screen";
import { AccountScreen } from "../containers/authStack/account-screen";
import { IconAsset } from "../asset";
import { APP_SCREEN } from "./screen-type";
import { FontFamily } from "../common/constant";
import { SCREEN_WIDTH, scale } from "../common/scale";
import { SafeAreaView } from "react-native-safe-area-context";
import TextApp from "@/components/textApp";

const Tab = createBottomTabNavigator();

const BOTTOM_TAB_ROUTE = {
  HOME_SCREEN: "Home",
  CALENDA_SCREEN: "Lịch",
  RESULT_SCREEN: "Kết quả",
  PAYMENT_SCREEN: "Thanh toán",
  ACCOUNT_SCREEN: "Account",
};
const ColorActive = "#e83f3f";
const ColorUnActive = "#858597";

const tabBarIcon = (focused: boolean, route: any) => {
  switch (route.name) {
    case BOTTOM_TAB_ROUTE.HOME_SCREEN:
      return (
        <Image
          source={IconAsset.home}
          style={[styles.icon, focused && styles.iconSelected]}
          resizeMode={"cover"}
        />
      );
    case BOTTOM_TAB_ROUTE.CALENDA_SCREEN:
      return (
        <Image
          source={IconAsset.calenda}
          style={[styles.icon, focused && styles.iconSelected]}
          resizeMode={"cover"}
        />
      );
    case BOTTOM_TAB_ROUTE.RESULT_SCREEN:
      return (
        <Image
          source={IconAsset.result}
          style={[styles.icon, focused && styles.iconSelected]}
          resizeMode={"cover"}
        />
      );
    case BOTTOM_TAB_ROUTE.PAYMENT_SCREEN:
      return (
        <Image
          source={IconAsset.payment}
          style={[styles.icon, focused && styles.iconSelected]}
          resizeMode={"cover"}
        />
      );
    case BOTTOM_TAB_ROUTE.ACCOUNT_SCREEN:
      return (
        <Image
          source={IconAsset.account}
          style={[styles.icon, focused && styles.iconSelected]}
          resizeMode={"cover"}
        />
      );
    default:
      break;
  }
};

const tabBarLabel = (focused: boolean, route: any) => {
  const color = focused ? ColorActive : ColorUnActive;
  switch (route.name) {
    case BOTTOM_TAB_ROUTE.HOME_SCREEN: {
      return (
        <TextApp style={[styles.label, { color: color }]}>
          {BOTTOM_TAB_ROUTE.HOME_SCREEN}
        </TextApp>
      );
    }
    case BOTTOM_TAB_ROUTE.CALENDA_SCREEN: {
      return (
        <TextApp style={[styles.label, { color: color }]}>
          {BOTTOM_TAB_ROUTE.CALENDA_SCREEN}
        </TextApp>
      );
    }
    case BOTTOM_TAB_ROUTE.RESULT_SCREEN: {
      return (
        <TextApp style={[styles.label, { color: color }]}>
          {BOTTOM_TAB_ROUTE.RESULT_SCREEN}
        </TextApp>
      );
    }
    case BOTTOM_TAB_ROUTE.PAYMENT_SCREEN: {
      return (
        <TextApp style={[styles.label, { color: color }]}>
          {BOTTOM_TAB_ROUTE.PAYMENT_SCREEN}
        </TextApp>
      );
    }
    case BOTTOM_TAB_ROUTE.ACCOUNT_SCREEN: {
      return (
        <TextApp style={[styles.label, { color: color }]}>
          {BOTTOM_TAB_ROUTE.ACCOUNT_SCREEN}
        </TextApp>
      );
    }
  }
};

const MyTabBar = ({ state, navigation }: any) => {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={["right", "left"]} style={styles.tabBarContainer}>
        <View style={styles.tabBarField}>
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true });
              }
            };
            return (
              <TouchableOpacity
                key={index}
                style={styles.Button}
                onPress={onPress}
              >
                {tabBarIcon(isFocused, route)}
                {tabBarLabel(isFocused, route)}
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
};

export const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={APP_SCREEN.HOME_SCREEN}
      screenOptions={() => ({
        headerShown: false,
      })}
      tabBar={(props: any) => <MyTabBar {...props} />}
    >
      <Tab.Screen name={BOTTOM_TAB_ROUTE.HOME_SCREEN} component={HomeScreen} />
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
  );
};

const styles = StyleSheet.create({
  icon: {
    width: scale(20),
    height: scale(20),
    marginBottom: scale(5),
  },
  iconSelected: {
    tintColor: "#e83f3f",
  },
  container: {
    backgroundColor: "rgba(255,255,255,0.0)",
    position: "absolute",
    bottom: 0,
  },
  label: {
    fontSize: 12,
  },
  tabBarContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: scale(25),
    borderTopLeftRadius: scale(25),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 10,
  },
  Button: {
    height: "100%",
    width: SCREEN_WIDTH / 5,
    alignItems: "center",
    justifyContent: "center",
  },
  audioPlayerContainer: {
    backgroundColor: "white",
  },
  tabBarField: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: scale(95),
    marginTop: -scale(10),
  },
});

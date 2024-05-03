import React from "react";
import { StyleSheet, TouchableOpacity, Pressable, View } from "react-native";
import { scale } from "../../common/scale";
import { HomeSVG } from "../../asset/icon/home/home-svg";
import TextApp from "../textApp";
import { useSelector } from "react-redux";
import {
  authenStateSelector,
  userInforSelector,
} from "@/store/auth/authSelector";
import { HIT_SLOP } from "@/utils/helper";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { BOTTOM_TAB_ROUTE } from "@/navigators/main-tab";
import { useTotalNotification } from "@/containers/authStack/notification/services";
import { isNullOrEmpty } from "@/utils/method";
import FastImage from "react-native-fast-image";

export const Header = () => {
  const user = useSelector(userInforSelector);
  const isSignIn = useSelector(authenStateSelector);
  const { total } = useTotalNotification();

  const handleNotification = () => {
    if (isSignIn) {
      navigate(APP_SCREEN.NOTIFICATION_SCREEN);
    } else {
      navigate(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false });
    }
  };

  const handleAccountScreen = () => {
    if (isSignIn) {
      navigate(APP_SCREEN.MAIN_TAB, {
        screen: BOTTOM_TAB_ROUTE.ACCOUNT_SCREEN,
      } as any);
    } else {
      navigate(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false });
    }
  };

  return (
    <View style={style.container}>
      <Pressable
        hitSlop={HIT_SLOP}
        style={style.viewname}
        onPress={handleAccountScreen}
      >
        {isNullOrEmpty(user.avatar) ? (
          <HomeSVG.AVATAR_DEFAULT />
        ) : (
          <FastImage source={{ uri: user.avatar }} style={style.avatar} />
        )}

        <TextApp preset="headerHome" style={style.textName}>
          {isSignIn ? `  Hi, ${user?.fullName}` : "Đăng nhập"}
        </TextApp>
      </Pressable>

      <TouchableOpacity hitSlop={HIT_SLOP} onPress={handleNotification}>
        {total < 0 && (
          <View style={style.viewTotal}>
            <TextApp preset="txt10">{total}</TextApp>
          </View>
        )}
        <HomeSVG.BELL />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop: scale(10),
    marginHorizontal: scale(20),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  viewname: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textName: {
    marginLeft: scale(5),
  },
  viewTotal: {
    width: scale(19),
    height: scale(19),
    backgroundColor: "#f44336",
    position: "absolute",
    top: -5,
    right: -3,
    zIndex: 1,
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(50),
    backgroundColor: "gray",
  },
});

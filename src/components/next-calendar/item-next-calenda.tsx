import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "@/common/scale";
import { convertTimeCalendar } from "@/utils/format-time";
import { useSelector } from "react-redux";
import { authenStateSelector, userInforSelector } from "@/store/auth/authSelector";
import { USER_TYPE } from "@/utils/enum";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";

type Props = {
  item: {
    color: string;
    end: string;
    id: string;
    start: string;
    summary: string;
    title: string;
  };
};

export const ItemNextCalenda = ({ item }: Props) => {
  const user = useSelector(userInforSelector);
  const isSignIn = useSelector(authenStateSelector);

  const handleOnClickItem = () => {
    if (isSignIn) {
      if (user?.role === USER_TYPE.TUTOR) {
        navigate(APP_SCREEN.DETAIL_CALENDAR_TUTOR_SCREEN, {
          id: item?.id,
          color: item.color,
        });
      } else {
        navigate(APP_SCREEN.DETAIL_CALENDAR_PARENT_SCREEN, {
          id: item?.id,
          color: item.color,
        });
      }
    } else {
      navigate(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false })
    }

  };
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: item.color }]}
      onPress={handleOnClickItem}
    >
      <TextApp preset="text14Bold" numberOfLines={1}>
        {item.title}
      </TextApp>
      <TextApp
        numberOfLines={1}
        preset="text14Normal"
        style={{ marginTop: scale(5) }}
      >
        {convertTimeCalendar(item.start)} - {convertTimeCalendar(item.end)}
      </TextApp>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    maxWidth: scale(200),
    marginVertical: scale(15),
    marginRight: scale(10),
    borderRadius: scale(12),
    padding: scale(15),
  },
});

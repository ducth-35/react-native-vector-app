import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "@/common/scale";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import FastImage from "react-native-fast-image";
import { formatTime } from "@/utils/format-time";
import { STATUS_BOOKING, USER_TYPE } from "@/utils/enum";
import { useSelector } from "react-redux";
import { authenStateSelector, userInforSelector } from "@/store/auth/authSelector";

type Props = {
  isAll?: boolean;
  item?: BookingInterface;
};
export const ItemCalendaFromParent = ({ item, isAll }: Props) => {
  const user = useSelector(userInforSelector);
  const isSignIn = useSelector(authenStateSelector);

  const handleCalendaDetails = () => {
    if (isSignIn) {
      if (user?.role === USER_TYPE.TUTOR) {
        navigate(APP_SCREEN.BOOKING_INFOR_TUTOR_SCREEN, { id: item?.id });
      } else {
        navigate(APP_SCREEN.BOOKING_INFOR_PARENT_SCREEN, { id: item?.id });
      }
    } else {
      navigate(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false })
    }
  };

  const status = () => {
    switch (item?.state) {
      case "accept":
        return (
          <TextApp preset="text14tealBlue">{STATUS_BOOKING.accept}</TextApp>
        );
      case "pending":
        return <TextApp preset="text14Blue">{STATUS_BOOKING.pending}</TextApp>;
      case "cancel_by_parent":
        return (
          <TextApp preset="text14tomato">
            {STATUS_BOOKING.cancel_by_parent}
          </TextApp>
        );
      case "cancel_by_tutor":
        return (
          <TextApp preset="text14tomato">
            {STATUS_BOOKING.cancel_by_tutor}
          </TextApp>
        );
      default:
        break;
    }
  };
  return (
    <Pressable
      style={[styles.item, { backgroundColor: "#f6dada" }]}
      onPress={handleCalendaDetails}
    >
      <FastImage source={{ uri: item?.subjectImage }} style={styles.image} />
      <View style={{ marginLeft: scale(15), flex: 1 }}>
        <View style={styles.name}>
          <TextApp preset="text14Medium">Dạy {item?.subjectName}</TextApp>
          {isAll && status()}
        </View>
        <TextApp preset="text12" style={{ marginVertical: scale(5) }}>
          {formatTime(item?.createdAt || "")}
        </TextApp>
        <TextApp preset="text14">
          {item?.startTime} - {item?.endTime}
        </TextApp>
        {isAll && (
          <TextApp preset="text14" style={{ marginTop: scale(5) }}>
            {item?.studentFullName} - {item?.studentGrade}
          </TextApp>
        )}
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: scale(15),
    borderRadius: scale(20),
  },
  name: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: scale(41),
    height: scale(41),
  },
});

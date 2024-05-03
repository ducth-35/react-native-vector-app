import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { SCREEN_WIDTH, scale } from "@/common/scale";
import { HomeSVG } from "@/asset";
import { ItemCalendaFromParent } from "./item-calenda-from-parent";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { HIT_SLOP } from "@/utils/helper";
import { useGetBooking } from "./services";
import { useSelector } from "react-redux";
import { authenStateSelector } from "@/store/auth/authSelector";

export const CalendaFromParent = () => {
  const isSignIn = useSelector(authenStateSelector);
  const { state } = useGetBooking();

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          marginVertical: scale(10),
          marginRight: scale(10),
        }}
      >
        <ItemCalendaFromParent item={item} />
      </View>
    );
  };

  const renderListEmpty = () => {
    return (
      <View style={styles.viewEmpty}>
        <TextApp preset="text14Normal"> Bạn chưa có đặt lịch nào</TextApp>
      </View>
    );
  };

  const handleCalendaALl = () => {
    if (isSignIn) {
      navigate(APP_SCREEN.CALENDA_PARENT_DETAIL_SCREEN, {
        title: "Đặt lịch từ phụ huynh",
      });
    } else {
      navigate(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false })
    }

  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextApp preset="text18">Đặt lịch từ phụ huynh </TextApp>
        <Pressable hitSlop={HIT_SLOP} onPress={handleCalendaALl}>
          <TextApp preset="text14NormalBlue">Tất cả</TextApp>
        </Pressable>
      </View>
      {!state?.loading ? (
        <FlatList
          data={state?.data.slice(0, 5)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          ListEmptyComponent={renderListEmpty}
          style={styles.listBooking}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(20),
    marginBottom: scale(20),
  },
  listBooking: {
    paddingHorizontal: scale(10),
    backgroundColor: "#fff",
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 10,
    borderRadius: scale(20),
    marginTop: scale(10),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewEmpty: {
    flex: 1,
    width: SCREEN_WIDTH - 60,
    marginVertical: scale(25),
    justifyContent: "center",
    alignItems: "center",
  },
});

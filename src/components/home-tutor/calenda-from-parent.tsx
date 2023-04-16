import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { SCREEN_WIDTH, scale } from "@/common/scale";
import { HomeSVG } from "@/asset";
import { ItemCalendaFromParent } from "./item-calenda-from-parent";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { HIT_SLOP } from "@/utils/helper";

const data = [
  {
    id: 1,
    name: "Dạy Toán",
    icon: <HomeSVG.TOAN />,
    last_ago: "2 tiếng trước",
    time: "17:00 PM - 19:00 PM",
    color: "#f6dada",
  },
  {
    id: 2,
    name: "Dạy Lý",
    icon: <HomeSVG.LY />,
    last_ago: "2 tiếng trước",
    time: "17:00 PM - 19:00 PM",
    color: "#f6e5da",
  },
  {
    id: 3,
    name: "Dạy Toán",
    icon: <HomeSVG.TOAN />,
    last_ago: "2 tiếng trước",
    time: "17:00 PM - 19:00 PM",
    color: "#f6dada",
  },
  {
    id: 4,
    name: "Dạy Lý",
    icon: <HomeSVG.LY />,
    last_ago: "2 tiếng trước",
    time: "17:00 PM - 19:00 PM",
    color: "#f6e5da",
  },
];

const renderItem = ({ item }: any) => {
  return (
    <View style={{ marginVertical: scale(10), marginRight: scale(10) }}>
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

export const CalendaFromParent = () => {
  const handleCalendaALl = () => {
    navigate(APP_SCREEN.CALENDA_PARENT_DETAIL_SCREEN);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextApp>Đặt lịch từ phụ huynh</TextApp>
        <Pressable hitSlop={HIT_SLOP} onPress={handleCalendaALl}>
          <TextApp preset="text14NormalBlue">Tất cả</TextApp>
        </Pressable>
      </View>
      <View style={styles.listBooking}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          ListEmptyComponent={renderListEmpty}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  listBooking: {
    paddingLeft: scale(10),
    backgroundColor: "#fff",
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10, // thay đổi giá trị height để chỉ đổ bóng ở cạnh dưới
    },
    elevation: 3,
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
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

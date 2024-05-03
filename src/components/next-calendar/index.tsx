import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import TextApp from "../textApp";
import { SCREEN_WIDTH, scale } from "@/common/scale";
import { ItemNextCalenda } from "./item-next-calenda";
import { FontFamily } from "@/common/constant";
import { navigate } from "@/navigators/navigation-services";
import { BOTTOM_TAB_ROUTE } from "@/navigators/main-tab";
import { APP_SCREEN } from "@/navigators/screen-type";
import { HIT_SLOP } from "@/utils/helper";
import moment from "moment";
import { useGetEvent } from "@/containers/authStack/calenda/services";
import WeekCalendar from "../week-calendar";
import { format, parseISO } from "date-fns";
import { authenStateSelector } from "@/store/auth/authSelector";
import { useSelector } from "react-redux";

const initialDate = moment().format("YYYY-MM-DD");

export const NextCalenda = () => {
  const isSignIn = useSelector(authenStateSelector);
  const { data } = useGetEvent(new Date().getMonth() + 1);
  const [selected, setSelected] = React.useState(initialDate);
  const [makedDate, setMakedDate] = React.useState<string[]>([]);
  const [listEvent, setListEvent] = React.useState<any[]>([]);

  React.useEffect(() => {
    const uniqueDates = Array.from(
      new Set(data.map((event) => event.start.slice(0, 10)))
    );
    setMakedDate(uniqueDates);
  }, [data]);

  React.useEffect(() => {
    const result = [
      ...data.filter(
        (item: any) =>
          moment(item.start).format("YYYY-MM-DD") ===
          format(parseISO(selected), "yyyy-MM-dd")
      ),
    ];
    setListEvent(result);
  }, [selected, data]);

  const onDayPress = (day: any) => {
    setSelected(day);
  };


  const renderItem = ({ item }: any) => {
    return <ItemNextCalenda item={item} />;
  };

  const handleShowwDetails = () => {
    if (isSignIn) {
      navigate(APP_SCREEN.MAIN_TAB, {
        screen: BOTTOM_TAB_ROUTE.CALENDA_SCREEN,
      } as any);
    } else {
      navigate(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false });
    }
  };

  const handleAddNewCalendar = () => {
    if (isSignIn) {
      navigate(APP_SCREEN.ADD_NEW_CALENDAR_SCREEN);
    } else {
      navigate(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false });
    }
  };

  const renderListEmpty = () => {
    return (
      <View style={styles.viewEmpty}>
        <View>
          <TextApp preset="text14Normal">Bạn chưa có lịch dạy</TextApp>
          <View style={styles.line} />
          <TextApp preset="text14Normal">Thêm lịch cá nhân của bạn</TextApp>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleAddNewCalendar}>
          <TextApp preset="text14_white">Thêm lịch</TextApp>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextApp preset="text18">Lịch sắp tới</TextApp>
        <Pressable onPress={handleShowwDetails} hitSlop={HIT_SLOP}>
          <TextApp preset="text14NormalBlue">Chi tiết</TextApp>
        </Pressable>
      </View>
      <View style={{ flex: 1, marginTop: scale(5) }}>
        <View style={styles.listBooking}>
          <View style={styles.viewCalendar}>
            <WeekCalendar
              date={selected}
              onChange={(newDate) => {
                onDayPress(newDate);
              }}
              markedDates={makedDate}
            />
          </View>
          <FlatList
            data={listEvent}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            ListEmptyComponent={renderListEmpty}
            contentContainerStyle={{
              marginRight: scale(10),
              paddingLeft: scale(10),
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listBooking: {
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
  viewCalendar: {
    borderRadius: scale(20),
    paddingHorizontal: scale(5),
  },
  viewEmpty: {
    width: SCREEN_WIDTH - 85,
    margin: scale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    height: 2,
    width: scale(30),
    backgroundColor: "#3d5cff",
    marginVertical: scale(5),
  },
  btn: {
    backgroundColor: "#3d5cff",
    borderRadius: scale(10),
    padding: scale(10),
  },
  marginTop: {
    marginTop: scale(15),
  },
  currentDateText: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },
});

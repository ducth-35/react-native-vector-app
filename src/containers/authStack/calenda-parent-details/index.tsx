import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header";
import { FlatList, StyleSheet, View } from "react-native";
import { HomeSVG } from "@/asset";
import { ItemCalendaFromParent } from "@/components/home-tutor/item-calenda-from-parent";
import { scale } from "@/common/scale";
import { ModalizeFilterBooking } from "@/components/modal/modal-filter-booking";

const data = [
  {
    id: 1,
    name: "Dạy Toán",
    icon: <HomeSVG.TOAN />,
    last_ago: "2 tiếng trước",
    time: "17:00 PM - 19:00 PM",
    color: "#f6dada",
    student: "Nguyễn Hà Anh",
    class: 1,
  },
  {
    id: 2,
    name: "Dạy Lý",
    icon: <HomeSVG.LY />,
    last_ago: "2 tiếng trước",
    time: "17:00 PM - 19:00 PM",
    color: "#f6e5da",
    student: "Nguyễn Hà Anh",
    class: 1,
  },
  {
    id: 3,
    name: "Dạy Toán",
    icon: <HomeSVG.TOAN />,
    last_ago: "2 tiếng trước",
    time: "17:00 PM - 19:00 PM",
    color: "#f6dada",
    student: "Nguyễn Hà Anh",
    class: 1,
  },
  {
    id: 4,
    name: "Dạy Lý",
    icon: <HomeSVG.LY />,
    last_ago: "2 tiếng trước",
    time: "17:00 PM - 19:00 PM",
    color: "#f6e5da",
    student: "Nguyễn Hà Anh",
    class: 1,
  },
];

const STATUS = {
  label: "Trạng thái",
  item: ["Chưa nhận lịch", "Đã nhận lịch", "Từ chối", "Tất cả"],
};

const renderItem = ({ item }: any) => {
  return (
    <View style={{ marginHorizontal: scale(15), marginBottom: scale(10) }}>
      <ItemCalendaFromParent item={item} isAll />
    </View>
  );
};

export const CalendaParentDetailsScreen: FC = () => {
  const modalizeStatusRef = React.useRef<any>();
  const [selectedStatusItems, setSelectedStatusItems] = React.useState<
    string[]
  >([]);

  React.useEffect(() => {
    console.log(selectedStatusItems);
  }, [selectedStatusItems]);

  const handleFilter = () => {
    modalizeStatusRef.current.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        canBack
        title="Đặt lịch từ phụ huynh"
        isRightIcon
        rightIcon={<HomeSVG.FILTER />}
        backIcon={<HomeSVG.BACK />}
        handleRightIcon={handleFilter}
      />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ marginTop: scale(25) }}
      />
      <ModalizeFilterBooking
        ref={modalizeStatusRef}
        data={STATUS}
        handleClose={() => modalizeStatusRef.current.close()}
        selectedItems={selectedStatusItems}
        setSelectedItems={setSelectedStatusItems}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});

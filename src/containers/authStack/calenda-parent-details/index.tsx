import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { HomeSVG } from "@/asset";
import { ItemCalendaFromParent } from "@/components/home-tutor/item-calenda-from-parent";
import { scale } from "@/common/scale";
import { ModalizeFilterBooking } from "@/components/modal/modal-filter-booking";
import { useGetBooking } from "./services";
import { Skeleton } from "./skeleton-loading";
import { BOOKING, STATUS_BOOKING } from "@/utils/enum";

const STATUS = {
  label: "Trạng thái",
  item: [
    {
      name: STATUS_BOOKING.pending,
      status: BOOKING.pending,
    },
    {
      name: STATUS_BOOKING.accept,
      status: BOOKING.accept,
    },
    {
      name: STATUS_BOOKING.cancel_by_parent,
      status: BOOKING.cancel_by_parent,
    },
    {
      name: STATUS_BOOKING.cancel_by_tutor,
      status: BOOKING.cancel_by_tutor,
    },
    {
      name: STATUS_BOOKING.all,
      status: BOOKING.all,
    },
  ],
};

export const CalendaParentDetailsScreen: FC = (props: any) => {
  const title = props.route?.params?.title;
  const { state, setStatus } = useGetBooking();

  const modalizeStatusRef = React.useRef<any>();
  const [selectedStatusItems, setSelectedStatusItems] = React.useState<
    string[]
  >([]);

  const handleFilter = () => {
    modalizeStatusRef.current.open();
  };

  React.useEffect(() => {
    setStatus(selectedStatusItems.join(""));
  }, [selectedStatusItems]);

  const renderItem: ListRenderItem<BookingInterface> = React.useCallback(
    ({ item, index }) => {
      return (
        <View
          key={index}
          style={{ marginHorizontal: scale(15), marginBottom: scale(10) }}
        >
          <ItemCalendaFromParent item={item} isAll />
        </View>
      );
    },
    [state?.data]
  );

  if (state?.loading) {
    return <Skeleton />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        canBack
        title={title}
        isRightIcon
        rightIcon={<HomeSVG.FILTER />}
        backIcon={<HomeSVG.BACK />}
        handleRightIcon={handleFilter}
      />

      <FlatList
        data={state?.data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{
          marginTop: scale(10),
          paddingBottom: scale(50),
        }}
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

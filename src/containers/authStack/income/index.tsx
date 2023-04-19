import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { scale } from "@/common/scale";
import { DATA_PAID, DATA_UNPAID } from "@/utils/mock-data";
import TextApp from "@/components/textApp";
import { FontFamily } from "@/common/constant";
import { CardPayment } from "@/components/payment/card-payment";
import { PaymentInfor } from "@/types/payment";
import { TotalIncome } from "@/components/total-income";

const renderItemUnPaid: ListRenderItem<PaymentInfor> = ({ item }) => {
  return <CardPayment item={item} />;
};

const renderItemPaid: ListRenderItem<PaymentInfor> = ({ item }) => {
  return <CardPayment item={item} />;
};

const headerUnPaid = () => {
  return (
    <View style={styles.viewHeaderUnpaid}>
      <TextApp preset="text18">Chưa thanh toán</TextApp>
    </View>
  );
};

const headerPaid = () => {
  return (
    <View style={{ marginHorizontal: scale(20), marginTop: scale(20) }}>
      <TextApp preset="text18">Đã thanh toán</TextApp>
    </View>
  );
};

const renderListFooter = () => {
  return (
    <View>
      <FlatList
        data={DATA_UNPAID}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItemPaid}
        keyExtractor={(item: any) => item.id}
        ListHeaderComponent={headerPaid}
      />
    </View>
  );
};

export const IncomeScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thu nhập" />
      <TotalIncome />
      <View>
        <FlatList
          data={DATA_PAID}
          showsVerticalScrollIndicator={false}
          renderItem={renderItemUnPaid}
          keyExtractor={(item: any) => item.id}
          ListFooterComponent={renderListFooter}
          contentContainerStyle={{
            paddingBottom: scale(200),
          }}
          ListHeaderComponent={headerUnPaid}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textPice: {
    color: "#3d5cff",
    fontFamily: FontFamily.poppins_bold,
    fontSize: 18,
    fontWeight: "700",
  },
  viewHeaderUnpaid: {
    marginHorizontal: scale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

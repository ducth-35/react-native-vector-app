import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import { FontFamily } from "@/common/constant";
import { CardPayment } from "@/components/payment/card-payment";
import { PaymentInfor } from "@/types/payment";
import { TotalIncome } from "@/components/total-income";
import { useGetIncomeTutor } from "@/services/tutor";
import { LoadingView } from "@/components/loading-view";

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

export const IncomeScreen: FC = () => {
  const { dataPaid, dataUnPaid, loading } = useGetIncomeTutor();

  const renderListFooter = () => {
    return (
      <View>
        <FlatList
          data={dataUnPaid}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemPaid}
          keyExtractor={(item: any) => item.id}
          ListHeaderComponent={headerPaid}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thu nhập" />
      <TotalIncome />
      <View style={styles.contentContainer}>
        {loading ? (
          <LoadingView />
        ) : (
          <FlatList
            data={dataPaid}
            showsVerticalScrollIndicator={false}
            renderItem={renderItemUnPaid}
            keyExtractor={(item: any) => item.id}
            ListFooterComponent={renderListFooter}
            contentContainerStyle={{
              paddingBottom: scale(200),
            }}
            ListHeaderComponent={headerUnPaid}
          />
        )}
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
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

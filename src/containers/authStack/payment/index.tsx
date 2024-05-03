import React, { FC, useEffect, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardPayment } from "@/components/payment/card-payment";
import { PaymentInfor } from "@/types/payment";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import {
  useGetPaymentsPaid,
  useGetPaymentsTotal,
  useGetPaymentsUnpaid,
} from "@/services/payment";
import { Skeleton } from "../search/skeleton";

export const PaymentScreen: FC = () => {
  const { total } = useGetPaymentsTotal();
  const { paymentPaid, loadingPaid } = useGetPaymentsPaid();
  const { paymentUnpaid, loadingUnpaid } = useGetPaymentsUnpaid();

  const paymentPaidResponse: PaymentInfor[] = [];
  for (const p of paymentPaid) {
    paymentPaidResponse.push({
      ...p,
      color: "#fdf1db",
    });
  }
  const paymentUnpaidResponse: PaymentInfor[] = [];
  for (const p of paymentUnpaid) {
    paymentUnpaidResponse.push({
      ...p,
      color: "#cfecff",
    });
  }

  const renderItemUnPaid: ListRenderItem<PaymentInfor> = ({ item }) => {
    return <CardPayment item={item} />;
  };

  const renderItemPaid: ListRenderItem<PaymentInfor> = ({ item }) => {
    return <CardPayment item={item} />;
  };

  const handleHeaderUnPaid = () => {
    return (
      <View
        style={{
          marginHorizontal: scale(20),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextApp preset="text18">Chưa thanh toán</TextApp>
        <TextApp preset="text20Blue" style={styles.textPice}>
          {total} đ
        </TextApp>
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
          data={paymentPaidResponse}
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
      <Header title="Thanh toán" />
      {loadingPaid && loadingUnpaid ? (
        <Skeleton />
      ) : (
        <View>
          <FlatList
            data={paymentUnpaidResponse}
            showsVerticalScrollIndicator={false}
            renderItem={renderItemUnPaid}
            keyExtractor={(item: any) => item.id}
            ListFooterComponent={renderListFooter}
            contentContainerStyle={{
              paddingBottom: scale(150),
              paddingTop: scale(20),
            }}
            ListHeaderComponent={handleHeaderUnPaid}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

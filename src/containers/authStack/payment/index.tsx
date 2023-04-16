import React, { FC } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { DATA_PAID, DATA_UNPAID } from "@/utils/mock-data";
import { CardPayment } from "@/components/payment/card-payment";
import { PaymentInfor } from "@/types/payment";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";

const renderItemUnPaid: ListRenderItem<PaymentInfor> = ({ item }) => {
  return <CardPayment item={item} />;
};

const renderItemPaid: ListRenderItem<PaymentInfor> = ({ item }) => {
  return <CardPayment item={item} />;
};

const headerUnPaid = () => {
  return (
    <View
      style={{
        marginHorizontal: scale(20),
        marginTop: scale(20),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextApp preset="text18">Chưa thanh toán</TextApp>
      <TextApp preset="text20Blue" style={styles.textPice}>
        8.000.000 đ
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
        data={DATA_UNPAID}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItemPaid}
        keyExtractor={(item: any) => item.id}
        ListHeaderComponent={headerPaid}
      />
    </View>
  );
};

export const PaymentScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thanh toán" />
      <View>
        <FlatList
          data={DATA_PAID}
          showsVerticalScrollIndicator={false}
          renderItem={renderItemUnPaid}
          keyExtractor={(item: any) => item.id}
          ListFooterComponent={renderListFooter}
          contentContainerStyle={{
            paddingBottom: scale(100),
            paddingTop: scale(20),
          }}
          ListHeaderComponent={headerUnPaid}
        />
      </View>
    </SafeAreaView>
  );
};

import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import React from "react";
import { StyleSheet, View } from "react-native";

type PaymentInforProps = {
  lable?: string;
  description?: string;
  description2?: string;
};

export const PaymentInfor = ({
  lable,
  description,
  description2,
}: PaymentInforProps) => {
  return (
    <View style={styles.container}>
      <TextApp preset="text16">{lable}</TextApp>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextApp preset="text14" style={styles.newText}>
          {description}
        </TextApp>
        <TextApp preset="text14" style={styles.newText}>
          {description2}
        </TextApp>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
  },
  newText: {
    color: "#858597",
    marginTop: scale(5),
  },
});

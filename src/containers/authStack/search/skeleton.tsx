import React from "react";
import { SkeletonLoading } from "@/components/skeleton-loading";
import { Spacer } from "@/components/spacer";
import { scale } from "@/common/scale";
import { CardOutStand } from "@/components/card-outstand";
import { StyleSheet, View } from "react-native";

export const Skeleton = () => {
  return (
    <View style={{ paddingHorizontal: scale(20) }}>
      <SkeletonLoading>
        <CardOutStand newStyle={styles.viewCardOutStand} />
        <Spacer height={scale(10)} />
        <CardOutStand newStyle={styles.viewCardOutStand} />
        <Spacer height={scale(10)} />
        <CardOutStand newStyle={styles.viewCardOutStand} />
        <Spacer height={scale(10)} />
        <CardOutStand newStyle={styles.viewCardOutStand} />
        <Spacer height={scale(10)} />
        <CardOutStand newStyle={styles.viewCardOutStand} />
        <Spacer height={scale(10)} />
      </SkeletonLoading>
    </View>
  );
};

const styles = StyleSheet.create({
  viewCardOutStand: {
    backgroundColor: "#f8f8ff",
    flexDirection: "row",
    padding: scale(10),
    marginTop: scale(15),
    borderRadius: scale(15),
  },
});

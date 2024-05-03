import React from "react";
import { SkeletonLoading } from "@/components/skeleton-loading";
import { ItemCalendaFromParent } from "@/components/home-tutor/item-calenda-from-parent";
import { Spacer } from "@/components/spacer";
import { scale } from "@/common/scale";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardOutStand } from "@/components/card-outstand";
import { StyleSheet } from "react-native";

export const Skeleton = () => {
  return (
    <SafeAreaView
      style={{ paddingHorizontal: scale(20), paddingTop: scale(50) }}
    >
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewCardOutStand: {
    backgroundColor: "#f8f8ff",
    flexDirection: "row",
    padding: scale(10),
    marginTop: scale(15),
    borderRadius: scale(12),
  },
});

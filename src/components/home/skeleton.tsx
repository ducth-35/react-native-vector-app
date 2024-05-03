import React from "react";
import { SkeletonLoading } from "@/components/skeleton-loading";
import { Spacer } from "@/components/spacer";
import { SCREEN_WIDTH, scale } from "@/common/scale";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";

export const Skeleton = () => {
  return (
    <SkeletonLoading>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 50,
          height: 50,
        }}
      >
        <View style={styles.image} />
      </View>
    </SkeletonLoading>
  );
};
const styles = StyleSheet.create({
  item: {
    width: SCREEN_WIDTH / 5.5,
    marginTop: scale(15),
    marginLeft: scale(10),
    alignItems: "center",
  },
  name: {
    marginTop: scale(5),
    textAlign: "center",
  },
  image: {
    width: scale(41),
    height: scale(41),
    borderRadius: scale(40),
  },
});

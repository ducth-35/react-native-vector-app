import React from "react";
import { View } from "react-native";
import TextApp from "@/components/textApp";
import { SkeletonLoading } from "@/components/skeleton-loading";
import { ItemCalendaFromParent } from "@/components/home-tutor/item-calenda-from-parent";
import { Spacer } from "@/components/spacer";
import { scale } from "@/common/scale";
import { SafeAreaView } from "react-native-safe-area-context";

export const Skeleton = () => {
  return (
    <SafeAreaView
      style={{ paddingHorizontal: scale(20), paddingTop: scale(50) }}
    >
      <SkeletonLoading>
        <ItemCalendaFromParent isAll />
        <Spacer height={scale(10)} />
        <ItemCalendaFromParent isAll />
        <Spacer height={scale(10)} />
        <ItemCalendaFromParent isAll />
        <Spacer height={scale(10)} />
        <ItemCalendaFromParent isAll />
        <Spacer height={scale(10)} />
        <ItemCalendaFromParent isAll />
        <Spacer height={scale(10)} />
        <ItemCalendaFromParent isAll />
        <Spacer height={scale(10)} />
        <ItemCalendaFromParent isAll />
      </SkeletonLoading>
    </SafeAreaView>
  );
};

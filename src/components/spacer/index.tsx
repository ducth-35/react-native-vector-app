import { scale } from "@/common/scale";
import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { SpacerProps } from "./types";

export const Spacer = ({ height = 0, width = 0 }: SpacerProps) => {
  // style
  const actualStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: typeof width === "number" ? scale(width) : width,
      height: typeof height === "number" ? scale(height) : height,
    }),
    [height, width]
  );

  // render
  return <View style={actualStyle} />;
};

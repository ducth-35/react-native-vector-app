import React, { memo, useCallback, useMemo } from "react";
import {
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

import isEqual from "react-fast-compare";

import { styles } from "./styles";

import { Spacer } from "../spacer";

type RowOverLayProps = {
  width: number | string;
  height?: number;
  borderRadius?: number;
};
const RowOverLay = memo(
  ({ width, height = 10, borderRadius = 4 }: RowOverLayProps) => {
    // style
    const row = useMemo<ViewStyle>(
      () => ({
        width,
        height,
        borderRadius,
        backgroundColor: "black",
      }),
      [borderRadius, height, width]
    );
    // render
    return <View style={[row]} />;
  },
  isEqual
);

const ItemBase = memo(() => {
  // render
  return (
    <View style={[styles.container]}>
      <View style={[styles.rowCenter]}>
        <View style={[styles.avatarOverlay]} />
        <Spacer width={10} />
        <View>
          <RowOverLay width={100} />
          <Spacer height={5} />
          <RowOverLay width={55} />
          <Spacer height={5} />
          <RowOverLay width={70} />
        </View>
      </View>
      <Spacer height={5} />
      <RowOverLay width={"100%"} />
      <Spacer height={5} />
      <RowOverLay width={"100%"} />
      <Spacer height={5} />
    </View>
  );
}, isEqual);

const BaseContentComponent = () => {
  // state
  const { height: screenHeight } = useWindowDimensions();
  const listItem = useMemo<Array<number>>(
    () =>
      Array(Math.ceil(screenHeight / 70))
        .fill(0)
        .map((_, i) => i),
    [screenHeight]
  );

  // function
  const renderItem = useCallback((item: number) => {
    return <ItemBase key={item} />;
  }, []);

  // render
  return <>{listItem.map(renderItem)}</>;
};

export const BaseContent = memo(BaseContentComponent, isEqual);

interface ParagraphProps {
  size: number;
  lengthShort?: number;
  lengthLong?: number;
}
export const LineText = ({ size }: ParagraphProps) => {
  return (
    <View style={styles.containerLineText}>
      {Array.apply(null, Array(size)).map((value, index: number) => {
        return (
          <View style={styles.wordView} key={index}>
            <View style={styles.lineText} />
            <View style={styles.space} />
          </View>
        );
      })}
    </View>
  );
};
export const ParagraphView = ({
  size = 3,
  lengthShort = 4,
  lengthLong = 5,
}: ParagraphProps) => {
  return (
    <View>
      {Array.apply(null, Array(size)).map((value, index: number) => {
        const count = index % 2 === 0 ? lengthShort : lengthLong;
        return <LineText size={count} key={index} />;
      })}
    </View>
  );
};

export const ItemPractice = () => {
  return (
    <View style={styles.practiceContainer}>
      <View style={styles.imageView} />
      <View style={styles.practiceDescribe}>
        <ParagraphView size={5} />
      </View>
    </View>
  );
};

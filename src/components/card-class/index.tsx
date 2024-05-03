import { scale } from "@/common/scale";
import { style } from "@/common/style";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
// import { navigate } from "@/navigators/navigation-services";
// import { APP_SCREEN } from "@/navigators/screen-type";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";

type Props = {
  item: {
    subjectId: number;
    subjectName: string;
    subjectImage?: string;
    subjectColor?: string;
    studentName?: string;
    studentId?: number;
    startTime: string;
    endTime: string;
  };
  isParent?: boolean;
};

export const CardClass = ({ item, isParent }: Props) => {
  const handleShowDetails = () => {
    if (isParent) {
      navigate(APP_SCREEN.CLASS_DETAIL_SCREEN);
    } else {
      navigate(APP_SCREEN.RESULT_LATEST_SCREEN, {
        isTutor: true,
        subjectId: item.subjectId,
        subjectName: item.subjectName,
        studentName: item.studentName,
        studentId: item.studentId,
      });
    }
  };
  return (
    <Pressable
      style={[styles.item, { backgroundColor: item.subjectColor }]}
      onPress={handleShowDetails}
    >
      <FastImage source={{ uri: item?.subjectImage }} style={style.image} />
      <View style={styles.contentContainer}>
        <TextApp preset="text14">{item.subjectName}</TextApp>
        <TextApp preset="text14">{item.startTime + " - " + item.endTime}</TextApp>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  item: {
    marginVertical: scale(5),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scale(12),
    padding: scale(15),
  },
  contentContainer: {
    flex: 1,
    marginLeft: scale(20),
  },
});

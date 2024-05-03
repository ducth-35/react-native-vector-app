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
    tutor?: string;
    tutorUserId: number;
    startTime: string;
    endTime: string;
  };
};

export const CardResultOverview = ({ item }: Props) => {
  const handleShowDetails = () => {
    navigate(APP_SCREEN.RESULT_LATEST_SCREEN, {
      isTutor: false,
      subjectId: item.subjectId,
      subjectName: item.subjectName,
      tutor: item.tutor,
      studentName: item.studentName,
      studentId: item.studentId,
    });
  };
  return (
    <Pressable
      style={[styles.item, { backgroundColor: item.subjectColor }]}
      onPress={handleShowDetails}
    >
      <FastImage source={{ uri: item?.subjectImage }} style={style.image} />
      <View style={styles.contentContainer}>
        <TextApp preset="text14">{item.subjectName}</TextApp>
        <TextApp preset="text14">Gia sư: {item.tutor}</TextApp>
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

import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { CardInforTutor } from "@/components/card-infor-turtor";
import { Header } from "@/components/header";
import TextApp from "@/components/textApp";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const LeaningOutcomes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header canBack title="Kết quả học" backIcon={<HomeSVG.BACK />} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextApp preset="text16Red" style={styles.text_align}>
          Buổi học ngày - 08/04/2023
        </TextApp>
        <View style={{ margin: scale(20) }}>
          <TextApp preset="text18BlueNormal">Bài tập về nhà</TextApp>
          <CardInforTutor
            lable="Nội dung bài tập về nhà"
            description="Phép tính cộng hai chữ số"
          />
          <CardInforTutor lable="Số bài hoàn thành" description="3" />
          <CardInforTutor lable="Số bài làm sai" description="1" />
          <CardInforTutor lable="Số bài chưa hoàn thành" description="0" />
          <View style={styles.line} />
          <TextApp preset="text18BlueNormal">Buổi học hôm nay</TextApp>
          <CardInforTutor lable="Điểm kiểm tra" description="Không kiểm tra" />
          <CardInforTutor
            lable="Tinh thần học"
            description="Có tinh thần học tốt"
            isStar
            point="4.8"
          />
          <CardInforTutor lable="Bài tập về nhà" />
          <View style={styles.image}>
            <TextApp>Ảnh bài tập về nhà</TextApp>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text_align: {
    textAlign: "center",
    marginTop: scale(15),
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#3d5cff",
    marginVertical: scale(20),
  },
  image: {
    height: 300,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});

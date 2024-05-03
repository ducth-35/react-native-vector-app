import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { Button } from "@/components/btn";
import { CardInforTutor } from "@/components/card-infor-turtor";
import { Header } from "@/components/header";
import { SkeletonLoading } from "@/components/skeleton-loading";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { useGetResultDetail } from "@/services/results";
import { userInforSelector } from "@/store/auth/authSelector";
import { USER_TYPE } from "@/utils/enum";
import { formatNumber } from "@/utils/helper";
import { isUndefined } from "lodash";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export const LeaningOutcomes = (props: any) => {
  const user = useSelector(userInforSelector);
  const params: RouteResultsDetail = props.route?.params;
  const { resultDetail, loadingGetResultDetail } = useGetResultDetail(
    params.id
  );

  const handleFeedback = () => {
    if (resultDetail !== undefined) {
      navigate(APP_SCREEN.FEED_BACK_SCREEN, {
        resultId: resultDetail.id,
        tutorId: resultDetail.tutorId,
      });
    }
  };

  if (loadingGetResultDetail) {
    return (
      <SafeAreaView style={{ marginVertical: scale(30) }}>
        <SkeletonLoading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header canBack title="Kết quả học" backIcon={<HomeSVG.BACK />} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextApp preset="text16tealBlue" style={styles.text_align}>
          Buổi học ngày - {resultDetail?.day}
        </TextApp>
        <View style={{ margin: scale(20) }}>
          <TextApp preset="text18BlueNormal">Bài tập về nhà</TextApp>
          <CardInforTutor
            lable="Nội dung bài tập về nhà"
            description={resultDetail?.content}
          />
          <CardInforTutor
            lable="Số bài hoàn thành"
            description={resultDetail?.numberOfTaskComplete?.toString()}
          />
          <CardInforTutor
            lable="Số bài làm sai"
            description={resultDetail?.numberOfTaskWrong?.toString()}
          />
          <CardInforTutor
            lable="Số bài chưa hoàn thành"
            description={resultDetail?.numberOfTaskNotComplete?.toString()}
          />
          <View style={styles.line} />
          <TextApp preset="text18BlueNormal">Buổi học hôm nay</TextApp>
          <CardInforTutor
            lable="Điểm kiểm tra"
            description={
              !isUndefined(resultDetail?.testMark)
                ? resultDetail?.testMark.toString()
                : "Không kiểm tra"
            }
          />
          <CardInforTutor
            lable="Tinh thần học"
            description={resultDetail?.learningSpiritNote}
            isStar
            point={formatNumber(resultDetail?.learningSpirit || 0)}
          />
          <CardInforTutor
            lable="Tiếp thu bài"
            description={resultDetail?.learningAbilityNote}
            isStar
            point={formatNumber(resultDetail?.learningAbility || 0)}
          />
          <CardInforTutor lable="Bài tập về nhà" />
          <FastImage
            source={{ uri: resultDetail?.assignments }}
            style={styles.image}
            resizeMode="cover"
          />
          {user?.role === USER_TYPE.PARENT ? (
            <View style={styles.viewDone}>
              <Button
                preset="blue"
                title="Đánh giá buổi học"
                onPress={handleFeedback}
              />
            </View>
          ) : (
            <>
              <View style={styles.line} />
              <TextApp preset="text18BlueNormal">
                Đánh giá của phụ huynh
              </TextApp>
              <View style={styles.viewFeedback}>
                <TextApp preset="text16">Dạy rất tốt</TextApp>
                <View style={styles.viewStar}>
                  <HomeSVG.STAR />
                  <TextApp style={{ marginLeft: scale(3) }} preset="text16">
                    5.0
                  </TextApp>
                </View>
              </View>
              <View>
                <TextApp preset="text14Medium" style={styles.viewTextFeedback}>
                  Get working experience to work with this amazing team & in
                  future want to work together for bright future projects.
                </TextApp>
              </View>
            </>
          )}
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
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#3d5cff",
    marginVertical: scale(20),
  },
  image: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  viewStar: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(5),
  },
  viewFeedback: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scale(20),
  },
  viewTextFeedback: {
    marginTop: scale(20),
    lineHeight: scale(28),
  },
  viewDone: {
    marginTop: scale(50),
  },
});

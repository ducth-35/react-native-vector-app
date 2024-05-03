import { HomeSVG } from "@/asset";
import { SCREEN_HEIGHT, scale } from "@/common/scale";
import { Button } from "@/components/btn";
import { CardFeedBackItem } from "@/components/card-feedback";
import { CardInforTutor } from "@/components/card-infor-turtor";
import { Header } from "@/components/header";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { getDetailsTutor } from "@/services/home";
import { useGetRating } from "@/services/tutor";
import { authenStateSelector } from "@/store/auth/authSelector";
import { formatCurrency, formatNumber } from "@/utils/helper";
import { isNullOrEmpty } from "@/utils/method";
import { isUndefined } from "lodash";
import React from "react";
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export const TutorDetailScreen = (props: any) => {
  const { id } = props?.route?.params;
  const isSignIn = useSelector(authenStateSelector);
  const { ratings } = useGetRating(id);

  const { state } = getDetailsTutor(id);
  console.log(state.data?.literacyImages);

  const handleBooking = () => {
    if (isSignIn) {
      navigate(APP_SCREEN.BOOKING_SCREEN, {
        name: state?.data?.fullName,
        subjects: state?.data?.subject,
        schoolName: state?.data?.school,
        tutorId: state?.data?.userId,
      });
    } else {
      navigate(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false });
    }
  };

  const renderItemFeedBack: ListRenderItem<RatingResponseItem> = ({
    item,
    index,
  }) => <CardFeedBackItem item={item} index={index} />;
  return (
    <SafeAreaView style={styles.container}>
      <Header canBack title="Giáo viên" backIcon={<HomeSVG.BACK />} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: scale(50) }}
      >
        <View style={styles.viewBanner}>
          <HomeSVG.BANNER_TUTOR />
          <View style={styles.viewAvatar}>
            {isNullOrEmpty(state?.data?.avatar) ? (
              <HomeSVG.AVATAR_DEFAULT width={scale(52)} height={scale(52)} />
            ) : (
              <FastImage
                source={{ uri: state?.data?.avatar }}
                style={styles.avatar}
              />
            )}
          </View>
        </View>
        <View style={styles.viewBody}>
          <View style={styles.viewName}>
            <TextApp preset="text20">{state?.data?.fullName}</TextApp>
            <View style={styles.viewStar}>
              <HomeSVG.STAR />
              <TextApp preset="text12" style={{ marginLeft: scale(5) }}>
                {formatNumber(state?.data?.rating || 0)}
              </TextApp>
            </View>
          </View>
          <View style={styles.viewSubjec}>
            {state?.data?.subject.map((it) => (
              <View key={it.subjectId} style={styles.viewItemSubjec}>
                <TextApp preset="text10" style={{ color: "#ff6905" }}>
                  {it.subjectName} - {formatCurrency(Number(it.price))}/buổi
                </TextApp>
              </View>
            ))}
          </View>
          <View>
            <CardInforTutor
              lable="Giới thiệu"
              description={
                isNullOrEmpty(state?.data?.introduction)
                  ? "Chưa có giới thiệu"
                  : state?.data?.introduction
              }
            />
            <CardInforTutor lable="Trường" description={state?.data?.school} />
            {/* <CardInforTutor
              lable="Lớp dạy"
              description="Chuyên gia sư từ lớp 1 - lớp 6"
            /> */}
            <CardInforTutor
              lable="Kinh nghiệm dạy học"
              description={
                isNullOrEmpty(state?.data?.experience)
                  ? "Chưa có kinh nghiệm"
                  : state?.data?.experience + " dạy học"
              }
            />
            <CardInforTutor
              lable="Số học sinh đã dạy"
              description={
                isNullOrEmpty(state?.data?.numberOfStudent)
                  ? "Chưa có học sinh nào"
                  : state?.data?.numberOfStudent + " học sinh"
              }
            />
            <CardInforTutor
              lable="Phương pháp dạy"
              description={
                isNullOrEmpty(state?.data?.teachingMethod)
                  ? "Chưa có phương pháp dạy học"
                  : state?.data?.teachingMethod
              }
            />
            <View style={{ marginTop: scale(10) }}>
              <TextApp preset="text16">Thành tích </TextApp>
              {!isUndefined(state.data) &&
              !isUndefined(state.data?.literacyImages) &&
              !isNullOrEmpty(state?.data?.literacyImages) ? (
                state?.data?.literacyImages.map((item, index) => (
                  <View key={index + "achievement"}>
                    <FastImage
                      source={{ uri: item.url }}
                      style={styles.viewAchievementImage}
                    />
                  </View>
                ))
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </View>
        <View style={{ marginTop: scale(10) }}>
          <TextApp preset="text16" style={{ marginHorizontal: scale(20) }}>
            Nhận xét từ phụ huynh
          </TextApp>
          <FlatList
            data={ratings}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemFeedBack}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </ScrollView>
      <View style={styles.viewDone}>
        <Button preset="blue" title="Đặt lịch học" onPress={handleBooking} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  viewBanner: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(20),
  },
  viewAvatar: {
    position: "absolute",
    zIndex: 9,
    bottom: -scale(40),
    left: "50%",
    marginLeft: -50,
    justifyContent: "center",
    alignItems: "center",
    width: scale(100),
    height: scale(100),
    backgroundColor: "#d9dfff",
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#fff",
  },
  avatar: {
    width: scale(68),
    height: scale(68),
    borderRadius: scale(12),
  },
  viewBody: {
    marginTop: "15%",
    marginHorizontal: scale(20),
  },
  viewName: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewStar: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(10),
  },
  viewSubjec: {
    flexDirection: "row",
    marginTop: scale(10),
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  viewItemSubjec: {
    backgroundColor: "#ffebf0",
    marginRight: scale(5),
    marginBottom: scale(10),
    paddingVertical: scale(2),
    paddingHorizontal: scale(10),
    borderRadius: scale(2),
  },
  viewDone: {
    marginHorizontal: scale(20),
    marginBottom: scale(10),
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
  viewAchievementImage: {
    backgroundColor: "#f2f2f2",
    height: SCREEN_HEIGHT / 4,
    marginVertical: scale(10),
    borderRadius: scale(10),
  },
});

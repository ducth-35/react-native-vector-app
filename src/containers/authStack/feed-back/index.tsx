import React from "react";
import { HomeSVG } from "@/asset";
import { Header } from "@/components/header";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AirbnbRating } from "react-native-ratings";
import { View } from "react-native";
import { SCREEN_WIDTH, scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import { FontFamily } from "@/common/constant";
import { Button } from "@/components/btn";
import { getFreeDiskStorageSync } from "react-native-device-info";
import { useCreateRating } from "@/services/tutor";

export const FeedBack = (props: any) => {
  const params: FeedBackParams = props?.route?.params;

  const { state, createRating } = useCreateRating();

  const feedbackContent = React.useRef<{
    rating: number;
    comment: string;
  }>({
    rating: 0,
    comment: "",
  });

  const ratingLearningSpirit = React.useCallback(
    (rating: number) => {
      feedbackContent.current.rating = rating;
    },
    [feedbackContent?.current?.rating]
  );

  const handleSendFeeback = () => {
    const payload: RatingPayload = {
      resultId: params.resultId,
      tutorId: params.tutorId,
      rating: feedbackContent.current.rating,
      comment: feedbackContent.current.comment,
    };
    createRating(payload)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Đánh giá buổi học" canBack backIcon={<HomeSVG.CLOSE />} />
      <ScrollView style={{ marginTop: scale(20) }}>
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={1}
          size={25}
          ratingContainerStyle={{
            marginHorizontal: scale(10),
            marginVertical: scale(20),
          }}
          starContainerStyle={{
            width: SCREEN_WIDTH - scale(50),
            justifyContent: "space-evenly",
          }}
          onFinishRating={ratingLearningSpirit}
        />
        <View style={styles.line} />
        <View style={styles.viewFeedback}>
          <TextApp preset="text15_bold">Viết nhận xét của bạn</TextApp>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              placeholder="Nhập nhận xét của bạn..."
              editable
              multiline
              onChangeText={(value) =>
                (feedbackContent.current.comment = value)
              }
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewBtn}>
        <Button
          preset="blue"
          title="Gửi đánh giá"
          onPress={handleSendFeeback}
          isLoading={state.loading}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  line: {
    height: scale(10),
    backgroundColor: "#f0f2f3",
    marginVertical: scale(25),
  },
  viewFeedback: {
    marginHorizontal: scale(20),
    marginTop: scale(5),
  },
  viewInput: {
    borderWidth: 1,
    borderColor: "#f0f2f3",
    height: scale(150),
    padding: scale(10),
    borderRadius: scale(3),
    marginTop: scale(10),
  },
  input: {
    fontFamily: FontFamily.SFUIText_regular,
  },
  viewBtn: {
    position: "absolute",
    bottom: scale(30),
    left: scale(20),
    right: scale(20),
  },
});

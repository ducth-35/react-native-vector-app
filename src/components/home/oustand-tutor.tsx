import React from "react";
import TextApp from "../textApp";
import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import { SCREEN_WIDTH, scale } from "../../common/scale";
import { CardOutStand } from "../card-outstand";
import { navigate } from "../../navigators/navigation-services";
import { APP_SCREEN } from "../../navigators/screen-type";
import { useGetTutorSuggestion } from "@/services/home";
import { HIT_SLOP } from "@/utils/helper";

export const OutstandTutor = () => {
  const { state } = useGetTutorSuggestion();

  const renderItem: ListRenderItem<TutorSuggestionInterface> = ({
    item,
    index,
  }) => {
    const handlePressItem = () => {
      navigate(APP_SCREEN.TUTOR_DETAIL_SCREEN, { id: item?.id });
    };
    return (
      <CardOutStand
        key={index + "outstand"}
        item={item}
        newStyle={style.viewCardOutStand}
        onPress={handlePressItem}
      />
    );
  };

  const handleShowOutstanding = () => {
    navigate(APP_SCREEN.OUTSTANDING_TUTOR_SCREEN);
  };

  return (
    <View style={style.container}>
      <View style={style.textHeader}>
        <TextApp preset="text18" style={style.title}>
          Gia sư nổi bật
        </TextApp>
        <TouchableOpacity hitSlop={HIT_SLOP} onPress={handleShowOutstanding}>
          <TextApp preset="text14" style={[style.title, { color: "#3d5cff" }]}>
            Chi tiết
          </TextApp>
        </TouchableOpacity>
      </View>
      <View style={style.viewListOutStand}>
        <FlatList
          data={state?.data.slice(0, 5)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCardOutStand: {
    width: SCREEN_WIDTH / 1.2,
    backgroundColor: "#f8f8ff",
    flexDirection: "row",
    padding: scale(10),
    marginTop: scale(10),
    borderRadius: scale(12),
    marginLeft: scale(20),
  },
  title: {
    marginHorizontal: scale(20),
  },
  textHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewListOutStand: {},
});

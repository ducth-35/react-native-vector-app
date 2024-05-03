import React from "react";
import { FlatList, ListRenderItem, Pressable, View } from "react-native";
import TextApp from "../textApp";
import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import FastImage from "react-native-fast-image";
import { Skeleton } from "./skeleton";
import { style } from "../../common/style";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";

export const Subject = () => {
  const [subjects, setSubjects] = React.useState<dataSubjectsInterface[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await homeApi.getSubjects();
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setSubjects(res?.data?.data);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOnPressSubject = (subjectName?: string) => {
    navigate(APP_SCREEN.SEARCH_SCREEN, { subject: subjectName });
  };

  const renderItem: ListRenderItem<dataSubjectsInterface> = ({ item }) => {
    return (
      <Pressable
        style={style.item}
        onPress={() => handleOnPressSubject(item.name)}
      >
        <FastImage source={{ uri: item?.image }} style={style.image} />
        <TextApp preset="text14" style={style.name} numberOfLines={2}>
          {item.name}
        </TextApp>
      </Pressable>
    );
  };
  return (
    <View style={style.container}>
      <TextApp preset="text18" style={style.title}>
        Môn học
      </TextApp>
      <FlatList
        data={subjects}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

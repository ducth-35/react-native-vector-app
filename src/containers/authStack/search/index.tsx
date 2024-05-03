import React from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import TextApp from "../../../components/textApp";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "../../../components/home/search";
import { CardOutStand } from "../../../components/card-outstand";
import { HomeSVG } from "../../../asset";
import { scale } from "../../../common/scale";
import { goBack, navigate } from "../../../navigators/navigation-services";
import { APP_SCREEN } from "../../../navigators/screen-type";
import {
  HIT_SLOP,
  formatCurrency,
  parserGender,
  parserLiteracyToName,
  parserNameToLiteracy,
} from "@/utils/helper";
import { ModalFilter } from "./modal-filter";
import { isNullOrEmpty } from "@/utils/method";
import { useFilter } from "./services";
import { Skeleton } from "./skeleton";

export const SearchScreen = (props: any) => {
  const { subject } = props?.route?.params;
  const modalfilter = React.useRef<any>();

  const [listFilter, setListFilter] = React.useState<
    (string | number | undefined)[]
  >([]);
  const [paramsFilter, setParamsFilter] = React.useState<ParamsFilter>({
    subject: subject,
  });
  const { state, onLoadMore } = useFilter(paramsFilter);

  const handleCloseModal = () => {
    modalfilter?.current?.close();
  };

  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    const handlePressItem = () => {
      navigate(APP_SCREEN.TUTOR_DETAIL_SCREEN, { id: item?.id });
    };
    return (
      <CardOutStand
        key={item.id + "filter"}
        item={item}
        newStyle={styles.viewCardOutStand}
        onPress={handlePressItem}
      />
    );
  };

  const handlePressFilter = () => {
    modalfilter?.current?.open();
  };

  const handleCallFilter = (data: {
    subject: string;
    class: string;
    sex: string;
    level: string;
    school: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    const params: ParamsFilter = {};

    if (data.subject) params.subject = data.subject;
    if (data.class) params.grade = data.class;
    if (data.sex) params.sex = parserGender(data.sex);
    if (data.level) params.literacy = parserNameToLiteracy(data?.level);
    if (data.school) params.school = data.school;
    if (data.minPrice) params.minPrice = data.minPrice;
    if (data.maxPrice) params.maxPrice = data.maxPrice;

    const listFilter = Object.values({
      ...params,
      sex: data?.sex,
      minPrice: formatCurrency(params.minPrice),
      maxPrice: formatCurrency(params.maxPrice),
      literacy: parserLiteracyToName(params.literacy),
    });
    setListFilter(listFilter.filter((item) => item !== ""));
    setParamsFilter(params);
    modalfilter?.current?.close();
  };

  return (
    <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
      <View style={styles.viewSearch}>
        <TouchableOpacity
          hitSlop={HIT_SLOP}
          style={styles.viewBack}
          onPress={() => goBack()}
        >
          <HomeSVG.BACK />
        </TouchableOpacity>
        <View style={styles.search}>
          <Search
            leftIcon={<HomeSVG.SEARCH />}
            placeholder="Tìm gia sư, lớp năng khiếu..."
          />
        </View>
      </View>
      <View style={styles.listFilter}>
        <TouchableOpacity
          hitSlop={HIT_SLOP}
          style={styles.filter}
          onPress={handlePressFilter}
        >
          <HomeSVG.FILTER />
        </TouchableOpacity>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flexDirection: "row" }}
        >
          {isNullOrEmpty(listFilter) ? (
            <>
              {["Môn học", "Lớp", "Giới tính", "Trình độ", "Trường", "Giá"].map(
                (item, index) => (
                  <View key={index + "key"} style={[styles.itemFilter]}>
                    <TextApp
                      preset={
                        !isNullOrEmpty(listFilter)
                          ? "text12NormalBlue"
                          : "text12"
                      }
                    >
                      {item}
                    </TextApp>
                  </View>
                )
              )}
            </>
          ) : (
            <>
              {listFilter.map((item, index) => (
                <Pressable
                  key={index + "key"}
                  style={[styles.itemFilter]}
                  onPress={handlePressFilter}
                >
                  <TextApp
                    preset={
                      !isNullOrEmpty(listFilter) ? "text12NormalBlue" : "text12"
                    }
                  >
                    {item}
                  </TextApp>
                </Pressable>
              ))}
            </>
          )}
        </ScrollView>
      </View>

      <View style={styles.viewListOutStand}>
        <TextApp preset="text18" style={styles.title}>
          Gia sư
        </TextApp>
        {state?.loading ? (
          <Skeleton />
        ) : (
          <FlatList
            data={state?.data}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(50),
              paddingTop: scale(10),
            }}
            onEndReachedThreshold={0.5}
            onEndReached={onLoadMore}
          />
        )}
      </View>
      <ModalFilter
        ref={modalfilter}
        handleClose={handleCloseModal}
        onSave={handleCallFilter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewListOutStand: {
    flex: 1,
  },
  viewSearch: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(10),
  },
  viewBack: {
    marginLeft: scale(15),
  },
  search: {
    flex: 1,
    marginLeft: scale(15),
    marginRight: scale(20),
  },
  viewCardOutStand: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: scale(10),
    marginBottom: scale(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(20),
    marginHorizontal: scale(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    flex: 0,
    flexGrow: 0,
    order: 0,
  },
  title: {
    marginHorizontal: scale(20),
    marginVertical: scale(10),
  },
  filter: {
    paddingHorizontal: scale(20),
  },
  newStyle: {
    backgroundColor: "#f8f8ff",
    marginHorizontal: scale(20),
    marginTop: scale(10),
    borderRadius: scale(12),
  },
  listFilter: {
    marginTop: scale(15),
    flexDirection: "row",
    alignItems: "center",
  },
  itemFilter: {
    marginRight: scale(10),
    backgroundColor: "#f4f3fd",
    padding: scale(5),
    borderRadius: scale(8),
  },
});

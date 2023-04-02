import React from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import TextApp from "../../../components/textApp";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "../../../components/home/search";
import { DataOutStand } from "../../../utils/mock-data";
import { OutStandInterface } from "../../../types/outstand";
import { CardOutStand } from "../../../components/card-outstand";
import { HomeSVG } from "../../../assets";
import { scale } from "../../../common/scale";
import { goBack } from "../../../navigators/navigation-services";

export const SearchScreen = () => {
  const renderItem: ListRenderItem<OutStandInterface> = ({ item }) => {
    return <CardOutStand item={item} newStyle={styles.viewCardOutStand} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewSearch}>
        <TouchableOpacity
          hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
          style={styles.viewBack}
          onPress={() => goBack()}
        >
          <HomeSVG.BACK />
        </TouchableOpacity>
        <View style={styles.search}>
          <Search />
        </View>
      </View>
      <View style={styles.viewListOutStand}>
        <TextApp preset="text18" style={styles.title}>
          Gia sư
        </TextApp>
        <FlatList
          data={DataOutStand}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
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
  viewListOutStand: {
    flex: 1,
  },
  viewSearch: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewBack: {
    marginLeft: scale(20),
  },
  search: {
    flex: 1,
    marginLeft: scale(15),
    marginRight: scale(20),
  },
  viewCardOutStand: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: scale(15),
    marginTop: scale(15),
    borderRadius: scale(12),
    marginHorizontal: scale(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    flex: 0,
    flexGrow: 0,
    order: 0,
  },
  title: {
    marginHorizontal: scale(20),
    marginVertical: scale(10),
  },
});

import React from "react";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TextApp from "@/components/textApp";
import { scale } from "@/common/scale";
import { ScrollView } from "react-native-gesture-handler";

type ModalSelectProps = {
  data?: LocationInterface[];
  type?: string | undefined;
  onCloseModal?: (data: {
    item: LocationInterface;
    type: string | undefined;
  }) => void;
};

export const ModalSelect = React.forwardRef(
  ({ data, onCloseModal, type }: ModalSelectProps, ref) => {
    const [tempSelectedItems, setTempSelectedItems] =
      React.useState<LocationInterface>();

    const handleSelectItem = (item: LocationInterface) => {
      const data = { item: item, type: type };
      setTempSelectedItems(item);
      onCloseModal?.(data);
    };
    return (
      <Portal>
        <Modalize
          modalStyle={styles.calendarFilter}
          adjustToContentHeight={true}
          ref={ref}
          handleStyle={{
            display: "none",
          }}
          closeOnOverlayTap={true}
          disableScrollIfPossible={false}
          scrollViewProps={{
            showsVerticalScrollIndicator: false
          }}
        >
          <ScrollView>
            {data?.map((item, index) => (
              <TouchableOpacity
                key={index + "location"}
                style={[styles.viewLocation]}
                onPress={() => handleSelectItem(item)}
              >
                <TextApp
                  preset="text14"
                  style={[
                    styles.text,
                    item?.id === tempSelectedItems?.id && styles.textSelected,
                  ]}
                >
                  {item?.title}
                </TextApp>
              </TouchableOpacity>
            ))}</ScrollView>
        </Modalize>
      </Portal>
    );
  }
);
const styles = StyleSheet.create({
  calendarFilter: {
    borderTopRightRadius: scale(25),
    borderTopLeftRadius: scale(25),
    paddingTop: scale(30),
  },
  viewLocation: {
    alignItems: "center",
    marginBottom: scale(20),
    paddingHorizontal: scale(20),
  },
  text: {
    color: "#858597",
    textAlign: "center",
  },
  textSelected: {
    color: "#3d5cff",
  },
});

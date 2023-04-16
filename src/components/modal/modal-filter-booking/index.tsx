import React from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale } from "../../../common/scale";
import TextApp from "../../textApp";
import { HomeSVG } from "../../../asset";

interface ModalizeFilterProps {
  data: {
    label: string;
    item: string[];
  };
  handleClose: () => void;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ModalizeFilterBooking = React.forwardRef(
  (props: ModalizeFilterProps, ref) => {
    const { data, handleClose, selectedItems, setSelectedItems } = props;
    const [tempSelectedItems, setTempSelectedItems] = React.useState<string>(
      selectedItems[0]
    );

    const handleItemPress = (item: string) => {
      setTempSelectedItems(item);
    };

    const handleSelectDone = () => {
      setSelectedItems([tempSelectedItems]);
      handleClose();
    };

    const handleCloseModal = () => {
      if (tempSelectedItems !== selectedItems[0]) {
        handleClose();
        setTempSelectedItems(selectedItems[0]);
      }
      handleClose();
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
          closeOnOverlayTap={false}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.iconClose}
              onPress={handleCloseModal}
            >
              <HomeSVG.CLOSE />
            </TouchableOpacity>
            <TextApp preset="text18">{data.label}</TextApp>
          </View>
          <View style={styles.viewBody}>
            {data.item.map((it) => (
              <TouchableOpacity
                key={it}
                style={[
                  styles.body,
                  tempSelectedItems === it && styles.selected,
                ]}
                onPress={() => handleItemPress(it)}
              >
                <TextApp
                  preset="text12"
                  style={[
                    styles.text,
                    tempSelectedItems === it && styles.textSelected,
                  ]}
                >
                  {it}
                </TextApp>
              </TouchableOpacity>
            ))}
          </View>

          {/* )} */}

          <Pressable style={styles.done} onPress={handleSelectDone}>
            <TextApp style={styles.textdone}>Lọc</TextApp>
          </Pressable>
        </Modalize>
      </Portal>
    );
  }
);

const styles = StyleSheet.create({
  calendarFilter: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(20),
  },
  done: {
    alignItems: "center",
    backgroundColor: "#3d5cff",
    paddingVertical: scale(13),
    marginHorizontal: scale(20),
    borderRadius: scale(12),
    marginBottom: scale(30),
  },
  textdone: {
    color: "#fff",
  },
  body: {
    marginHorizontal: scale(5),
    marginBottom: scale(10),
    backgroundColor: "#f4f3fd",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: 10,
  },
  viewBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: scale(20),
    paddingBottom: scale(30),
  },
  text: {
    color: "#858597",
  },
  iconClose: {
    position: "absolute",
    left: 20,
  },
  selected: {
    backgroundColor: "#3d5cff",
  },
  textSelected: {
    color: "#fff",
  },
});

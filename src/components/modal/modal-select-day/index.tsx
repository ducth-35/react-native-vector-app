import React from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scale } from "../../../common/scale";
import TextApp from "../../textApp";
import { ButtonConfirm } from "@/components/button-confirm";

interface ModalizeFilterProps {
  data: {
    label: string;
    item: string[];
  };
  handleClose: () => void;
  handleOpenNewModal: () => void;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ModalizeSelectDay = React.forwardRef(
  (
    {
      data,
      handleClose,
      selectedItems,
      setSelectedItems,
      handleOpenNewModal,
    }: ModalizeFilterProps,
    ref
  ) => {
    const [tempSelectedItems, setTempSelectedItems] =
      React.useState<string[]>(selectedItems);

    React.useEffect(() => {
      setTempSelectedItems(selectedItems);
    }, [selectedItems]);

    const handleItemPress = (item: string) => {
      setTempSelectedItems((prevSelectedItems) => {
        if (prevSelectedItems.includes(item)) {
          return prevSelectedItems.filter((i) => i !== item);
        } else {
          return [...prevSelectedItems, item];
        }
      });
    };

    const handleSelectDone = () => {
      setSelectedItems(tempSelectedItems);
      handleOpenNewModal();
    };

    const handleCloseModal = () => {
      if (JSON.stringify(tempSelectedItems) !== JSON.stringify(selectedItems)) {
        handleClose();
        setTempSelectedItems(selectedItems);
      } else {
        handleClose();
      }
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
          //   closeOnOverlayTap={false}
        >
          <View style={styles.container}>
            <TextApp preset="text18">{data.label}</TextApp>
          </View>

          <View style={styles.viewBody}>
            {data.item.map((it) => (
              <TouchableOpacity
                key={it}
                style={[
                  styles.body,
                  tempSelectedItems.includes(it) && styles.selected,
                ]}
                onPress={() => handleItemPress(it)}
              >
                <TextApp
                  preset="text12"
                  style={[
                    styles.text,
                    tempSelectedItems.includes(it) && styles.textSelected,
                  ]}
                >
                  {it}
                </TextApp>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.btn}>
            <ButtonConfirm
              textConfirm={"Tiếp tục"}
              textCancel={"Huỷ"}
              pressCancel={handleCloseModal}
              pressConfirrm={handleSelectDone}
            />
          </View>
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
    paddingVertical: scale(25),
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
  viewSchool: {
    alignItems: "center",
    marginHorizontal: scale(5),
    marginBottom: scale(20),
    paddingHorizontal: scale(20),
  },
  schoolSelected: {
    color: "#3d5cff",
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
});

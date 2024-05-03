import React from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import {
  Pressable,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { scale } from "../../../common/scale";
import TextApp from "../../textApp";
import { HomeSVG } from "../../../asset";
import { HIT_SLOP } from "@/utils/helper";

interface ModalizeSelectSubjectProps {
  data: {
    label: string;
    item: string[];
  };
  handleClose: () => void;
  selectedItems: string[] | any;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[] | any>>;
  isOneSelect?: boolean;
  isDisable?: boolean;
  newstyle?: ViewStyle;
  newtext?: TextStyle;
}

export const ModalizeSelectSubject = React.forwardRef(
  (props: ModalizeSelectSubjectProps, ref) => {
    const {
      data,
      handleClose,
      selectedItems,
      setSelectedItems,
      isOneSelect,
      isDisable,
      newstyle,
      newtext,
    } = props;
    const [tempSelectedItems, setTempSelectedItems] =
      React.useState<any[]>(selectedItems);

    React.useEffect(() => {
      setTempSelectedItems(selectedItems);
    }, [selectedItems]);

    const handleItemPress = (item: any) => {
      if (isOneSelect) {
        setTempSelectedItems((prevSelectedItems) => {
          if (prevSelectedItems.includes(item)) {
            return [];
          } else {
            return [item];
          }
        });
      } else {
        setTempSelectedItems((prevSelectedItems) => {
          if (prevSelectedItems.includes(item)) {
            return prevSelectedItems.filter((i) => i !== item);
          } else {
            return [...prevSelectedItems, item];
          }
        });
      }
    };

    const handleSelectDone = () => {
      setSelectedItems(tempSelectedItems);
      handleClose();
    };

    const handleCloseModal = () => {
      if (JSON.stringify(tempSelectedItems) !== JSON.stringify(selectedItems)) {
        handleClose();
        setTempSelectedItems(selectedItems);
      } else {
        handleClose();
      }
    };

    if (!data?.item) {
      return null; // or render a loading/error state if desired
    }

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
          scrollViewProps={{
            showsVerticalScrollIndicator: false
          }}
        >
          <View style={styles.container}>
            <TouchableOpacity
              hitSlop={HIT_SLOP}
              style={styles.iconClose}
              onPress={handleCloseModal}
            >
              <HomeSVG.CLOSE />
            </TouchableOpacity>
            <TextApp preset="text18">{data.label}</TextApp>
          </View>

          <View style={styles.viewBody}>
            {data.item.map((item: any) => (
              <TouchableOpacity
                key={item.subjectName}
                style={[
                  styles.body,
                  tempSelectedItems.includes(item) && styles.selected,
                ]}
                onPress={() => handleItemPress(item)}
              >
                <TextApp
                  preset="text12"
                  style={[
                    styles.text,
                    tempSelectedItems.includes(item) && styles.textSelected,
                  ]}
                >
                  {item.subjectName}
                </TextApp>
              </TouchableOpacity>
            ))}
          </View>
          <Pressable
            style={[styles.done, isDisable && newstyle]}
            onPress={handleSelectDone}
            disabled={isDisable}
          >
            <TextApp style={[styles.textdone, isDisable && newtext]}>
              Hoàn thành chọn
            </TextApp>
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
  viewSchool: {
    alignItems: "center",
    marginHorizontal: scale(5),
    marginBottom: scale(20),
    paddingHorizontal: scale(20),
  },
  schoolSelected: {
    color: "#3d5cff",
  },
});

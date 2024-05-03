import React from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import TextApp from "../../textApp";
import { scale } from "@/common/scale";
import { CardInput } from "@/components/card-input";
import { ButtonConfirm } from "@/components/button-confirm";
import { ModalizeFilter } from "@/components/modal/Modalize-filter";
import { InputRegister } from "@/components/input-register";
import { Filter } from "@/utils/enum";
import { useGetGrades } from "@/services/grades";

type Props = {
  title?: string;
  children?: JSX.Element;
  pressCancel: () => void;
  onSave: (
    data: { fullName: string; phone: string; grade: string },
    selectedIndex: number
  ) => void; // Thêm selectedIndex vào onSave
  selectedItem: ChildrenInforInterface | null;
  selectedIndex: number; // Thêm prop selectedIndex
};

export const ModalizeAddInforChildren = React.forwardRef(
  ({ selectedItem, selectedIndex, title, pressCancel, onSave }: Props, ref) => {
    const { grades } = useGetGrades();
    const [fullName, setFullName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [selectedClassItems, setSelectedClassItems] = React.useState<
      string[]
    >([]);

    const [dataModal, setDataModal] = React.useState<{
      label: string;
      item: string[];
    }>({
      label: "",
      item: [],
    });

    const modalizeClassRef = React.useRef<any>();

    const handleConfirm = () => {
      const infor = {
        fullName: fullName,
        phone: phone,
        grade: selectedClassItems.join(""),
      };
      onSave?.(infor, selectedIndex);
      pressCancel?.();
      onReset?.();
    };

    const onReset = () => {
      setFullName("");
      setPhone("");
      setSelectedClassItems([]);
    };

    React.useEffect(() => {
      if (selectedItem && selectedIndex !== -1) {
        setFullName(selectedItem?.fullName || "");
        setPhone(selectedItem?.phone || "");
        setSelectedClassItems([selectedItem?.grade] || []);
      } else {
        setFullName("");
        setPhone("");
        setSelectedClassItems([]);
      }
    }, [selectedItem, selectedIndex]);

    const handleOpenModal = (type: string) => {
      const dataGrades = {
        label: "Lớp dạy",
        item: grades,
      };
      setDataModal(dataGrades);
      modalizeClassRef.current.open();
    };

    return (
      <Portal>
        <Modalize
          modalStyle={styles.container}
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
          <TextApp preset="text18" style={styles.title}>
            {title}
          </TextApp>
          <View style={{ marginBottom: scale(35) }}>
            <CardInput
              lable="Tên của con"
              placeholder="Tên con"
              value={fullName}
              onChangeText={setFullName}
            />
            <InputRegister
              lable="Lớp dạy"
              placeholder="Chọn lớp dạy"
              editable={false}
              isSelect
              onPressIn={handleOpenModal.bind(null, Filter.CLASS)}
              value={selectedClassItems}
              newStyle={styles.newInput}
            />

            <CardInput
              lable="Tài khoản nhập"
              placeholder="Số điện thoại của con"
              value={phone}
              keyboardType="number-pad"
              onChangeText={setPhone}
            />
          </View>
          <View style={styles.btn}>
            <ButtonConfirm
              textConfirm={"Tiếp tục"}
              textCancel={"Huỷ"}
              pressCancel={pressCancel}
              pressConfirrm={() => handleConfirm()}
            />
          </View>
        </Modalize>
        <ModalizeFilter
          ref={modalizeClassRef}
          data={dataModal}
          handleClose={() => modalizeClassRef.current.close()}
          selectedItems={selectedClassItems}
          setSelectedItems={setSelectedClassItems}
          isOneSelect
        />
      </Portal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    marginVertical: scale(20),
    textAlign: "center",
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
  newInput: {
    backgroundColor: "#f4f3fd",
    borderColor: "#f4f3fd",
  },
});

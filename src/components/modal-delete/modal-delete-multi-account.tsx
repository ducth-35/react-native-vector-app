import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "@/common/scale";
import { AccountChildrenInterface } from "@/containers/authStack/children-account";
import { isNullOrEmpty } from "@/utils/method";

type Props = {
  visible: boolean;
  handleDelete?: () => void;
  handleCancel?: () => void;
  data: AccountChildrenInterface[];
  onDelete?: (data: number[]) => void;
};

export const ModalDeleteMutilAccount = ({
  visible,
  handleCancel,
  data,
  onDelete,
}: Props) => {
  const [products, setProducts] =
    React.useState<AccountChildrenInterface[]>(data);

  const handleChange = (id: number) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };

  const handleDelete = () => {
    const selectedIds: number[] = products
      .filter((product) => product.isChecked)
      .map((product) => product.id);

    // Call the onDelete callback with the selected products
    onDelete?.(selectedIds);

    // Set the isChecked property of all products to false
    const updatedProducts = products.map((product) => ({
      ...product,
      isChecked: false,
    }));
    setProducts(updatedProducts);
  };
  
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={style.container}>
        <View style={style.contentContainer}>
          <View style={style.margin}>
            <TextApp preset="text18" style={style.txt_title}>
              Chọn tài khoản bạn muốn xoá
            </TextApp>
            <View style={style.listaccount}>
              {products?.map((item) => (
                <View style={style.itemaccount} key={item.id}>
                  <TouchableOpacity
                    onPress={handleChange.bind(null, item.id)}
                    style={[
                      style.viewCheckBox,
                      item.isChecked && style.selected,
                    ]}
                  />
                  <TextApp>{item.fullName}</TextApp>
                </View>
              ))}
            </View>
            <View style={style.bt_container}>
              <TouchableOpacity style={[style.button]} onPress={handleCancel}>
                <TextApp style={style.txt_ok}>Huỷ</TextApp>
              </TouchableOpacity>
              <View style={style.two_bt_container} />
              <TouchableOpacity style={style.button} onPress={handleDelete}>
                <TextApp style={style.txt_cancel}>Xoá</TextApp>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(41, 41, 41, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(50),
  },
  contentContainer: {
    borderRadius: scale(15),
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  txt_title: {
    marginHorizontal: scale(25),
    textAlign: "center",
    marginBottom: scale(20),
  },
  txt_message: {
    width: scale(256),
    marginHorizontal: scale(17),
    textAlign: "center",
    fontWeight: "400",
    marginBottom: scale(21),
    lineHeight: scale(20),
  },
  bt_container: {
    width: "100%",
    borderTopWidth: scale(0.8),
    borderTopColor: "#D5D5D5",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  txt_ok: {
    marginVertical: scale(10),
    fontSize: 16,
    fontWeight: "600",
    color: "#007aff",
  },
  two_bt_container: {
    height: "100%",
    width: scale(0.5),
    backgroundColor: "#D5D5D5",
  },
  txt_cancel: {
    marginVertical: scale(10),
    fontSize: 16,
    fontWeight: "400",
    color: "#007aff",
  },
  button: { flex: 0.5, alignItems: "center" },
  margin: {
    paddingTop: scale(15),
  },
  listaccount: {
    marginHorizontal: scale(30),
    marginBottom: scale(10),
  },
  itemaccount: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(15),
  },
  viewCheckBox: {
    width: scale(24),
    height: scale(24),
    borderColor: "#b8b8d2",
    borderWidth: 1.5,
    borderRadius: scale(5),
    marginRight: scale(10),
  },
  selected: {
    backgroundColor: "#3d5cff",
    borderWidth: 0,
  },
});

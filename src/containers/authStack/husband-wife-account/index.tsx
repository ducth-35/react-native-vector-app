import { HomeSVG } from "@/asset";
import { Header } from "@/components/header";
import { InputRegister } from "@/components/input-register";
import { ModalizeAddInforParent } from "@/components/register/modalize-add-infor-parents";
import TextApp from "@/components/textApp";
import { userInforSelector } from "@/store/auth/authSelector";
import { isNullOrEmpty } from "@/utils/method";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useDeleteParent } from "./services";
import { LoadingView } from "@/components/loading-view";
import { ModalConfirmDelete } from "@/components/modal-delete";

export const HusbandWifeAccount = () => {
  const user = useSelector(userInforSelector);
  const { state, addParent, deleteParent } = useDeleteParent();
  const modalizeAddInforParent = React.useRef<any>();
  const [inputInfor, setInputInfor] = React.useState<{
    name: string | undefined;
    account: string | undefined;
  }>({
    name: user.otherParent?.fullName,
    account: user.otherParent?.phoneNumber,
  });
  const [showDelete, setShowDelete] = React.useState<boolean>(false);

  const handleConfirmInforParent = () => {
    modalizeAddInforParent?.current?.open();
  };

  const handleAddInforParent = (data: { fullName: string; phone: string }) => {
    const params = {
      fullName: data?.fullName,
      phone: data?.phone,
    };
    modalizeAddInforParent?.current?.close();
    addParent(params);
  };

  const handleDeleteAccount = () => {
    setShowDelete(true);
  };

  const handleConfirmDeleteAccount = () => {
    deleteParent();
    setShowDelete(false);
  };

  const handleCancelDeleteAccount = () => {
    setShowDelete(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Tài khoản vợ/chồng"
        isRightIcon={!isNullOrEmpty(user.otherParent) ? true : false}
        canBack
        rightIcon={<TextApp preset="text16Blue">Xoá</TextApp>}
        backIcon={<HomeSVG.BACK />}
        handleRightIcon={handleDeleteAccount}
      />
      {!isNullOrEmpty(user.otherParent) ? (
        <>
          <InputRegister
            lable="Tên vợ/chồng"
            placeholder="Nhập tên bạn"
            value={inputInfor?.name}
            editable={false}
          />
          <InputRegister
            lable="Tài khoản"
            placeholder="Nhập tên bạn"
            value={inputInfor?.account}
            editable={false}
          />
        </>
      ) : (
        <InputRegister
          lable="Thêm tài khoản vợ/chồng"
          isAdd={isNullOrEmpty(user.otherParent)}
          txtIsAdd="Thêm tài khoản"
          onPress={handleConfirmInforParent}
        />
      )}
      <ModalizeAddInforParent
        ref={modalizeAddInforParent}
        title="Thêm tài khoản vợ/chồng"
        pressCancel={() => modalizeAddInforParent?.current?.close()}
        onSave={handleAddInforParent}
      />
      <ModalConfirmDelete
        content={"Bạn có chắc chắn muốn xoá tài khoản này ?"}
        txtcancel={"Huỷ"}
        txtconfirm={"Xoá"}
        visible={showDelete}
        handleDelete={handleConfirmDeleteAccount}
        handleCancel={handleCancelDeleteAccount}
      />
      {state?.loading && <LoadingView />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

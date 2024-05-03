import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { InputRegister } from "@/components/input-register";
import { ModalConfirmDelete } from "@/components/modal-delete";
import { ModalDeleteMutilAccount } from "@/components/modal-delete/modal-delete-multi-account";
import { ModalizeAddInforChildren } from "@/components/register/modalize-add-infor-childrens";
import TextApp from "@/components/textApp";
import { userInforSelector } from "@/store/auth/authSelector";
import React from "react";
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useAddStudents } from "./services";
import { LoadingView } from "@/components/loading-view";
import { isNullOrEmpty } from "@/utils/method";

export type AccountChildrenInterface = {
  fullName: string;
  gradeName?: string;
  id: number;
  phoneNumber?: string;
  isChecked?: boolean;
};

export const ChildrenAccount = () => {
  const user = useSelector(userInforSelector);
  const { state, addStudent, deleteStudent } = useAddStudents();
  const modalizeAddInfor = React.useRef<any>();
  const [showDelete, setShowDelete] = React.useState<boolean>(false);
  const [showDeleteMultiAccount, setShowDeleteMultiAccount] =
    React.useState<boolean>(false);
  const [selectedItemChildren, setSelectedItemChildren] =
    React.useState<ChildrenInforInterface | null>(null);

  const [selectedIndexItemChildren, setSelectedIndexItemChildren] =
    React.useState(-1);

  const handleSaveInforChildren = (
    data: { fullName: string; phone: string; grade: string },
    selectedIndex: number
  ) => {
    const params = [data];
    addStudent(params);
  };

  const handleConfirmInforChildren = () => {
    modalizeAddInfor?.current?.open();
  };

  const renderItem: ListRenderItem<AccountChildrenInterface> = ({
    item,
    index,
  }) => {
    return (
      <View key={index}>
        <InputRegister
          lable="Tên con"
          placeholder="Nhập tên con"
          value={item?.fullName}
          editable={false}
        />
        <InputRegister
          lable="Lớp"
          placeholder="Nhập lớp"
          value={item?.gradeName}
          editable={false}
        />
        <InputRegister
          lable="Tài khoản đăng nhập"
          placeholder="Nhập tài khoản"
          value={item?.phoneNumber}
          editable={false}
        />
      </View>
    );
  };

  const renderFooterComponent = () => {
    return (
      <InputRegister
        lable="Thêm tài khoản con"
        isAdd={true}
        txtIsAdd="Thêm tài khoản"
        onPress={handleConfirmInforChildren}
      />
    );
  };

  const renderSeparator = (index: number) => {
    const style =
      index === user?.children?.length - 1 ? { borderBottomWidth: 0 } : {};
    return <View style={[styles.separator, style]} />;
  };

  const handleDeleteAccount = () => {
    if (user?.children?.length > 1) {
      setShowDeleteMultiAccount(true);
    } else {
      setShowDelete(true);
    }
  };

  const handleConfirmDeleteAccount = () => {
    if (user?.children.length > 0) {
      const params = {
        ids: [user?.children[0]?.id],
      };
      setShowDelete(false);
      deleteStudent(params);
    }
  };

  const handleCancelDeleteAccount = () => {
    setShowDelete(false);
  };

  const handleDeleteMultiAccount = (data: number[]) => {
    const params = {
      ids: data,
    };
    deleteStudent(params);
    setShowDeleteMultiAccount(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Tài khoản các con"
        isRightIcon={!isNullOrEmpty(user.children) ? true : false}
        canBack
        rightIcon={<TextApp preset="text16Blue">Xoá</TextApp>}
        backIcon={<HomeSVG.BACK />}
        handleRightIcon={handleDeleteAccount}
      />
      <FlatList
        data={user?.children}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        ListFooterComponent={renderFooterComponent}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={{ paddingBottom: scale(50) }}
      />
      <ModalizeAddInforChildren
        ref={modalizeAddInfor}
        title="Thêm tài khoản của con"
        pressCancel={() => modalizeAddInfor?.current?.close()}
        onSave={handleSaveInforChildren}
        selectedItem={selectedItemChildren}
        selectedIndex={selectedIndexItemChildren}
      />
      <ModalConfirmDelete
        content={"Bạn có chắc chắn muốn xoá tài khoản này ?"}
        txtcancel={"Huỷ"}
        txtconfirm={"Xoá"}
        visible={showDelete}
        handleDelete={handleConfirmDeleteAccount}
        handleCancel={handleCancelDeleteAccount}
      />
      <ModalDeleteMutilAccount
        visible={showDeleteMultiAccount}
        data={user?.children}
        handleCancel={() => setShowDeleteMultiAccount(false)}
        onDelete={handleDeleteMultiAccount}
      />
      {state?.loading && <LoadingView />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderBottomWidth: 1.5,
    marginTop: scale(20),
    marginHorizontal: scale(10),
    borderBottomColor: "#3d5cff",
  },
});

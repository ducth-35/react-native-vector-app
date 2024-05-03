import { dispatch } from "@/common/redux";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { ModalConfirmDelete } from "@/components/modal-delete";
import TextApp from "@/components/textApp";
import {
  navigate,
  navigateAndSimpleReset
} from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { RESPONSE_CODE } from "@/network/config";
import { useDeleteUser, useLogout } from "@/services/users";
import { userInforSelector } from "@/store/auth/authSelector";
import { authAction } from "@/store/auth/authSlice";
import { USER_TYPE } from "@/utils/enum";
import ToastUtils from "@/utils/toastUtils";
import React, { FC } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { ParentsOptions } from "./parents-options";
import { styles } from "./styles";
import { TutorOptions } from "./tutor-options";

export const AccountScreen: FC = () => {
  const user = useSelector(userInforSelector);
  const [isLogout, setIsLogout] = React.useState<boolean>(false);
  const [isDelete, setDelete] = React.useState<boolean>(false);

  const { deleteUser } = useDeleteUser();
  const { logoutCallAPI } = useLogout();

  const handleEditAccount = () => {
    if (user?.role === USER_TYPE.TUTOR) {
      navigate(APP_SCREEN.ACCOUNT_TUTOR_DETAILS_SCREEN);
    } else {
      navigate(APP_SCREEN.ACCOUNT_PARENT_DETAILS_SCREEN);
    }
  };

  const handleCancelLogout = () => {
    setIsLogout(false);
  };
  const handleConfirmLogout = async () => {
    setIsLogout(false);
    const res = await logoutCallAPI()
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setTimeout(() => {
        navigateAndSimpleReset(APP_SCREEN.INPUT_NUMBER_SCREEN)
        dispatch(authAction.removeAllData());
      }, 500)
    }
    else {
      ToastUtils.show(res?.data?.data);
    }
  };

  const handleLogout = () => {
    setIsLogout(true)
  }

  const handleDelete = () => {
    setDelete(true)
  }

  const handleConfirmDelete = async () => {
    setDelete(false);
    const res = await deleteUser()
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setTimeout(() => {
        navigateAndSimpleReset(APP_SCREEN.INPUT_NUMBER_SCREEN)
        dispatch(authAction.removeAllData());
      }, 500)
    }
    else {
      ToastUtils.show(res?.data?.data);
    }
  };

  const handleCancelDelete = () => {
    setDelete(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Tài khoản"
        isRightIcon
        rightIcon={<TextApp preset="text16Blue">Sửa</TextApp>}
        handleRightIcon={handleEditAccount}
      />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scale(100) }}
      >
        {user?.role === USER_TYPE.TUTOR ? <TutorOptions logout={handleLogout} delete={handleDelete} /> : <ParentsOptions logout={handleLogout} delete={handleDelete} />}
      </ScrollView>
      <ModalConfirmDelete
        content={"Bạn có chắc chắn muốn đăng xuất ?"}
        txtcancel={"Không"}
        txtconfirm={"Có"}
        visible={isLogout}
        handleDelete={handleConfirmLogout}
        handleCancel={handleCancelLogout}
      />
      <ModalConfirmDelete
        content={"Bạn có chắc chắn muốn xoá tài khoản không"}
        txtcancel={"Không"}
        txtconfirm={"Có"}
        visible={isDelete}
        handleDelete={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />
    </SafeAreaView>
  );
};

import { HomeSVG } from "@/asset";
import { SettingsSVG } from "@/asset/icon/account";
// import { ImageAsset } from "@/asset/image";
import { scale } from "@/common/scale";
import { AvatarAccount } from "@/components/avatar-account";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { userInforSelector } from "@/store/auth/authSelector";
import { OPTION_HAPTIC, USER_TYPE } from "@/utils/enum";
import { HIT_SLOP } from "@/utils/helper";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import RNReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useSelector } from "react-redux";

const options = [
  {
    id: 0,
    name: "Quản lý đặt lịch",
    icon: <SettingsSVG.CALENDAR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 1,
    name: "Quản lý lớp học của con",
    icon: <SettingsSVG.CLASS />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 2,
    name: "Tài khoản vợ/chồng",
    icon: <SettingsSVG.MATE />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 3,
    name: "Tài khoản các con",
    icon: <SettingsSVG.CHILDREN />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 4,
    name: "Thông tin ứng dụng",
    icon: <HomeSVG.INFOR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 5,
    name: "Đăng xuất",
    icon: <SettingsSVG.LOGOUT />,
    rightIcon: null,
  },
  {
    id: 6,
    name: "Xoá tài khoản",
    icon: <HomeSVG.INFOR />,
    rightIcon: null,
  },
];

type OptionItemsProps = {
  data: {
    id: number;
    name: string;
    icon: JSX.Element;
    rightIcon: JSX.Element | null;
  };
  handleLogout: () => void;
  handleDelete: () => void;
};

type Props = {
  logout?: () => void;
  delete?: () => void;
};

export const ParentsOptions = ({
  logout: logoutCallable,
  delete: deleteCallable,
}: Props) => {
  const user = useSelector(userInforSelector);

  const handleEditAccount = () => {
    if (user?.role === USER_TYPE.TUTOR) {
      navigate(APP_SCREEN.ACCOUNT_TUTOR_DETAILS_SCREEN);
    } else {
      navigate(APP_SCREEN.ACCOUNT_PARENT_DETAILS_SCREEN);
    }
  };

  const handleLogout = () => {
    logoutCallable?.();
  };

  const handleDelete = () => {
    deleteCallable?.();
  };

  const renderInfor = React.useCallback(() => {
    return (
      <View style={styles.body}>
        <AvatarAccount source={user?.avatar} onPress={handleEditAccount} />
        <TextApp preset="text18BlackBold" style={{ marginTop: scale(15) }}>
          {user?.fullName}
        </TextApp>
        <TextApp preset="text16" style={{ marginVertical: scale(5) }}>
          {user?.phoneNumber}
        </TextApp>
        <TextApp preset="text16" style={{ marginVertical: scale(5) }}>
          {user?.email}
        </TextApp>
        <TextApp preset="text14Medium" style={styles.text_align}>
          {user?.location}
        </TextApp>
      </View>
    );
  }, [user]);

  return (
    <View style={styles.container}>
      {renderInfor()}
      <View style={{ marginTop: scale(30) }}>
        {options.map((item, index) => (
          <OptionItems
            data={item}
            key={item.id}
            handleLogout={handleLogout}
            handleDelete={handleDelete}
          />
        ))}
      </View>
    </View>
  );
};

const OptionItems = ({
  data,
  handleLogout,
  handleDelete,
}: OptionItemsProps) => {
  const { id, rightIcon, icon, name } = data;

  const handlePress = React.useCallback((id: number) => {
    RNReactNativeHapticFeedback.trigger("contextClick", OPTION_HAPTIC);
    switch (id) {
      case 0:
        navigate(APP_SCREEN.CALENDA_PARENT_DETAIL_SCREEN, {
          title: "Quản lý đặt lịch",
        });
        break;
      case 1:
        navigate(APP_SCREEN.TEACHING_SCREEN, { isParent: true });
        break;
      case 2:
        navigate(APP_SCREEN.HUSBAND_WIFE_ACCOUNT_SCREEN);
        break;
      case 3:
        navigate(APP_SCREEN.CHILDREN_ACCOUNT_SCREEN);
        break;
      case 4:
        navigate(APP_SCREEN.INFOR_APPLICATION_SCREEN);
        break;
      case 5:
        handleLogout();
        break;
      case 6:
        handleDelete();
        break;
      default:
        break;
    }
  }, []);

  return (
    <TouchableOpacity
      style={[styles.itemAccount]}
      onPress={handlePress.bind(null, id)}
      hitSlop={HIT_SLOP}
    >
      <View style={styles.itemLeft}>
        <View style={styles.iconItem}>{icon}</View>
        <TextApp style={styles.textItem}>{name}</TextApp>
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  itemAccount: {
    flexDirection: "row",
    marginVertical: 6,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: scale(20),
  },
  itemLeft: {
    flexDirection: "row",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconItem: {
    alignSelf: "center",
    height: scale(25),
    width: scale(25),
    alignItems: "center",
    justifyContent: "center",
  },
  textItem: {
    color: "#000",
    textAlign: "center",
    lineHeight: scale(28),
    fontSize: scale(14),
    paddingLeft: scale(16),
    fontWeight: "400",
  },
  text_align: {
    textAlign: "center",
  },
});

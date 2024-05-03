import { HomeSVG } from "@/asset";
import { SettingsSVG } from "@/asset/icon/account";
import { scale } from "@/common/scale";
import { AvatarAccount } from "@/components/avatar-account";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { userInforSelector } from "@/store/auth/authSelector";
import { OPTION_HAPTIC, USER_TYPE } from "@/utils/enum";
import { HIT_SLOP, parserLiteracyToName } from "@/utils/helper";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import RNReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useSelector } from "react-redux";

const options = [
  {
    id: 0,
    name: "Quản lý lịch đặt",
    icon: <SettingsSVG.CALENDAR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 1,
    name: "Thông tin ứng dụng",
    icon: <HomeSVG.INFOR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 2,
    name: "Đăng xuất",
    icon: <SettingsSVG.LOGOUT />,
    rightIcon: null,
  },
  {
    id: 3,
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

export const TutorOptions = ({ logout, delete: deleteCallable }: Props) => {
  const user = useSelector(userInforSelector);

  const handleEditAccount = () => {
    if (user?.role === USER_TYPE.TUTOR) {
      navigate(APP_SCREEN.ACCOUNT_TUTOR_DETAILS_SCREEN);
    } else {
      navigate(APP_SCREEN.ACCOUNT_PARENT_DETAILS_SCREEN);
    }
  };

  const handleLogout = () => {
    logout?.();
  };

  const handleDelete = () => {
    deleteCallable?.();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AvatarAccount
          isAvatar
          onPress={handleEditAccount}
          source={user?.avatar}
        />
        <TextApp preset="text18BlackBold" style={{ marginTop: scale(15) }}>
          {user?.fullName}
        </TextApp>
        <TextApp preset="text16" style={{ marginVertical: scale(5) }}>
          {user?.phoneNumber}
        </TextApp>
        <TextApp preset="text14Medium" style={styles.text_align}>
          {user?.school} - {parserLiteracyToName(user?.literacy)}
        </TextApp>
      </View>
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
  RNReactNativeHapticFeedback.trigger("contextClick", OPTION_HAPTIC);
  const handlePress = React.useCallback((id: number) => {
    switch (id) {
      case 0:
        navigate(APP_SCREEN.CALENDA_PARENT_DETAIL_SCREEN, {
          title: "Đặt lịch từ phụ huynh",
        });
        break;
      case 1:
        navigate(APP_SCREEN.INFOR_APPLICATION_SCREEN);
        break;
      case 2:
        handleLogout();
        break;
      case 3:
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
  container: {},
  itemAccount: {
    flexDirection: "row",
    marginVertical: 6,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: scale(20),
    marginHorizontal: scale(20),
  },
  itemLeft: {
    flexDirection: "row",
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
    marginHorizontal: scale(15),
  },
});

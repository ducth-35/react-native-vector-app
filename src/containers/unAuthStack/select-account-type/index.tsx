import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import TextApp from "../../../components/textApp";
import { Button } from "../../../components/btn";
import { navigate } from "../../../navigators/navigation-services";
import { APP_SCREEN } from "../../../navigators/screen-type";
import { ScrollView } from "react-native-gesture-handler";
import { isNullOrEmpty } from "@/utils/method";
import { authAction } from "@/store/auth/authSlice";
import { dispatch } from "@/common/redux";
import { scale } from "@/common/scale";
import { register } from "@/store/auth/middleware/auth.action";
import { useSelector } from "react-redux";
import {
  authLoadingSelector,
  selectDeviceToken,
} from "@/store/auth/authSelector";

type TabSelectInterface = {
  id: number;
  key: string;
  lable: string;
  checked: boolean;
};

const TabSelect = [
  {
    id: 1,
    key: "parent",
    lable: " Phụ huynh",
    checked: true,
  },
  {
    id: 2,
    key: "tutor",
    lable: " Giáo viên",
    checked: false,
  },
];

export const SelectAccountType = (props: any) => {
  const { phone, password, confirmPassword } = props?.route?.params;
  const isLoading = useSelector(authLoadingSelector);
  const deviceToken = useSelector(selectDeviceToken);

  const [tabSelect, setTabSelect] = React.useState(TabSelect);
  const [name, setName] = React.useState<string>("");
  const [role, setRole] = React.useState<string>(tabSelect[0].key);

  const handleSelected = (item: TabSelectInterface) => {
    setTabSelect(
      tabSelect.map((it) => ({ ...it, checked: it.id === item.id }))
    );
    setRole(item?.key);
  };

  const handleRegister = () => {
    dispatch(
      register({
        fullName: name,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
        deviceToken: deviceToken,
        role: role,
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scale(100) }}
      >
        <View style={styles.viewHeader}>
          <TextApp style={styles.textHeader1}>Tài khoản</TextApp>
          <TextApp style={{ color: "#000" }}>
            Nhập tên của bạn và chọn loại tài khoản sử dụng.
          </TextApp>
        </View>
        <View style={styles.viewInputName}>
          <TextApp style={styles.textLableName}>Tên bạn</TextApp>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="Nhập tên của bạn"
              style={styles.inputName}
              onChangeText={(value) => setName(value)}
            />
          </View>
        </View>
        <View style={styles.viewSeclectAccount}>
          <TextApp>Chọn loại tài khoản</TextApp>
          {tabSelect.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.selectAccount,
                item.checked && styles.selectedAccount,
              ]}
              onPress={() => handleSelected(item)}
            >
              <View
                style={[styles.viewDot, item.checked && styles.viewDotSlected]}
              />
              <TextApp
                style={[
                  styles.textselectAccount,
                  item.checked && styles.textselectedAccount,
                ]}
              >
                {item.lable}
              </TextApp>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.viewDone}>
        <Button
          disabled={isNullOrEmpty(name) ? true : false}
          title="Hoàn thành"
          isLoading={isLoading}
          onPress={handleRegister}
        />
      </View>
    </SafeAreaView>
  );
};

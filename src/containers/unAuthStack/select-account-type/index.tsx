import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import TextApp from "../../../components/textApp";
import { Button } from "../../../components/btn";

const TabSelect = [
  {
    id: 1,
    key: "parents",
    lable: " Phụ huynh",
    checked: true,
  },
  {
    id: 2,
    key: "teacher",
    lable: " Giáo viên",
    checked: false,
  },
];

export const SelectAccountType = () => {
  const [tabSelect, setTabSelect] = React.useState(TabSelect);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSelected = (item: any) => {
    setTabSelect(
      tabSelect.map((it) => ({ ...it, checked: it.id === item.id }))
    );
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHeader}>
        <TextApp style={styles.textHeader1}>Tài khoản</TextApp>
        <TextApp>Nhập tên của bạn và chọn loại tài khoản sử dụng.</TextApp>
      </View>
      <View style={styles.viewInputName}>
        <TextApp style={styles.textLableName}>Tên bạn</TextApp>
        <View style={styles.viewInput}>
          <TextInput placeholder="Nhập tên của bạn" style={styles.inputName} />
        </View>
      </View>
      <View style={styles.viewSeclectAccount}>
        <TextApp>Chọn loại tài khoản</TextApp>
        <View>
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
      </View>
      <View style={styles.viewDone}>
        <Button
          title="Hoàn thành"
          isLoading={loading}
          onPress={handleRegister}
        />
      </View>
    </SafeAreaView>
  );
};

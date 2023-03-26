import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { styles } from "./styles";
import {
  loginWithFacebook,
  AccessTokenResult,
} from "../../../services/login-facebook";
import { signInWithGoogle } from "../../../services/login-google";
import { Button } from "../../../components/btn";
import TextApp from "../../../components/textApp";
import { navigate } from "../../../navigators/navigation-services";
import { APP_SCREEN } from "../../../navigators/screen-type";

export const LoginScreen = () => {
  const loginWithPhoneNumber = () => {
    navigate(APP_SCREEN.INPUT_NUMBER_SCREEN);
  };
  const handleLoginWithGoogle = async () => {
    signInWithGoogle();
  };

  const handleLoginWithFacebook = async (): Promise<void> => {
    const accessTokenFB: AccessTokenResult = await loginWithFacebook();
    if (accessTokenFB) {
      console.log(accessTokenFB);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextApp preset="headerTxt"> Chào mừng bạn đến với Vector !</TextApp>
      <View style={styles.phoneNumber}>
        <Button
          title="Đăng nhập qua số điện thoại"
          onPress={loginWithPhoneNumber}
        />
      </View>
      <View style={styles.viewOrther}>
        <View style={styles.line} />
        <TextApp style={styles.textOrther}>Hoặc</TextApp>
        <View style={styles.line} />
      </View>
      <Button
        style={styles.facabook}
        title="Đăng nhập qua Facebok"
        onPress={handleLoginWithFacebook}
      />
      <Button
        style={styles.google}
        styleTitle={styles.textGoogle}
        title="Đăng nhập qua Google"
        onPress={handleLoginWithGoogle}
      />
      <View style={styles.viewFooter}>
        <TextApp style={styles.textFooter}>
          Bằng việc đăng nhập, bạn dồng ý với{" "}
          <Text style={{ color: "#2596be" }}> Điều khoản dịch vụ </Text>và
          <Text style={{ color: "#2596be" }}>
            {" "}
            Chính sách bảo mật của chúng tôi{" "}
          </Text>
        </TextApp>
      </View>
    </SafeAreaView>
  );
};

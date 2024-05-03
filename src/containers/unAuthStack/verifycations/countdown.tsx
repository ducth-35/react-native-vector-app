import TextApp from "@/components/textApp";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scale } from "@/common/scale";
import { FontFamily } from "@/common/constant";
import { HIT_SLOP } from "@/utils/helper";
import { AuthApi } from "@/network/api/authApi";
import { dispatch } from "@/common/redux";
import { getOTP } from "@/store/auth/middleware/auth.action";
import ToastUtils from "@/utils/toastUtils";
import { getErrorMessage } from "@/network/utils";
import { Button } from "@/components/btn";
import { useSelector } from "react-redux";
import { authLoadingSelector } from "@/store/auth/authSelector";
// import ToastUtils from "@/utils/toastUtils";

interface CountDownResendProps {
  phoneNumber?: string;
  handleConfirm?: () => void;
}

export const CountDown = ({
  phoneNumber = "",
  handleConfirm,
}: CountDownResendProps) => {
  const authLoading = useSelector(authLoadingSelector);
  const COUNT_TIME = 90;
  const [countSecond, setCountSecond] = React.useState(COUNT_TIME);
  let countdownInterval: any;

  const startCountDown = () => {
    countdownInterval = setInterval(() => {
      setCountSecond((prevValue) => {
        if (prevValue > 0) {
          return prevValue - 1;
        }
        clearInterval(countdownInterval);
        return 0;
      });
    }, 1000);
  };

  React.useEffect(() => {
    startCountDown();
    return () => {
      clearInterval(countdownInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResend = () => {
    try {
      dispatch(getOTP({ phoneNumber: phoneNumber }));
      setCountSecond(COUNT_TIME);
      startCountDown();
    } catch (error) {
      console.log(getErrorMessage(error));
      ToastUtils.show(getErrorMessage(error));
    }
  };

  return (
    <View>
      <TextApp>{countSecond} giây</TextApp>
      <View style={{ marginTop: scale(40) }}>
        <Button
          isLoading={authLoading}
          title="Xác nhận"
          onPress={handleConfirm}
        />
      </View>
      {countSecond == 0 && (
        <TouchableOpacity
          hitSlop={HIT_SLOP}
          style={styles.reSend}
          onPress={handleResend}
        >
          <TextApp style={styles.textResend}>Gửi lại</TextApp>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginTop: scale(50),
  },
  reSend: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(10),
  },
  textResend: {
    color: "red",
    fontFamily: FontFamily.SFUIText_regular,
  },
});

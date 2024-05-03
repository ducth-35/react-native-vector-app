import { Spacer } from "../spacer";
import TextApp from "../textApp";
import React, { useEffect, useRef, useState } from "react";
import { TextInput, TouchableWithoutFeedback, View } from "react-native";

import { styles } from "./styles";
import { OtpProps } from "./type";

export const Otp = ({
  length,
  textEntry,
  onOtpValid,
  onOtpInValid,
  textStyle = {},
  defaultOtp = "",
  wrapInputStyle = {},
  containerStyle = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  wrapInputActiveStyle = {},
  onChangeOtp,
  ...rest
}: OtpProps) => {
  // state
  const [otp, setOtp] = useState("");
  const _inputRef = useRef<TextInput>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // function
  const onOtpChange = (text: string) => {
    const textTrim = text.trim().toString();
    if (textTrim.length <= length) {
      setOtp(text.trim().toString());
      onChangeOtp && onChangeOtp(text.trim().toString());
    }
  };

  const setFocus = () => {
    if (_inputRef.current) {
      _inputRef.current.focus();
    }
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  // effect
  useEffect(() => {
    if (defaultOtp) {
      setOtp(
        defaultOtp.length > length ? defaultOtp.slice(0, length) : defaultOtp
      );
    }
  }, [defaultOtp, length]);

  useEffect(() => {
    if (otp.length === length) {
      onOtpValid && onOtpValid();
    } else {
      onOtpInValid && onOtpInValid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, otp]);

  // render
  return (
    <TouchableWithoutFeedback onPress={setFocus}>
      <View style={[styles.wrap, styles.row, containerStyle]}>
        <TextInput
          autoComplete="sms-otp" // android
          textContentType="oneTimeCode" // ios
          ref={_inputRef}
          value={otp}
          onFocus={onFocus}
          onBlur={onBlur}
          autoCapitalize={"none"}
          autoFocus={true}
          underlineColorAndroid={"transparent"}
          onChangeText={onOtpChange}
          selectionColor={"transparent"}
          style={styles.input}
          {...rest}
          keyboardType="number-pad"
        />
        {length &&
          Array(length)
            .fill(0)
            .map((_, index) => {
              return (
                <View key={index}>
                  <View
                    style={[
                      styles.otpView,
                      wrapInputStyle,
                      // (index === otp.length ||
                      //   (length === otp.length && index === otp.length - 1)) &&
                      //   isFocused && [
                      //     styles.otpViewActive,
                      //     wrapInputActiveStyle,
                      //   ],
                    ]}
                  >
                    <TextApp
                      children={
                        index <= otp.length - 1
                          ? textEntry?.charAt(0) ?? otp.charAt(index)
                          : ""
                      }
                      style={[styles.otpText, textStyle]}
                    />
                  </View>
                  <Spacer width={15} height={15} />
                </View>
              );
            })}
      </View>
    </TouchableWithoutFeedback>
  );
};

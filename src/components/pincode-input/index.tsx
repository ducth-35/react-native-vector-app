import { scale } from "@/common/scale";
import { navigate } from "@/navigators/navigation-services";
import React, { useRef, ForwardedRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TextInput as RNTextInput,
  ViewStyle,
} from "react-native";

interface PincodeInputProps {
  ref: any;
  pin: string;
  length?: number;
  onTextChange: (text: string) => void;
  onValid: () => void;
  containerStyle?: ViewStyle;
  circleContainerStyle?: ViewStyle;
  circleEmptyStyle?: ViewStyle;
  circleFilledStyle?: ViewStyle;
  autoFocus?: boolean;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
}

const PincodeInput: React.FC<PincodeInputProps> = React.forwardRef(
  (
    {
      pin,
      length = 6,
      onTextChange,
      autoFocus = true,
      keyboardType = "numeric",
      accessible = true,
      accessibilityLabel = "Pincode",
      accessibilityHint = "Enter your pincode",
      onValid,
    },
    ref: ForwardedRef<RNTextInput>
  ) => {
    const shakeAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      if (pin.length === length) {
        onValid?.();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [length, pin]);

    const handleTextChange = (text: string) => {
      const regex = "^[0-9]*$";
      if (text.match(regex) && text.length <= length) {
        onTextChange(text);
      }
    };

    const circleEmptyStyles = StyleSheet.flatten([
      styles.circle,
      styles.circleEmptyStyle,
    ]);
    const circleFilledStyles = StyleSheet.flatten([
      styles.circle,
      styles.circleFilledStyle,
    ]);

    const circles = [];
    for (let i = 0; i < length; i += 1) {
      circles.push(
        <View
          key={`${i}${pin.length > i}`}
          style={pin.length > i ? circleFilledStyles : circleEmptyStyles}
        />
      );
    }

    return (
      <View
        style={{ display: "flex", width: "100%", marginVertical: scale(40) }}
      >
        <Animated.View
          style={StyleSheet.flatten([
            styles.circleContainer,
            styles.circleContainerStyle,
            { left: shakeAnim },
          ])}
        >
          {circles}
        </Animated.View>
        <RNTextInput
          ref={ref}
          style={styles.text}
          caretHidden
          maxLength={length}
          onChangeText={handleTextChange}
          value={pin}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
        />
      </View>
    );
  }
);

export default PincodeInput;

const styles = StyleSheet.create({
  circleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  circle: {
    width: scale(20),
    height: scale(20),
    borderRadius: 50,
  },
  text: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    opacity: 0,
  },
  circleEmptyStyle: {
    borderWidth: 1.5,
    borderColor: "#b8b8d2",
  },
  circleContainerStyle: {
    paddingHorizontal: 20,
  },
  circleFilledStyle: {
    backgroundColor: "#3d5cff",
  },
});

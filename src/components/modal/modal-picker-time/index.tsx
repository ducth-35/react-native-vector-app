import React from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { StyleSheet, View } from "react-native";
import TextApp from "@/components/textApp";
import { scale } from "@/common/scale";

type Props = {
  title?: string;
  children?: JSX.Element;
};

export const ModalizeTimePicker = React.forwardRef(
  ({ title, children }: Props, ref) => {
    return (
      <Portal>
        <Modalize
          modalStyle={styles.container}
          adjustToContentHeight={true}
          ref={ref}
          handleStyle={{
            display: "none",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false
          }}
        >
          <TextApp preset="text18" style={styles.title}>
            {title}
          </TextApp>
          <View style={styles.viewTimePicker}>{children}</View>
        </Modalize>
      </Portal>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
  title: {
    marginVertical: scale(20),
    textAlign: "center",
  },
  viewTimePicker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scale(30),
  },
});

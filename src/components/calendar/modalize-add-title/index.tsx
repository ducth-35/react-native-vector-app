import { FontFamily } from "@/common/constant";
import { scale } from "@/common/scale";
import { Button } from "@/components/btn";
import TextApp from "@/components/textApp";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

type Props = {
  title?: string;
  placeholder?: string;
  pressCancel?: () => void;
  onSave: (data: { description: string }) => void;
  value?: string;
};

export const ModalizeAddTitle = React.forwardRef(
  ({ title, pressCancel, onSave, value, ...props }: Props, ref) => {
    const [description, setDescription] = React.useState<string>(value || "");

    const handleConfirm = () => {
      const data = { description: description };
      onSave?.(data);
      pressCancel?.();
    };

    return (
      <Portal>
        <Modalize
          modalStyle={styles.container}
          adjustToContentHeight={true}
          ref={ref}
          handleStyle={{
            display: "none",
          }}
          closeOnOverlayTap={true}
          scrollViewProps={{
            showsVerticalScrollIndicator: false
          }}
        >
          <TextApp preset="text18" style={styles.title}>
            {title}
          </TextApp>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setDescription(value)}
              value={description}
              editable
              multiline={false}
              numberOfLines={4}
              {...props}
            />
          </View>
          <View style={styles.btn}>
            <Button
              preset="blue"
              title="Hoàn thành chọn"
              onPress={handleConfirm}
            />
          </View>
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
  viewInput: {
    borderWidth: 1,
    borderColor: "#b8b8d2",
    height: scale(100),
    paddingTop: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: scale(3),
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
  input: {
    fontFamily: FontFamily.SFUIText_regular,
  },
});

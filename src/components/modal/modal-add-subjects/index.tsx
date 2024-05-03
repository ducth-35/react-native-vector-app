import React, { useImperativeHandle } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale } from "../../../common/scale";
import TextApp from "../../textApp";
import { HomeSVG } from "../../../asset";
import { HIT_SLOP } from "@/utils/helper";
import { InputRegister } from "@/components/input-register";
import { useGetSubject } from "@/services/subjects";
import { useGetGrades } from "@/services/grades";
import { Filter } from "@/utils/enum";
import { ModalizeFilter } from "../Modalize-filter";
import { ListDegreeImage } from "@/components/list-degree-image";

interface ModalizeSelectSubjectProps {
  onSave?: (
    data?: subjectsInterface,
    selectedIndex?: number,
    isEdit?: boolean
  ) => void;
}

type refProps = {
  showModal?: (dataEdit?: {
    item?: subjectInterface;
    index: number;
    isEditing?: boolean;
  }) => void;
  closeModal?: () => void;
};

export const ModalizeAddSubjects = React.forwardRef<
  refProps,
  ModalizeSelectSubjectProps
>((props, ref) => {
  const { onSave } = props;
  const { subjects } = useGetSubject();
  const { grades } = useGetGrades();

  const modalizeSubjectRef = React.useRef<any>();
  const modalizeClassRef = React.useRef<any>();
  const modalizeAddSubjectRef = React.useRef<any>();

  const [achievementImages, setAchievementImages] = React.useState<
    ImageInterface[]
  >([]);
  const [selectedSubjectItems, setSelectedSubjectItems] = React.useState<
    string[]
  >([]);
  const [selectedClassItems, setSelectedClassItems] = React.useState<string[]>(
    []
  );

  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [indexEdit, setIndexEdit] = React.useState<number | undefined>(0);

  const [dataModal, setDataModal] = React.useState<{
    label: string;
    item: string[];
  }>({
    label: "",
    item: [],
  });
  const [price, setPrice] = React.useState<number | undefined>(0);
  const [score, setScore] = React.useState<number | undefined>(0);

  const showModal = (dataEdit?: {
    item?: subjectInterface;
    index: number;
    isEditing?: boolean;
  }) => {
    if (dataEdit?.isEditing) {
      setIsEdit(dataEdit?.isEditing);
      setIndexEdit(dataEdit?.index);
      setAchievementImages(
        dataEdit?.item?.achievementImages as ImageInterface[]
      );
      setSelectedSubjectItems(
        dataEdit?.item?.subject ? [dataEdit?.item?.subject] : []
      );
      setSelectedClassItems(
        dataEdit?.item?.grade ? [dataEdit?.item?.grade] : []
      );
      setPrice(dataEdit?.item?.price);
      setScore(dataEdit?.item?.score);
      modalizeAddSubjectRef?.current?.open();
    } else {
      modalizeAddSubjectRef?.current?.open();
    }
  };

  useImperativeHandle(ref, () => ({
    showModal,
    closeModal,
  }));

  const closeModal = () => {
    modalizeAddSubjectRef?.current?.close();
  };

  const handleSelectDone = () => {
    const infor: subjectsInterface = {
      subject: selectedSubjectItems.join("") || "",
      grade: selectedClassItems.join("") || "",
      price: price || 0,
      score: score || 0,
      achievementImages: achievementImages as ImageInterface[],
    };
    if (isEdit) {
      onSave?.(infor, indexEdit, true);
    } else {
      onSave?.(infor, undefined, false);
    }
    modalizeAddSubjectRef?.current?.close();
  };

  const onReset = () => {
    setSelectedSubjectItems([]);
    setSelectedClassItems([]);
    setAchievementImages([]);
    setPrice(0);
    setScore(0);
  };

  const updateListAchievements = (data: ImageInterface[]) => {
    setAchievementImages(data);
  };

  const handleOpenModal = (type: string) => {
    switch (type) {
      case Filter.SUBJECT:
        const dataSubject = {
          label: "Môn dạy",
          item: subjects,
        };
        setDataModal(dataSubject);
        modalizeSubjectRef.current.open();
        break;
      case Filter.CLASS:
        const dataGrades = {
          label: "Lớp dạy",
          item: grades,
        };
        setDataModal(dataGrades);
        modalizeClassRef.current.open();
        break;
      default:
        break;
    }
  };

  return (
    <Portal>
      <Modalize
        modalStyle={styles.calendarFilter}
        adjustToContentHeight={true}
        ref={modalizeAddSubjectRef}
        handleStyle={{
          display: "none",
        }}
        closeOnOverlayTap={false}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            hitSlop={HIT_SLOP}
            style={styles.iconClose}
            onPress={closeModal}
          >
            <HomeSVG.CLOSE />
          </TouchableOpacity>
          <TextApp preset="text18">Thêm môn dạy</TextApp>
        </View>

        <View style={styles.viewBody}>
          <InputRegister
            lable="Môn dạy"
            placeholder="Chọn môn dạy"
            editable={false}
            isSelect
            onPressIn={handleOpenModal.bind(null, Filter.SUBJECT)}
            onPress={handleOpenModal.bind(null, Filter.SUBJECT)}
            value={selectedSubjectItems}
          />
          <InputRegister
            lable="Lớp dạy"
            placeholder="Chọn lớp dạy"
            editable={false}
            isSelect
            onPressIn={handleOpenModal.bind(null, Filter.CLASS)}
            onPress={handleOpenModal.bind(null, Filter.CLASS)}
            value={selectedClassItems}
          />
          <InputRegister
            lable="Giá tiền"
            placeholder="Giá 1 buổi học ?"
            keyboardType="number-pad"
            value={price}
            onChangeText={(value) => setPrice(value as number)}
            rightLable={<TextApp preset="text14Medium">VNĐ</TextApp>}
          />
          <InputRegister
            lable="Điểm thi đại học"
            placeholder="Số điểm thi đại học môn này bạn đạt được"
            keyboardType="number-pad"
            value={score}
            onChangeText={(value) => setScore(value as number)}
          />
          <ListDegreeImage
            label="Ảnh chụp chứng chỉ liên quan"
            updateListDegree={updateListAchievements}
            listImage={achievementImages}
          />
        </View>
        <Pressable style={styles.done} onPress={handleSelectDone}>
          <TextApp style={styles.textdone}>Hoàn thành</TextApp>
        </Pressable>
      </Modalize>
      <ModalizeFilter
        ref={modalizeSubjectRef}
        data={dataModal}
        handleClose={() => modalizeSubjectRef.current.close()}
        selectedItems={selectedSubjectItems}
        setSelectedItems={setSelectedSubjectItems}
        isOneSelect
      />
      <ModalizeFilter
        ref={modalizeClassRef}
        data={dataModal}
        handleClose={() => modalizeClassRef.current.close()}
        selectedItems={selectedClassItems}
        setSelectedItems={setSelectedClassItems}
        isOneSelect
      />
    </Portal>
  );
});

const styles = StyleSheet.create({
  calendarFilter: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(20),
  },
  done: {
    alignItems: "center",
    backgroundColor: "#3d5cff",
    paddingVertical: scale(13),
    marginHorizontal: scale(20),
    borderRadius: scale(12),
    marginBottom: scale(30),
  },
  textdone: {
    color: "#fff",
  },
  body: {
    marginHorizontal: scale(5),
    marginBottom: scale(10),
    backgroundColor: "#f4f3fd",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: 10,
  },
  viewBody: {
    paddingBottom: scale(20),
  },
  iconClose: {
    position: "absolute",
    left: 20,
  },
});

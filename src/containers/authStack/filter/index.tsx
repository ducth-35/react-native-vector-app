import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import TextApp from "../../../components/textApp";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeSVG } from "../../../assets";
import { CardSelect } from "../../../components/card-select";
import { scale } from "../../../common/scale";
import { ModalizeFilter } from "../../../components/Modalize-filter";
import { Filter } from "../../../utils/enum";

const SUBJECT = {
  label: "Môn học",
  item: ["Toán", "Lý", "Hoá", "Tiếng Anh", "Vẽ", "Nhảy-múa", "Piano"],
};

const CLASS = {
  label: "Lớp của con",
  item: [
    "Lớp 1",
    "Lớp 2",
    "Lớp 3",
    "Lớp 4",
    "Lớp 5",
    "Lớp 6",
    "Lớp 7",
    "Lớp 8",
    "Lớp 9",
    "Lớp 10",
    "Lớp 11",
    "Lớp 12",
  ],
};

const SEX = {
  label: "Giới tính giáo viên",
  item: ["Nam", "Nữ"],
};

const LEVEL = {
  label: "Trình độ giáo viên",
  item: ["Sinh viên đại học", "Giáo viên", "Giảng viên"],
};

const SCHOOL = {
  label: "Trường của giáo viên",
  item: [
    "Đại Học Ngoại thương",
    "Đại Học Quốc Gia Hà Nội",
    "Đại Học Bách Khoa",
    "Học viện Ngoại Giao",
    "Đại Học Kinh Tế Quốc Dân",
    "Học Viện Tài Chính",
  ],
};

export const FilterScreen = () => {
  const [dataModal, setDataModal] = React.useState<{
    label: string;
    item: string[];
  }>({
    label: "",
    item: [],
  });
  const modalizeSubjectRef = React.useRef<any>();
  const modalizeClassRef = React.useRef<any>();
  const modalizeSexRef = React.useRef<any>();
  const modalizeLevelRef = React.useRef<any>();
  const modalizeSchoolRef = React.useRef<any>();

  const [selectedSubjectItems, setSelectedSubjectItems] = React.useState<
    string[]
  >([]);
  const [selectedClassItems, setSelectedClassItems] = React.useState<string[]>(
    []
  );
  const [selectedSexItems, setSelectedSexItems] = React.useState<string[]>([]);
  const [selectedLevelItems, setSelectedLevelItems] = React.useState<string[]>(
    []
  );
  const [selectedSchoolItems, setSelectedSchoolItems] = React.useState<
    string[]
  >([]);

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOpenModal = (type: string) => {
    switch (type) {
      case Filter.SUBJECT:
        modalizeSubjectRef.current.open();
        setDataModal(SUBJECT);
        break;
      case Filter.CLASS:
        modalizeClassRef.current.open();
        setDataModal(CLASS);
        break;
      case Filter.SEX:
        modalizeSexRef.current.open();
        setDataModal(SEX);
        break;
      case Filter.LEVEL:
        modalizeLevelRef.current.open();
        setDataModal(LEVEL);
        break;
      case Filter.SCHOOL:
        modalizeSchoolRef.current.open();
        setDataModal(SCHOOL);
        break;
      default:
        break;
    }
  };

  const handleClearAllSelectedItems = () => {
    setSelectedSubjectItems([]);
    setSelectedClassItems([]);
    setSelectedSexItems([]);
    setSelectedLevelItems([]);
    setSelectedSchoolItems([]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewheader}>
        <View style={styles.close}>
          <HomeSVG.CLOSE />
        </View>
        <TextApp preset="text18">Bộ lọc tìm kiếm</TextApp>
      </View>
      <View>
        <CardSelect
          lable="Môn học"
          placeholder={"Chọn môn học"}
          onPressIn={() => handleOpenModal(Filter.SUBJECT)}
          dataSelect={selectedSubjectItems}
        />
        <CardSelect
          lable="Lớp của con"
          placeholder={"Chọn lớp của con"}
          onPressIn={() => handleOpenModal(Filter.CLASS)}
          dataSelect={selectedClassItems}
        />
        <CardSelect
          lable="Giới tính giáo viên"
          placeholder={"Chọn giới tính"}
          onPressIn={() => handleOpenModal(Filter.SEX)}
          dataSelect={selectedSexItems}
        />
        <CardSelect
          lable="Trình độ giáo viên"
          placeholder={"Chọn trình độ"}
          onPressIn={() => handleOpenModal(Filter.LEVEL)}
          dataSelect={selectedLevelItems}
        />
        <CardSelect
          lable="Trường của giáo viên"
          placeholder={"Chọn trường"}
          onPressIn={() => handleOpenModal(Filter.SCHOOL)}
          dataSelect={selectedSchoolItems}
        />
      </View>
      <View style={styles.viewBottom}>
        <Pressable style={styles.delete} onPress={handleClearAllSelectedItems}>
          <TextApp style={styles.textdelete}>Xoá</TextApp>
        </Pressable>
        <Pressable style={styles.done}>
          <TextApp style={styles.textdone}>Hoàn thành khoá học</TextApp>
        </Pressable>
      </View>
      <ModalizeFilter
        ref={modalizeSubjectRef}
        data={dataModal}
        handleClose={() => modalizeSubjectRef.current.close()}
        selectedItems={selectedSubjectItems}
        setSelectedItems={setSelectedSubjectItems}
      />

      <ModalizeFilter
        ref={modalizeClassRef}
        data={dataModal}
        handleClose={() => modalizeClassRef.current.close()}
        selectedItems={selectedClassItems}
        setSelectedItems={setSelectedClassItems}
      />

      <ModalizeFilter
        ref={modalizeSexRef}
        data={dataModal}
        handleClose={() => modalizeSexRef.current.close()}
        selectedItems={selectedSexItems}
        setSelectedItems={setSelectedSexItems}
      />
      <ModalizeFilter
        ref={modalizeLevelRef}
        data={dataModal}
        handleClose={() => modalizeLevelRef.current.close()}
        selectedItems={selectedLevelItems}
        setSelectedItems={setSelectedLevelItems}
      />
      <ModalizeFilter
        isSchool
        ref={modalizeSchoolRef}
        data={dataModal}
        handleClose={() => modalizeSchoolRef.current.close()}
        selectedItems={selectedSchoolItems}
        setSelectedItems={setSelectedSchoolItems}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewheader: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  close: {
    position: "absolute",
    left: scale(20),
  },
  viewBottom: {
    flexDirection: "row",
    position: "absolute",
    left: scale(10),
    right: scale(10),
    bottom: scale(50),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(20),
  },
  delete: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(13),
    borderColor: "#3d5cff",
    borderWidth: 0.5,
    paddingHorizontal: scale(30),
    borderRadius: scale(12),
  },
  done: {
    flex: 1,
    backgroundColor: "#3d5cff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(13),
    marginLeft: scale(10),
    borderRadius: scale(12),
  },
  textdelete: {},
  textdone: {
    color: "#fff",
  },
});

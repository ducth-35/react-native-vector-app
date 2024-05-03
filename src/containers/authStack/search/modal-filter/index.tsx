import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { HomeSVG } from "@/asset";
import TextApp from "@/components/textApp";
import { HIT_SLOP, formatPrice, parserNameToLiteracy } from "@/utils/helper";
import { scale } from "@/common/scale";
import React from "react";
import { Filter } from "@/utils/enum";
import { CardSelect } from "@/components/card-select";
import { ModalizeFilter } from "@/components/modal/Modalize-filter";
import { useGetSubject } from "@/services/subjects";
import { useGetGrades } from "@/services/grades";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useGetSchool } from "@/services/school";

const SEX = {
  label: "Giới tính giáo viên",
  item: ["Nam", "Nữ", "Tất cả"],
};

const LEVEL = {
  label: "Trình độ giáo viên",
  item: [
    "Sinh viên đại học",
    "Giáo viên cấp 1",
    "Giáo viên cấp 2",
    "Giáo viên cấp 3",
    "Cử nhân đại học",
    "Thạc sĩ",
    "Tiến sĩ",
  ],
};

interface ModalFilterProps {
  handleClose?: () => void;
  onSave: (data: {
    subject: string;
    class: string;
    sex: string;
    level: string;
    school: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
}

export const ModalFilter = React.forwardRef(
  ({ handleClose, onSave }: ModalFilterProps, ref) => {
    const { subjects } = useGetSubject();
    const { grades } = useGetGrades();

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
    const [selectedClassItems, setSelectedClassItems] = React.useState<
      string[]
    >([]);
    const [selectedSexItems, setSelectedSexItems] = React.useState<string[]>(
      []
    );
    const [selectedLevelItems, setSelectedLevelItems] = React.useState<
      string[]
    >([]);
    const [selectedSchoolItems, setSelectedSchoolItems] = React.useState<
      string[]
    >([]);
    const [minPrice, setMinPrice] = React.useState<number>(200000);
    const [maxPrice, setMaxPrice] = React.useState<number>(1000000);

    const { schools } = useGetSchool(undefined);
    const schoolSelect = {
      label: "Trường của giáo viên",
      item: schools,
    };

    const handleSliderChange = (newValues: number[]) => {
      setMinPrice(newValues[0]);
      setMaxPrice(newValues[1]);
    };

    const handleFilter = () => {
      const infor = {
        subject: selectedSubjectItems.join(""),
        class: selectedClassItems.join(""),
        sex: selectedSexItems.join(""),
        level: selectedLevelItems.join(""),
        school: selectedSchoolItems.join(""),
        minPrice: minPrice,
        maxPrice: maxPrice,
      };
      onSave?.(infor);
    };

    const handleOpenModal = (type: string) => {
      switch (type) {
        case Filter.SUBJECT:
          const dataSubject = {
            label: "Môn học",
            item: subjects,
          };
          setDataModal(dataSubject);
          modalizeSubjectRef.current.open();
          break;
        case Filter.CLASS:
          const dataGrades = {
            label: "Lớp của con",
            item: grades,
          };
          setDataModal(dataGrades);
          modalizeClassRef.current.open();
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
          setDataModal(schoolSelect);
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
    const handleCloseModal = () => {
      handleClose?.();
    };

    return (
      <Portal>
        <Modalize
          modalStyle={styles.calendarFilter}
          adjustToContentHeight={true}
          ref={ref}
          handleStyle={{
            display: "none",
          }}
          closeOnOverlayTap={false}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
        >
          <View style={styles.container}>
            <TouchableOpacity
              hitSlop={HIT_SLOP}
              style={styles.iconClose}
              onPress={handleCloseModal}
            >
              <HomeSVG.CLOSE />
            </TouchableOpacity>
            <TextApp preset="text18">Bộ lọc tìm kiếm</TextApp>
          </View>
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
          <View style={{ marginHorizontal: scale(20), marginTop: scale(20) }}>
            <TextApp> Giá 1 buổi học</TextApp>
          </View>
          <View style={styles.price}>
            <MultiSlider
              values={[200000, 1000000]}
              sliderLength={300}
              onValuesChange={handleSliderChange}
              min={200000}
              max={1000000}
              step={1}
              trackStyle={{ height: 2 }}
              markerStyle={{
                width: scale(20),
                height: scale(20),
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: "#3d5cff",
              }}
            />
          </View>
          <View style={styles.textPrice}>
            <TextApp>{formatPrice(minPrice)}</TextApp>
            <TextApp>{formatPrice(maxPrice)}</TextApp>
          </View>

          <View style={styles.viewBottom}>
            <Pressable
              style={styles.delete}
              onPress={handleClearAllSelectedItems}
            >
              <TextApp>Xoá</TextApp>
            </Pressable>
            <Pressable style={styles.done} onPress={handleFilter}>
              <TextApp style={styles.textdone}>Hoàn thành lọc</TextApp>
            </Pressable>
          </View>
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

          <ModalizeFilter
            ref={modalizeSexRef}
            data={dataModal}
            handleClose={() => modalizeSexRef.current.close()}
            selectedItems={selectedSexItems}
            setSelectedItems={setSelectedSexItems}
            isOneSelect
          />
          <ModalizeFilter
            ref={modalizeLevelRef}
            data={dataModal}
            handleClose={() => modalizeLevelRef.current.close()}
            selectedItems={selectedLevelItems}
            setSelectedItems={setSelectedLevelItems}
            isOneSelect
          />
          <ModalizeFilter
            isSchool
            ref={modalizeSchoolRef}
            data={dataModal}
            handleClose={() => modalizeSchoolRef.current.close()}
            selectedItems={selectedSchoolItems}
            setSelectedItems={setSelectedSchoolItems}
            isOneSelect
          />
        </Modalize>
      </Portal>
    );
  }
);

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
  iconClose: {
    position: "absolute",
    left: 20,
  },
  price: {
    alignItems: "center",
    justifyContent: "center",
  },
  textPrice: {
    marginBottom: scale(25),
    marginHorizontal: scale(25),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewBottom: {
    flexDirection: "row",
    marginBottom: scale(30),
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
  textdone: {
    color: "#fff",
  },
});

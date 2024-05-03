import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { Button } from "@/components/btn";
import { CardInput } from "@/components/card-input";
import { InputRegister } from "@/components/input-register";
import TextApp from "@/components/textApp";
import { useLocations } from "@/services/location";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { ModalSelect } from "./modal-select";
import { LOCATION } from "@/utils/enum";
import { isNullOrEmpty } from "@/utils/method";
import { isUndefined } from "lodash";

type ModalSelectLocationProps = {
  onSave?: (data: {
    fullname: string | undefined;
    locationId: string | undefined;
  }) => void;
  onClose?: () => void;
};

export const ModalSelectLocation = React.forwardRef(
  ({ onSave, onClose }: ModalSelectLocationProps, ref) => {
    const { getProvinces, getDistrict, getWard } = useLocations();
    const [province, setProvince] = React.useState<LocationInterface[]>([]);
    const [district, setDistrict] = React.useState<LocationInterface[]>([]);
    const [ward, setWard] = React.useState<LocationInterface[]>([]);
    const [dataModal, setDataModal] = React.useState<LocationInterface[]>([]);
    const [modalType, setModalType] = React.useState<string | undefined>("");
    const inputRef = React.useRef<{
      address: string;
    }>({
      address: "",
    });

    const [selectedProvinces, setSelectedProvinces] =
      React.useState<LocationInterface>();
    const [selectedDistrict, setSelectedDistrict] =
      React.useState<LocationInterface>();
    const [selectedWard, setSelectedWard] = React.useState<LocationInterface>();

    const modalOpenSelect = React.useRef<any>();

    React.useEffect(() => {
      const fetchData = async () => {
        const provinces = await getProvinces();
        setProvince(provinces);
      };
      fetchData();
    }, []);

    React.useEffect(() => {
      if (!isNullOrEmpty(selectedProvinces)) {
        const fetchData = async () => {
          const district = await getDistrict(selectedProvinces?.code);
          setDistrict(district);
        };
        fetchData();
      }
    }, [selectedProvinces]);

    React.useEffect(() => {
      if (!isNullOrEmpty(selectedDistrict)) {
        const fetchData = async () => {
          const wards = await getWard(selectedDistrict?.code);
          setWard(wards);
        };
        fetchData();
      }
    }, [selectedDistrict]);

    const handleOpenModal = (value: string) => {
      switch (value) {
        case LOCATION.PROVINCES:
          setDataModal(province);
          setModalType(LOCATION.PROVINCES);
          modalOpenSelect?.current?.open();
          break;
        case LOCATION.DISTRICTS:
          setDataModal(district);
          setModalType(LOCATION.DISTRICTS);
          modalOpenSelect?.current?.open();
          break;
        case LOCATION.WARDS:
          setDataModal(ward);
          setModalType(LOCATION.WARDS);
          modalOpenSelect?.current?.open();
          break;
        default:
          break;
      }
    };

    const handleSelectDone = (data: {
      item: LocationInterface;
      type: string | undefined;
    }) => {
      switch (data?.type) {
        case LOCATION?.PROVINCES:
          setSelectedProvinces(data.item);
          modalOpenSelect?.current?.close();
          break;
        case LOCATION?.DISTRICTS:
          setSelectedDistrict(data.item);
          modalOpenSelect?.current?.close();
          break;
        case LOCATION?.WARDS:
          setSelectedWard(data.item);
          modalOpenSelect?.current?.close();
        default:
          break;
      }
    };

    const pressConfirrm = () => {
      const data = {
        fullname: `${inputRef?.current?.address}, ${selectedWard?.title}, ${selectedDistrict?.title}, ${selectedProvinces?.title}`,
        locationId: selectedWard?.code,
      };
      if (isUndefined(selectedWard?.title)) {
        onClose?.();
      } else {
        onSave?.(data);
      }
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
          closeOnOverlayTap={true}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <View style={styles.container}>
            <TextApp preset="text18">Địa chỉ</TextApp>
          </View>
          <View style={styles.body}>
            <InputRegister
              lable="Tỉnh/Thành phố"
              placeholder="Chọn Tỉnh/Thành phố"
              editable={false}
              isSelect
              newStyle={styles.newInput}
              onPress={handleOpenModal?.bind(null, LOCATION.PROVINCES)}
              value={selectedProvinces?.title}
            />
            <InputRegister
              lable="Quận/Huyện"
              placeholder="Chọn Quận/Huyện"
              editable={false}
              isSelect
              newStyle={styles.newInput}
              onPress={handleOpenModal?.bind(null, LOCATION.DISTRICTS)}
              value={selectedDistrict?.title}
            />
            <InputRegister
              lable="Phường/Xã"
              placeholder="Chọn Phường/Xã"
              editable={false}
              isSelect
              newStyle={styles.newInput}
              onPress={handleOpenModal?.bind(null, LOCATION.WARDS)}
              value={selectedWard?.title}
            />
            <CardInput
              lable="Tên đường, Toà nhà, Số nhà"
              placeholder="Nhập tên đường, toà nhà, số nhà"
              onChangeText={(value) =>
                (inputRef.current.address = value.toString())
              }
            />
          </View>
          <View style={styles.btn}>
            <Button preset="blue" title="Hoàn thành" onPress={pressConfirrm} />
          </View>
        </Modalize>
        <ModalSelect
          ref={modalOpenSelect}
          data={dataModal}
          type={modalType}
          onCloseModal={handleSelectDone}
        />
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
  body: {
    marginBottom: scale(20),
  },
  newInput: {
    backgroundColor: "#f4f3fd",
    borderColor: "#f4f3fd",
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
});

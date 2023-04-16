import { ImageAsset } from "../asset/image";

export const DataOutStand = [
  {
    name: "Phạm Thị Ngọc An ",
    school: "Đại học Ngoại Thương",
    star: 4.5,
    subject: ["Toán", "Lý", "Anh"],
    image: ImageAsset.person,
  },
  {
    name: "Phạm Thị Ngọc An 2",
    school: "Đại học Ngoại Thương",
    star: 4.5,
    subject: ["Toán", "Lý"],
    image: ImageAsset.person,
  },
  {
    name: "Phạm Thị Ngọc An 3",
    school: "Đại học Ngoại Thương",
    star: 4.5,
    subject: ["Toán", "Lý"],
    image: ImageAsset.person,
  },
  {
    name: "Phạm Thị Ngọc An 4",
    school: "Đại học Ngoại Thương",
    star: 4.5,
    subject: ["Toán", "Lý"],
    image: ImageAsset.person,
  },
];

export const DataArtCenter = [
  {
    name: "Trung tâm nghệ thuật Mega Art",
    location: "122 Đội Cấn, Ba Đình, Hà Nội",
    star: 4.5,
    subject: ["piano", "Nhảy-múa"],
    image: ImageAsset.banner,
  },
  {
    name: "Học viện đào tạo nghệ thuật",
    location: "122 Đội Cấn, Ba Đình, Hà Nội",
    star: 4.5,
    subject: ["piano", "Nhảy-múa"],
    image: ImageAsset.banner,
  },
  {
    name: "SkyGym B5 Mai Dịch",
    location: "122 Đội Cấn, Ba Đình, Hà Nội",
    star: 4.5,
    subject: ["piano", "Nhảy-múa"],
    image: ImageAsset.banner,
  },
];

export const DAY = {
  label: "Ngày học trong tuần",
  item: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
};

export const DATA_PAID = [
  {
    id: 1,
    class: "Lớp Toán",
    student: "Mỹ An",
    sessions: 14,
    startDate: "01/04/2023",
    endDate: "30/04/2023",
    pay: false,
    price: "4.500.000",
    color: "#cfecff",
  },
  {
    id: 2,
    class: "Lớp Lý",
    student: "Ngọc Minh",
    sessions: 14,
    startDate: "08/04/2023",
    endDate: "05/05/2023",
    pay: false,
    price: "3.500.000",
    color: "#fdf1db",
  },
];
export const DATA_UNPAID = [
  {
    id: 1,
    class: "Lớp Toán",
    student: "Mỹ An",
    sessions: 14,
    startDate: "01/04/2023",
    endDate: "30/04/2023",
    pay: true,
    price: "4.500.000",
    color: "#cfecff",
  },
  {
    id: 2,
    class: "Lớp Lý",
    student: "Ngọc Minh",
    sessions: 14,
    startDate: "08/04/2023",
    endDate: "05/05/2023",
    pay: true,
    price: "3.500.000",
    color: "#fdf1db",
  },
];

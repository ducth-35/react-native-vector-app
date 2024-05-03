import { HomeSVG } from "@/asset";

export const IOS_STORE_LINK =
  "https://apps.apple.com/vn/app/vector/id6450834400";
export const ANDROID_STORE_LINK =
  "https://play.google.com/store/apps/details?id=com.app.vector";

export const Filter = {
  SUBJECT: "SUBJECT",
  CLASS: "CLASS",
  SEX: "SEX",
  LEVEL: "LEVEL",
  SCHOOL: "SCHOOL",
};

export const USER_TYPE = {
  TUTOR: "tutor",
  PARENT: "parent",
};

export const GENDER = {
  MALE: "Nam",
  FEMALE: "Nữ",
  ALL: "Tất cả",
};

export const Literacy = {
  college_student: "Sinh viên đại học",
  teacher_grade_1: "Giáo viên cấp 1",
  teacher_grade_2: "Giáo viên cấp 2",
  teacher_grade_3: "Giáo viên cấp 3",
  bachelor: "Cử nhân đại học",
  master: "Thạc sĩ",
  doctor: "Tiến sĩ",
};

export const STATUS_BOOKING = {
  pending: "Chưa nhận lịch",
  accept: "Đã nhận lịch",
  cancel_by_parent: "Phụ huynh huỷ",
  cancel_by_tutor: "Gia sư huỷ",
  all: "Tất cả",
};

export const BOOKING = {
  pending: "pending",
  accept: "accept",
  cancel_by_parent: "cancel_by_parent",
  cancel_by_tutor: "cancel_by_tutor",
  all: "all",
};

export const PAYMENT_STATUS = {
  unpaid: "Unpaid",
  paid: "Paid",
  order: "PaymentOrder",
};
export const Status_calendar = {
  Confirmed: "Confirmed",
  Cancelled: "Cancelled",
  InProgress: "InProgress",
  Completed: "Completed",
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 25MB

export const NOTIFICATION_TYPE = [
  { type: "payment", icon: HomeSVG.PAYMENT },
  { type: "booking", icon: HomeSVG.REMINDER },
  { type: "result", icon: HomeSVG.RESULT },
  { type: "start_event", icon: HomeSVG.START_CLASS },
];

export const LOCATION = {
  PROVINCES: "PROVINCES",
  DISTRICTS: "DISTRICTS",
  WARDS: "WARDS",
};

export const OPTION_HAPTIC = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

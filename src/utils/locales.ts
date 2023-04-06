import { LocaleConfig } from "react-native-calendars";

export const setupCalendar = () => {
  LocaleConfig.locales["vn"] = {
    monthNames: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    monthNamesShort: [
      "Th.1",
      "Th.2",
      "Th.3",
      "Th.4",
      "Th.5",
      "Th.6",
      "Th.7",
      "Th.8",
      "Th.9",
      "Th.10",
      "Th.11",
      "Th.12",
    ],
    dayNames: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  };

  LocaleConfig.defaultLocale = "vn";
};

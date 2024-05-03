import { GENDER, Literacy } from "./enum";

export const HIT_SLOP = { top: 30, left: 30, right: 30, bottom: 30 };

export const parserLiteracy = (name: string[]) => {
  const convertname = name.join("");
  switch (convertname.toLocaleLowerCase()) {
    case Literacy.college_student.toLocaleLowerCase():
      return "college_student";
    case Literacy.teacher_grade_1.toLocaleLowerCase():
      return "teacher_grade_1";
    case Literacy.teacher_grade_2.toLocaleLowerCase():
      return "teacher_grade_2";
    case Literacy.teacher_grade_3.toLocaleLowerCase():
      return "teacher_grade_3";
    case Literacy.bachelor.toLocaleLowerCase():
      return "bachelor";
    case Literacy.master.toLocaleLowerCase():
      return "master";
    case Literacy.doctor.toLocaleLowerCase():
      return "doctor";
    default:
      break;
  }
};

export const parserNameToLiteracy = (name?: string | string[]) => {
  const literacyMap: Record<string, string> = {
    [Literacy.college_student]: "college_student",
    [Literacy.teacher_grade_1]: "teacher_grade_1",
    [Literacy.teacher_grade_2]: "teacher_grade_2",
    [Literacy.teacher_grade_3]: "teacher_grade_3",
    [Literacy.bachelor]: "bachelor",
    [Literacy.master]: "master",
    [Literacy.doctor]: "doctor",
  };

  if (typeof name === "string") {
    return literacyMap[name] || "";
  } else if (Array.isArray(name)) {
    const convertName = name.join("");
    return literacyMap[convertName] || "";
  } else {
    return "";
  }
};

export const parserLiteracyToName = (name?: string) => {
  switch (name) {
    case "college_student":
      return Literacy.college_student;
    case "teacher_grade_1":
      return Literacy.teacher_grade_1;
    case "teacher_grade_2":
      return Literacy.teacher_grade_2;
    case "teacher_grade_3":
      return Literacy.teacher_grade_3;
    case "bachelor":
      return Literacy.bachelor;
    case "master":
      return Literacy.master;
    case "doctor":
      return Literacy.doctor;
    default:
      return "";
  }
};

export const parserGender = (name?: string) => {
  switch (name) {
    case GENDER?.MALE:
      return 1;
    case GENDER?.FEMALE:
      return 2;
    case GENDER?.ALL:
      return 3;
    default:
      return undefined;
  }
};

export const formatNumber = (number: number = 0) => {
  let str = number?.toString();
  if (!str.includes(".")) {
    str += ".0";
  }
  return str;
};

export const formatCurrency = (amount: number = 0) => {
  const denominations = ["", "k", "tr", "tỷ", "nghìn tỷ"];
  let index = 0;

  while (amount >= 1000) {
    amount /= 1000;
    index++;
  }

  return `${amount.toFixed(0)}${denominations[index]}`;
};

export const formatPrice = (amount: number) => {
  const denominations = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];
  let index = 0;

  while (amount >= 1000) {
    if (index === 1 && amount >= 999999) {
      amount /= 1000000;
      index++;
      break;
    }
    amount /= 1000;
    index++;
  }

  return `${amount.toFixed(0)} ${denominations[index]}`;
};

export const formatAmount = (price: number | undefined) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getDate = (days = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

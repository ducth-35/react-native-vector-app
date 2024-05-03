import moment, { Moment } from "moment";

export const convertTime = (time: Moment | string | undefined) => {
  const formattedTime = moment(time).format("HH:mm");
  return formattedTime;
};

export const convertTimeCalendar = (time: Moment | string) => {
  const formattedTime = moment(time).format("HH:mm A");
  return formattedTime;
};

export const formatTime = (timeStr: string): string => {
  const currentTime = new Date();
  const providedTime = new Date(timeStr);
  const timeDiff = currentTime.getTime() - providedTime.getTime();

  // Tính số phút giữa thời gian hiện tại và thời gian cung cấp
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));

  if (minutesDiff < 1) {
    return "vừa xong";
  } else if (minutesDiff < 60) {
    return `${minutesDiff} phút trước`;
  } else if (minutesDiff < 1440) {
    const hoursDiff = Math.floor(minutesDiff / 60);
    return `${hoursDiff} giờ trước`;
  } else {
    const daysDiff = Math.floor(minutesDiff / 1440);
    return `${daysDiff} ngày trước`;
  }
};

export const formatDateTime = (
  dateTimeString: string | moment.Moment | undefined
) => {
  let datePart = "";
  let timePart = "";

  if (typeof dateTimeString === "string") {
    datePart = dateTimeString.split("T")[0];
    timePart = dateTimeString.split("T")[1]?.substring(0, 5);
  } else if (moment.isMoment(dateTimeString)) {
    datePart = dateTimeString.format("YYYY-MM-DD");
    timePart = dateTimeString.format("HH:mm:ss");
  }

  return `${datePart} ${timePart}:00`;
};

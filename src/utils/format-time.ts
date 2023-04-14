import moment, { Moment } from "moment";

export const convertTime = (time: Moment | string) => {
  const formattedTime = moment(time).format("HH:mm");
  return formattedTime;
};

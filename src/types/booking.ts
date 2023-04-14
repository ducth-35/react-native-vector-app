import { Moment } from "moment";

export type BookingInterface = {
  nameTeacher: string;
  school: string;
  price: string;
  day: string;
  time: string;
  startDate: string | Date;
  student: string;
  address: string;
};

export type RouteBookingInterface = {
  params: BookingInterface;
};

export type BookingInforInterface = {
  day: string[] | undefined;
  startTime: Moment | undefined;
  endTime: Moment | undefined;
  dateStart: string | undefined;
  address: string;
  name: string;
  phone: string;
};

export interface RouteBookingInforInterface {
  params: BookingInforInterface;
}

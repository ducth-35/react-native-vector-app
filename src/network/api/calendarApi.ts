import { NetWork } from "..";
import { API_URL } from "../url";
import { getRequestUrl } from "../utils";

const getCalendar = (params: { month: number; year: number }) => {
  const url = getRequestUrl(API_URL.calendar);
  return NetWork.get(url, params);
};

const createCalendar = (body: calendarInterface) => {
  const url = getRequestUrl(API_URL.calendar);
  return NetWork.post(url, body);
};

const getCalendarDetails = (id: number) => {
  const url = getRequestUrl(API_URL.calendar, { parentId: id });
  return NetWork.get(url);
};

const updateCalendar = (id: number, params: calendarInterface) => {
  const url = getRequestUrl(API_URL.calendar, {
    parentId: id,
  });
  return NetWork.put(url, params);
};

const cancelCalendar = (id: number, params: { status: string }) => {
  const url = getRequestUrl(API_URL.calendar, {
    parentId: id,
  });
  return NetWork.put(url, params);
};

export const calendarApi = {
  getCalendar,
  createCalendar,
  getCalendarDetails,
  updateCalendar,
  cancelCalendar,
};

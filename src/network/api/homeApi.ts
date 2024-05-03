import { NetWork } from "..";
import { API_URL } from "../url";
import { getRequestUrl } from "../utils";

const getSubjects = () => {
  const url = getRequestUrl(API_URL.get_subjects);
  return NetWork.get(url);
};

const getUserInfor = () => {
  const url = getRequestUrl(API_URL.get_user_infor);
  return NetWork.get(url);
};

const getGrades = () => {
  const url = getRequestUrl(API_URL.get_grades);
  return NetWork.get(url);
};

const getCenters = () => {
  const url = getRequestUrl(API_URL.get_centers);
  return NetWork.get(url);
};

const getTutorSuggestion = () => {
  const url = getRequestUrl(API_URL.get_tutor_suggestion);
  return NetWork.get(url);
};

const getDetailsTutor = (tutor_id: number) => {
  const url = getRequestUrl(API_URL.get_detail_tutor, { parentId: tutor_id });
  return NetWork.get(url);
};

const postBooking = (body: BookingInterface) => {
  const url = getRequestUrl(API_URL.booking);
  return NetWork.post(url, body);
};

const getBooking = (status?: string) => {
  const params = {
    page: 1,
    pageSize: 30,
    status: status || "all",
  };
  const url = getRequestUrl(API_URL.booking);
  return NetWork.get(url, params);
};

const getBookingDetails = (id: number) => {
  const url = getRequestUrl(API_URL.booking, { parentId: id });
  return NetWork.get(url);
};

const updateBooking = (body: BookingInterface) => {
  const url = getRequestUrl(API_URL.updateBooking);
  return NetWork.post(url, body);
};

const addStudents = (body: ChildrenInterface[]) => {
  const url = getRequestUrl(API_URL.add_students);
  return NetWork.post(url, body);
};

const deleteStudents = (body: { ids: number[] }) => {
  const url = getRequestUrl(API_URL.delete_students);
  return NetWork.post(url, body);
};

const deleteParent = () => {
  const url = getRequestUrl(API_URL.delete_parent);
  return NetWork.deleteMethod(url);
};

const addParent = (body: ParentInterface) => {
  const url = getRequestUrl(API_URL.add_parent);
  return NetWork.post(url, body);
};

const getSchool = () => {
  const url = getRequestUrl(API_URL.get_school);
  return NetWork.get(url);
};

const filter = (param: ParamsFilter, page: number, pageSize: number) => {
  const params = {
    ...param,
    page: page,
    pageSize: pageSize,
  };
  const url = getRequestUrl(API_URL.get_detail_tutor);
  return NetWork.get(url, params);
};

const uploadImage = (body: any) => {
  const url = getRequestUrl(API_URL.upload_image);
  return NetWork.postFormData(url, body);
};

const postResultLearning = (params: ResultsLearningParams) => {
  const url = getRequestUrl(API_URL.results);
  return NetWork.post(url, params);
};

const getNotification = () => {
  const url = getRequestUrl(API_URL.get_notifications);
  return NetWork.get(url);
};
const getTotalNotification = () => {
  const url = getRequestUrl(API_URL.total_notifications);
  return NetWork.get(url);
};
const readAllNotification = () => {
  const url = getRequestUrl(API_URL.real_all_notifications);
  return NetWork.post(url);
};

const deleteUser = () => {
  const url = getRequestUrl(API_URL.delete_user);
  return NetWork.deleteMethod(url);
}

const logoutUser = () => {
  const url = getRequestUrl(API_URL.logout_user);
  return NetWork.post(url);
}

export const homeApi = {
  getSubjects,
  getUserInfor,
  getGrades,
  getCenters,
  getTutorSuggestion,
  getDetailsTutor,
  postBooking,
  getBooking,
  getBookingDetails,
  updateBooking,
  addStudents,
  deleteStudents,
  deleteParent,
  addParent,
  getSchool,
  filter,
  uploadImage,
  postResultLearning,
  getNotification,
  getTotalNotification,
  readAllNotification,
  deleteUser,
  logoutUser
};

export const API_URL = {
  //auth
  register: "v1/auth/register",
  register_tutor: "v1/users/update/tutor",
  register_parent: "v1/users/update/parent",
  refresh_token: "v1/auth/refresh-token",
  login: "v1/auth/login",
  create_otp: "v1/auth/create-otp",
  get_otp: "v1/auth/otp",
  verify_otp: "v1/auth/verify-otp",
  //app
  get_user_infor: "v1/users/info",
  get_subjects: "v1/subjects",
  get_grades: "v1/grades",
  //booking
  booking: "v1/bookings",
  updateBooking: "v1/bookings/update-state-booking",
  //home
  get_centers: "v1/centers",
  get_tutor_suggestion: "v1/tutors/suggestion",
  get_detail_tutor: "v1/tutors",
  //account
  add_students: "v1/users/students",
  delete_students: "v1/users/delete/students",
  delete_parent: "v1/users/parents",
  add_parent: "v1/users/parents",
  delete_user: "v1/users/delete",
  logout_user: "v1/users/logout",
  //shool
  get_school: "v1/schools",
  //calendar
  calendar: "v1/calendars",
  // result
  result_overview: "v1/results/overview",
  results: "v1/results",
  // payment
  payment: "v1/payments",
  payment_total: "v1/payments/total",
  payment_update_status: "v1/payments/update-status-payment",
  // School
  school: "v1/schools",
  //updoad image
  upload_image: "upload/minio",
  //notifications
  get_notifications: "v1/notifications",
  total_notifications: "v1/notifications/total-unread",
  real_all_notifications: "v1/notifications/unread-all",
  //location
  location: "v1/location",
  // tutor
  create_rating: "v1/tutors/rating",
  get_rating: "v1/tutors/rating",
};

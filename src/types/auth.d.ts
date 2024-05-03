interface SignInParam {
  phoneNumber: string;
  password: string;
  deviceToken?: string;
}

interface RegisterInterface {
  fullName?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  deviceToken?: string;
  role?: string;
}
interface SignUpTutorInterface {
  fullName?: string;
  email?: string;
  avatar?: string | undefined;
  literacy?: string | undefined;
  school?: string | undefined;
  subjects?: subjectsInterface[];
  // grades?: string[];
  locationId?: string | undefined;
  location?: string | undefined;
  introduction?: string;
  teachingMethod?: string;
  literacyImages?: ImageInterface[];
  experience?: string;
  numberOfStudent?: number;
}
interface SignUpParentInterface {
  fullName?: string | undefined;
  email?: string | undefined;
  location?: string | undefined;
  avatar?: string | undefined;
  parent?: ParentInterface | undefined;
  children?: ChildrenInterface[] | undefined;
}

interface OTPInterface {
  phoneNumber: string;
}
interface VerifiyOTPinterface {
  phoneNumber?: string;
  otpCode?: string;
  role?: string;
}
interface ChildrenInterface {
  fullName?: string | undefined;
  phone?: string | undefined;
  grade: string | undefined;
}
interface ParentInterface {
  fullName: string | undefined;
  phone: string | undefined;
}
interface BookingInterface {
  startTime?: string;
  days?: string[];
  state?: string;
  id?: number;
  studentId?: number;
  startDate?: string;
  endTime?: string;
  pricePerLesson?: number;
  createdAt?: string;
  tutor?: string;
  studentEmail?: string;
  studentFullName?: string;
  studentGrade?: string;
  subjectDescription?: string;
  subjectId?: number;
  subjectImage?: string | undefined;
  subjectName?: string;
  tutorEmail?: string;
  tutorFullName?: string;
  tutorId?: number;
  parentId?: number;
  tutorSchool?: string;
  parentLocation?: string;
  parentLocationId?: string;
  bookingId?: number;
}

interface calendarInterface {
  title?: string | undefined;
  startTime?: moment.Moment | string;
  endTime?: moment.Moment | string;
  note?: string;
  day?: string;
  id?: string;
  description?: string;
  bookingId?: number;
  tutor?: string;
  student?: string;
  location?: string;
  status?: string;
}

interface AppState {
  token: string | undefined;
  deviceToken: string | undefined;
  userInfor: UserInforInterface;
  isLoading: boolean;
  msgError: string;
  isAuthen: boolean;
  refreshData: boolean;
}

interface AuthInterface {
  type: string;
}

interface UserInforInterface {
  achievement: string;
  createdAt: string;
  email: string;
  fullName: string;
  grade: gradeInterface[];
  id: number;
  literacy: string;
  modifiedAt: string;
  phoneNumber: string;
  role: string;
  school: string;
  subject: subjectInterface[];
  children: childrenInterface[];
  userId: number;
  otherParent: OtherParentInterface | undefined;
  location: string;
  locationId: string;
  avatar: string;
  achievementImages: ImageInterface[];
  literacyImages: ImageInterface[];
  rating: number;
  teachingMethod: string;
  experience: string;
  sex: string;
  numberOfStudent: number;
  introduction: string;
}

type OtherParentInterface = {
  id: number;
  location: string;
  locationId: string;
  otherParentId: number;
  phoneNumber: string;
  fullName: string;
};

type gradeInterface = {
  createdAt: string;
  description: string;
  id: number;
  image: string;
  modifiedAt: string;
  name: string;
};

type subjectInterface = {
  grade: string;
  gradeId: number;
  price: number;
  score: number;
  subject: string;
  subjectId: number;
  subjectImage: string;
  achievementImages: ImageInterface[];
};

type childrenInterface = {
  createdAt: string;
  fullName: string;
  gradeId: number;
  gradeName: string;
  id: number;
  modifiedAt: string;
  userId: number;
};

type GetRequestParams = {
  parentId?: string | number;
  partial?: string | number;
  subId?: string | number;
  action?: string | number;
};

type ObjectType = { [key: string]: any | any[] };

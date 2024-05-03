interface ImageResponse {
  fileName: string;
  url: string;
}

interface TutorSuggestionInterface {
  literacy: string;
  achievement: string;
  introduction: string;
  id: number;
  school: string;
  userId: number;
  fullName: string;
  role: string;
  phoneNumber: number;
  email: string;
  rating: number | undefined;
  subject: SubjectInterface[];
  avatar?: string;
  teachingMethod?: string;
  literacyImages?: ImageResponse[];
  experience?: string;
  numberOfStudent?: number;
}

interface SubjectInterface {
  gradeId: string;
  gradeName: string;
  subjectId: string;
  subjectName: string;
  price: string;
}

interface CenterInterface {
  rating: number;
  name: string;
  location_id: string;
  created_at: Date | string;
  location: string;
  description: string;
  thumbnail: string;
  id: number;
  modified_at: Date | string;
  subjects: SubjectsInterface[];
}

interface SubjectsInterface {
  id: string;
  name: string;
}

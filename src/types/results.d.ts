type SubjectInterfaceResponseItem = {
  subjectId: number;
  subjectName: string;
  subjectImage?: string;
  subjectColor?: string;
  tutor?: string;
  tutorUserId: number;
  startTime: string;
  endTime: string;
};

type SubjectInterfaceItem = SubjectInterfaceResponseItem & {
  studentName?: string;
  studentId?: number;
};

type ResultOverviewResponseInterface = {
  studentId: number;
  studentName?: string;
  studentGrade?: string;
  subjects: SubjectInterfaceResponseItem[];
};

type ResultOverviewInterface = {
  studentId: number;
  studentName?: string;
  studentGrade?: string;
  title: string;
  data: SubjectInterfaceItem[];
};

type ResultResponseItem = {
  id: number;
  day: string;
  subject: string;
  name?: string;
};

type ResultParams = PaginationRequest & {
  studentId?: number;
  subjectId?: number;
};

type ResultDetail = {
  eventId?: number;
  content?: string;
  numberOfTaskComplete?: number;
  numberOfTaskWrong?: number;
  numberOfTaskNotComplete?: number;
  testMark?: number;
  learningSpirit?: number;
  learningSpiritNote?: string;
  learningAbility?: number;
  learningAbilityNote?: string;
  assignments?: string;
  day?: string;
  tutorId: number;
  id: number;
};

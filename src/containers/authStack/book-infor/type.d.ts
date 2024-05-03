interface BookingInforRouter {
  name?: string;
  subjects?: SubjectInterface[];
  schoolName?: string;
  tutorId?: number
}

interface SubjectInterface {
  gradeId: string;
  gradeName: string;
  price: string;
  subjectId: string;
  subjectName: string;
}

export interface PaymentInfor {
  id: number;
  subjectName: string;
  studentName: string;
  sessions: number;
  startDate: string;
  endDate: string;
  price: string;
  color: string;
  status?: string;
}

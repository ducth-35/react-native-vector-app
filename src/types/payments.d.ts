export type PaymentParams = {
  status: string;
};

export type PaymentResponseItem = {
  id: number;
  subjectName: string;
  studentName: string;
  sessions: number;
  startDate: string;
  endDate: string;
  status?: "Paid" | "Unpaid" | "PaymentOrder"; // Modify the status values as per your specific requirements
  price: string;
};

export type PaymentDetailResponse = PaymentResponseItem & {
  days?: string[];
  startTime?: string;
  endTime?: string;
  lessonsDay?: string[];
  pricePerLesson: string
};


type PaymentUpdateStatusPayload = {
  paymentId: number
  status: string
}
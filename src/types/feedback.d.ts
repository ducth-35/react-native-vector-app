interface RatingPayload {
  resultId: number;
  tutorId: number;
  rating: number;
  comment: string;
}

interface RatingParams {
  tutorId: number;
}

interface RatingResponseItem {
  id: number;
  fullName?: string;
  avatar?: string;
  comment?: string;
  rating?: number;
}

import { NetWork } from "..";
import { API_URL } from "../url";
import { getRequestUrl } from "../utils";

const createRating = (body: RatingPayload) => {
  const url = getRequestUrl(API_URL.create_rating);
  return NetWork.post(url, body);
};

const getRating = (params: RatingParams) => {
  const url = getRequestUrl(API_URL.get_rating, { partial: params.tutorId });
  return NetWork.get(url);
};

export const tutorApi = {
  createRating,
  getRating,
};

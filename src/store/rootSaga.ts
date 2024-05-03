import { all } from "redux-saga/effects";
import authSaga from "./auth/middleware/auth.saga";

export default function* rootSaga() {
  yield all([authSaga()]);
}

import { PaymentParams, PaymentUpdateStatusPayload } from "@/types/payments";
import { NetWork } from "..";
import { API_URL } from "../url";
import { getRequestUrl } from "../utils";
import { PAYMENT_STATUS } from "@/utils/enum";

const getPayments = (params: PaymentParams) => {
  const url = getRequestUrl(API_URL.payment);
  return NetWork.get(url, params);
};

const getPaymentDetail = (paymentId: number) => {
  const url = getRequestUrl(API_URL.payment) + `/${paymentId}`;
  return NetWork.get(url);
};

const getPaymentTotal = () => {
  const url = getRequestUrl(API_URL.payment_total);
  return NetWork.get(url);
};

const updateStatusPayment = (payload: PaymentUpdateStatusPayload) => {
  const url = getRequestUrl(API_URL.payment_update_status);
  return NetWork.post(url, payload);
};

const updateStatusOrderPayment = (paymentId: number) => {
  return updateStatusPayment({
    paymentId: paymentId,
    status: PAYMENT_STATUS.order,
  });
};

export const paymentApi = {
  getPayments,
  getPaymentDetail,
  getPaymentTotal,
  updateStatusOrderPayment,
};

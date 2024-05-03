import { paymentApi } from "@/network/api/paymentApi";
import { RESPONSE_CODE } from "@/network/config";
import { refreshDataSelector } from "@/store/auth/authSelector";
import {
  PaymentDetailResponse,
  PaymentParams,
  PaymentResponseItem,
} from "@/types/payments";
import { PAYMENT_STATUS } from "@/utils/enum";
import React from "react";
import { useSelector } from "react-redux";

const useGetPayments = (
  params: PaymentParams
): {
  payment: PaymentResponseItem[];
  loading: boolean;
} => {
  const [payment, setPayment] = React.useState<PaymentResponseItem[]>([]);
  const refreshData = useSelector(refreshDataSelector);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    const res = await paymentApi.getPayments(params);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const paymentResponse: PaymentResponseItem[] = res?.data?.data;
      for (const p of paymentResponse) {
        const price = +p.price;
        p.price = price.toLocaleString("en-US");
      }
      setPayment(paymentResponse);
    }
  };

  React.useEffect(() => {
    fetchData();
    setLoading(false);
  }, [refreshData]);
  return { payment: payment, loading };
};

const useGetPaymentsTotal = (): {
  total: string;
} => {
  const [total, setTotal] = React.useState<string>("0");
  const refreshData = useSelector(refreshDataSelector);

  const fetchData = async () => {
    const res = await paymentApi.getPaymentTotal();
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const paymentResponse: number = res?.data?.data.total;
      setTotal(paymentResponse.toLocaleString("en-US"));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [refreshData]);
  return { total: total };
};

const useGetPaymentsUnpaid = (): {
  paymentUnpaid: PaymentResponseItem[];
  loadingUnpaid: boolean;
} => {
  const { payment, loading } = useGetPayments({
    status: PAYMENT_STATUS.unpaid,
  });
  return { paymentUnpaid: payment, loadingUnpaid: loading };
};

const useGetPaymentsPaid = (): {
  paymentPaid: PaymentResponseItem[];
  loadingPaid: boolean;
} => {
  const { payment, loading } = useGetPayments({ status: PAYMENT_STATUS.paid });
  return { paymentPaid: payment, loadingPaid: loading };
};

const useGetPaymentDetail = (paymentId: number) => {
  const [paymentDetail, setPayment] = React.useState<PaymentDetailResponse>();
  const refreshData = useSelector(refreshDataSelector);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    const res = await paymentApi.getPaymentDetail(paymentId);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const paymentDetail: PaymentDetailResponse = res?.data?.data;
      const price = +paymentDetail.price;
      paymentDetail.price = price.toLocaleString("en-US");
      const pricePerLesson = +paymentDetail.pricePerLesson;
      paymentDetail.pricePerLesson = pricePerLesson.toLocaleString("en-US");
      setPayment(paymentDetail);
    }
  };

  React.useEffect(() => {
    fetchData();
    setLoading(false);
  }, [refreshData]);
  return { paymentDetail, loading };
};

const useUpdatePaymentOrder = async (paymentId: number) => {
  const res = await paymentApi.updateStatusOrderPayment(paymentId);
  return res;
};
export {
  useGetPaymentsUnpaid,
  useGetPaymentsPaid,
  useGetPaymentsTotal,
  useGetPaymentDetail,
  useUpdatePaymentOrder,
};

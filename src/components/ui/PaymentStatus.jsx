import { PAYMENT_STATUS } from "../../constants/paymentStatus";

export default function PaymentStatus({ status }) {
  switch (status) {
    case PAYMENT_STATUS.UNPAID:
      return <span>پرداخت نشده</span>;

    case PAYMENT_STATUS.PAID:
      return <span>پرداخت شده</span>;

    case PAYMENT_STATUS.REFUNDED:
      return <span>بازگشت وجه</span>;

    default:
      return <span>-</span>;
  }
}
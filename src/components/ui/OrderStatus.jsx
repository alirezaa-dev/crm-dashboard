import { ORDER_STATUS } from "../../constants/orderStatus";

export default function OrderStatus({ status }) {
  const baseClass =
    "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium";

  switch (status) {
    case ORDER_STATUS.PENDING_SHIPMENT:
      return (
        <span
          className={`${baseClass} border-amber-500 bg-amber-100 text-amber-800`}
        >
          در انتظار ارسال
        </span>
      );

    case ORDER_STATUS.CONFIRMED:
      return (
        <span
          className={`${baseClass} border-green-500 bg-green-100 text-green-800`}
        >
          تایید شده
        </span>
      );

    case ORDER_STATUS.SHIPPED:
      return (
        <span
          className={`${baseClass} border-violet-500 bg-violet-100 text-violet-800`}
        >
          ارسال شده
        </span>
      );

    case ORDER_STATUS.CANCELED:
      return (
        <span
          className={`${baseClass} border-red-500 bg-red-100 text-red-800`}
        >
          لغو شده
        </span>
      );

    default:
      return <span>-</span>;
  }
}
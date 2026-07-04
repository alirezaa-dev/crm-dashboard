import { ORDER_STATUS } from "../../constants/orderStatus";

export default function OrderStatus({ status }) {
  switch (status) {
    case ORDER_STATUS.PENDING_SHIPMENT:
      return <span>در انتظار ارسال</span>;

    case ORDER_STATUS.SHIPPED:
      return <span>ارسال شده</span>;

    case ORDER_STATUS.CONFIRMED:
      return <span>تایید شده</span>;

    case ORDER_STATUS.CANCELED:
      return <span>لغو شده</span>;

    default:
      return <span>-</span>;
  }
}
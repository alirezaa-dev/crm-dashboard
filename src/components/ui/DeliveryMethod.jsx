import { DELIVERY_METHOD } from "../../constants/deliveryMethod";

export default function DeliveryMethod({ method }) {
  switch (method) {
    case DELIVERY_METHOD.PICKUP:
      return <span>تحویل حضوری</span>;

    case DELIVERY_METHOD.SHIPPING:
      return <span>ارسال به مشتری</span>;

    default:
      return <span>-</span>;
  }
}
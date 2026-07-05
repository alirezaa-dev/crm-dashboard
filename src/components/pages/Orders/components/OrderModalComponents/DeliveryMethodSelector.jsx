import { DELIVERY_METHOD } from "../../../../../constants/deliveryMethod";
export default function DeliveryMethodSelector({
  deliveryMethod,
  setDeliveryMethod,
}) {
  return (
    <div className="mb-5">
      <h3 className="mb-2 font-medium">نحوه تحویل</h3>

      <label className="ml-6 cursor-pointer">
        <input
          type="radio"
          checked={deliveryMethod === DELIVERY_METHOD.PICKUP}
          onChange={() => setDeliveryMethod(DELIVERY_METHOD.PICKUP)}
        />
        تحویل حضوری
      </label>

      <label className="cursor-pointer">
        <input
          type="radio"
          checked={deliveryMethod === DELIVERY_METHOD.SHIPPING}
          onChange={() => setDeliveryMethod(DELIVERY_METHOD.SHIPPING)}
        />
        ارسال به مشتری
      </label>
    </div>
  );
}

import Button from "../../../ui/Button";

export default function OrdersHeader({ onAddOrder }) {
  return (
    <div className="flex flex-row justify-between items-center mb-4">
      <h2 className="text-lg font-bold">مدیریت سفارشات</h2>

      <Button onClick={onAddOrder}>
        <span className="text-lg pl-2">+</span>
        ثبت سفارش جدید
      </Button>
    </div>
  );
}
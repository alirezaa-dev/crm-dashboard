import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { CustomerContext } from "../../../context/CustomerContext";
import { ProductContext } from "../../../context/ProductContext";
import OrderStatus from "../../ui/OrderStatus";
import { ORDER_STATUS } from "../../../constants/orderStatus";

export default function Dashboard() {
  const { orders } = useContext(OrderContext);
  const { customers } = useContext(CustomerContext);
  const { products } = useContext(ProductContext);

  const totalSales = orders.reduce((sum, order) => sum + order.orderAmount, 0);
  const pendingShipment = orders.filter(
    (order) => order.status === ORDER_STATUS.PENDING_SHIPMENT,
  ).length;

  const confirmed = orders.filter(
    (order) => order.status === ORDER_STATUS.CONFIRMED,
  ).length;

  const shipped = orders.filter(
    (order) => order.status === ORDER_STATUS.SHIPPED,
  ).length;

  const canceled = orders.filter(
    (order) => order.status === ORDER_STATUS.CANCELED,
  ).length;
  const productSales = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      productSales[item.productId] =
        (productSales[item.productId] || 0) + item.quantity;
    });
  });

  const topProducts = Object.entries(productSales)
    .map(([productId, soldCount]) => {
      const product = products.find((p) => p.id === Number(productId));

      return {
        id: productId,
        name: product?.name || "محصول حذف شده",
        soldCount,
      };
    })
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">داشبورد</h1>

      {/* ================= Stats ================= */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">تعداد سفارشات</p>
          <h2 className="mt-2 text-3xl font-bold">{orders.length}</h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">تعداد مشتریان</p>
          <h2 className="mt-2 text-3xl font-bold">{customers.length}</h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">تعداد محصولات</p>
          <h2 className="mt-2 text-3xl font-bold">{products.length}</h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">فروش کل</p>
          <h2 className="mt-2 text-3xl font-bold">
            {totalSales.toLocaleString()} تومان
          </h2>
        </div>
      </div>
      {/* ================= Order Status ================= */}
      <div className="flex flex-row gap-8">
        <div className="rounded-lg bg-white p-6 shadow grow">
          <h2 className="mb-6 text-xl font-bold">وضعیت سفارشات</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <OrderStatus status={ORDER_STATUS.PENDING_SHIPMENT} />
              <span className="font-bold">{pendingShipment}</span>
            </div>
            <div className="flex items-center justify-between">
              <OrderStatus status={ORDER_STATUS.SHIPPED} />
              <span className="font-bold">{shipped}</span>
            </div>

            <div className="flex items-center justify-between">
              <OrderStatus status={ORDER_STATUS.CONFIRMED} />
              <span className="font-bold">{confirmed}</span>
            </div>

            <div className="flex items-center justify-between">
              <OrderStatus status={ORDER_STATUS.CANCELED} />
              <span className="font-bold">{canceled}</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow grow">
          <h2 className="mb-6 text-xl font-bold">آخرین سفارش‌ها</h2>

          <div className="space-y-4">
            {orders
              .slice()
              .reverse()
              .slice(0, 5)
              .map((order) => {
                const customer = customers.find(
                  (customer) => customer.id === order.customerId,
                );

                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-sm">
                      {customer?.name || "مشتری نامشخص"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.orderAmount.toLocaleString()} تومان
                    </p>

                    <OrderStatus status={order.orderStatus} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <div className="rounded-lg bg-white p-6 shadow grow">
          <h2 className="mb-6 text-xl font-bold">آخرین مشتریان</h2>

          <div className="space-y-4">
            {customers
              .slice()
              .reverse()
              .slice(0, 5)
              .map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                >
                  
                    <p className="font-semibold">{customer.name}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {customer.phone}
                    </p>
                 
                </div>
              ))}
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-6 text-xl font-bold">پرفروش‌ترین محصولات</h2>

          <div className="space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0 "
              >
                <p className="text-sm w-3/5">{product.name}</p>

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                  {product.soldCount} عدد
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

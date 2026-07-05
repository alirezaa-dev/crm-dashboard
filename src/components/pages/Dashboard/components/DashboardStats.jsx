export default function DashboardStats({
  ordersCount,
  customersCount,
  productsCount,
  totalSales,
}) {
  const stats = [
    {
      title: "تعداد سفارشات",
      value: ordersCount,
    },
    {
      title: "تعداد مشتریان",
      value: customersCount,
    },
    {
      title: "تعداد محصولات",
      value: productsCount,
    },
    {
      title: "فروش کل",
      value: `${totalSales.toLocaleString()} تومان`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.title} className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">{stat.title}</p>

          <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
        </div>
      ))}
    </div>
  );
}

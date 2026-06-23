import Button from "../ui/Button";

export default function Customers() {
  const customers = [
    {
      id: 1,
      name: "علی رضایی",
      score: 120,
      joinDate: "1405/03/20",
    },
    {
      id: 2,
      name: "مریم احمدی",
      score: 80,
      joinDate: "1405/03/15",
    },
  ];

  function addNewUser() {
    console.log("add user");
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="pb-4">مشتری‌ها</h2>
          <p>تعداد کل مشتری‌ها: {customers.length}</p>
        </div>

        <div>
          <Button className="p-2 border rounded-sm mx-1 border-gray-300">
            {" "}
            <span className="text-lg pl-2 ">+</span>افزودن مشتری جدید
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md">
        <table className="w-full text-right">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-4 border-b border-border">شماره</th>
              <th className="px-4 py-4 border-b border-border">
                نام و نام خانوادگی
              </th>
              <th className="px-4 py-4 border-b border-border">امتیاز</th>
              <th className="px-4 py-4 border-b border-border">تاریخ عضویت</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-4 border-b border-border">
                  {customer.id}
                </td>
                <td className="px-4 py-4 border-b border-border">
                  {customer.name}
                </td>
                <td className="px-4 py-4 border-b border-border">
                  {customer.score}
                </td>
                <td className="px-4 py-4 border-b border-border">
                  {customer.joinDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

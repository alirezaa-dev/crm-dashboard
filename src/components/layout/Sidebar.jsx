import { Link } from "react-router";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-l border-gray-200 shadow-sm p-4">
      <h1 className="mb-6 text-lg font-bold">فروشگاه دهقان</h1>

      <ul className="space-y-3">
        <li>
          <Link
            to="/"
            className="block rounded p-2 text-right hover:bg-gray-100"
          >
            داشبورد
          </Link>
        </li>

        <li>
          <Link
            to="/customers"
            className="block rounded p-2 text-right hover:bg-gray-100"
          >
            مشتریان
          </Link>
        </li>

        <li>
          <Link
            to="/products"
            className="block rounded p-2 text-right hover:bg-gray-100"
          >
            محصولات
          </Link>
        </li>

        <li>
          <Link
            to="/categories"
            className="block rounded p-2 text-right hover:bg-gray-100"
          >
            دسته‌بندی‌ها
          </Link>
        </li>

        <li>
          <Link
            to="/brands"
            className="block rounded p-2 text-right hover:bg-gray-100"
          >
            برندها
          </Link>
        </li>

        <li>
          <Link
            to="/orders"
            className="block rounded p-2 text-right hover:bg-gray-100"
          >
            سفارشات
          </Link>
        </li>
      </ul>
    </div>
  );
}

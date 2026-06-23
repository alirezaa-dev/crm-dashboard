import Button from "../ui/Button";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
export default function Products() {
  const products = [
    {
      id: 1,
      name: "شامپو بدن ضد جوش",
      sku: "P001",
      price: 189000,
      stock: 25,
      status: "فعال",
    },
    {
      id: 2,
      name: "کرم آبرسان",
      sku: "P002",
      price: 250000,
      stock: 12,
      status: "فعال",
    },
    {
      id: 3,
      name: "ژل شستشو",
      sku: "P003",
      price: 145000,
      stock: 0,
      status: "ناموجود",
    },
  ];
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h2>محصولات</h2>
        <Button className="p-2 border rounded-sm mx-1 border-gray-300">
          {" "}
          <span className="text-lg pl-2 ">+</span>افزودن محصول جدید
        </Button>
      </div>

      <table className="w-full text-right bg-white rounded-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-4 border-b border-border">نام محصول</th>
            <th className="px-4 py-4 border-b border-border">کد</th>
            <th className="px-4 py-4 border-b border-border">قیمت (تومان)</th>
            <th className="px-4 py-4 border-b border-border">موجودی</th>
            <th className="px-4 py-4 border-b border-border">وضعیت</th>
            <th className="px-4 py-4 border-b border-border">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-4 border-b border-border">
                {product.name}
              </td>
              <td className="px-4 py-4 border-b border-border">
                {product.sku}
              </td>
              <td className="px-4 py-4 border-b border-border">
                {product.price}
              </td>
              <td className="px-4 py-4 border-b border-border">
                {product.stock}
              </td>
              <td className="px-4 py-4 border-b border-border">
                {product.status}
              </td>

              <td className="px-4 py-4 border-b border-border">
                <button className="p-2 border rounded-sm mx-1 border-gray-300">
                  <IoEyeOutline />
                </button>
                <button className="p-2 border rounded-sm mx-1 border-primary bg-blue-100">
                  <MdOutlineModeEdit className="text-primary" />
                </button>
                <button className="p-2 border rounded-sm mx-1 border-red-400 bg-red-100">
                  <MdDeleteOutline className="text-red-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

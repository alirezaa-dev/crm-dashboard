import Button from "../../ui/Button";
import React, { useState, useContext } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { OrderContext } from "../../../context/OrderContext";
import { CustomerContext } from "../../../context/CustomerContext";
import OrderStatus from "../../ui/OrderStatus";
import { ProductContext } from "../../../context/ProductContext";
import DeliveryMethod from "../../ui/DeliveryMethod";


export default function Orders() {
  const { orders, setOrders } = useContext(OrderContext);
  const { customers } = useContext(CustomerContext);
  const { products } = useContext(ProductContext);
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [showCustomers, setShowCustomers] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const search = customerSearch.trim().toLowerCase();

    return (
      customer.name.toLowerCase().includes(search) ||
      customer.phone.includes(search)
    );
  });

  const [productSearch, setProductSearch] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const orderAmount = selectedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()),
    )
    .slice(0, 20);
  const addProductToOrder = (product) => {
    const exists = selectedProducts.find((p) => p.id === product.id);

    if (exists) return;

    setSelectedProducts([
      ...selectedProducts,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };
  const removeProduct = (id) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id),
    );
  };
  const increaseQuantity = (id) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  };
  const decreaseQuantity = (id) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(1, product.quantity - 1),
            }
          : product,
      ),
    );
  };

  const [isOpenModalAddOrder, setIsOpenModalAddOrder] = useState(false);
  const [isOpenModalEditOrder, setIsOpenModalEditOrder] = useState(false);
  const [isOpenModalDeleteOrder, setIsOpenModalDeleteOrder] = useState(false);

  const [search, setSearch] = useState("");

  const [orderNumber, setOrderNumber] = useState("");
  const [nextOrderNumber, setNextOrderNumber] = useState(4002);
  const [items, setItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderDate, setOrderDate] = useState("");

  const [nextId, setNextId] = useState(2);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.includes(search),
  );
  const handleAddOrder = () => {
    if (!customerId) {
      alert("لطفاً یک مشتری انتخاب کنید.");
      return;
    }

    if (selectedProducts.length === 0) {
      alert("حداقل یک محصول انتخاب کنید.");
      return;
    }

    const today = new Date().toLocaleDateString("fa-IR");

    const newOrder = {
      id: nextId,
      orderNumber: String(nextOrderNumber),
      customerId,
      items: selectedProducts,
      orderAmount,
      orderStatus: 0,
      orderDate: today,
    };

    setOrders([...orders, newOrder]);

    setNextId((prev) => prev + 1);
    setNextOrderNumber((prev) => prev + 1);

    // پاک کردن فرم
    setCustomerSearch("");
    setCustomerId(null);
    setProductSearch("");
    setSelectedProducts([]);
    setShowCustomers(false);
    setShowProducts(false);

    // بستن مودال
    setIsOpenModalAddOrder(false);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h2>سفارشات</h2>

        <Button
          className="p-2 border rounded-sm mx-1 border-gray-300"
          onClick={() => setIsOpenModalAddOrder(true)}
        >
          <span className="text-lg pl-2">+</span>
          ثبت سفارش جدید
        </Button>
      </div>

      {/* Search */}
      <div className="flex flex-row gap-4">
        <input
          className="h-12 leading-12 px-3 border border-gray-200 rounded bg-white w-full"
          type="text"
          placeholder="جستجوی شماره سفارش"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full overflow-x-auto rounded-md bg-white">
        <table className="min-w-[1100px] text-right border-collapse w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                شماره
              </th>
              <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                شماره سفارش
              </th>
              <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                نام مشتری
              </th>
              <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                تعداد محصولات
              </th>
              <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                مبلغ سفارش
              </th>
              <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                وضعیت سفارش
              </th>
              <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                تاریخ سفارش
              </th>
              <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => {
              const customer = customers.find(
                (customer) => customer.id === order.customerId,
              );

              return (
                <tr key={order.id}>
                  <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                    {order.id}
                  </td>

                  <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                    {order.orderNumber}
                  </td>

                  <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                    {customer?.name}
                  </td>

                  <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                    {order.items.length}
                  </td>

                  <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                    {order.orderAmount}
                  </td>

                  <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                    <OrderStatus status={order.orderStatus} />
                  </td>
                  <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                    {order.orderDate}
                  </td>

                  <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 border rounded-md border-gray-200 bg-blue-100 shadow-sm cursor-pointer"
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setOrderNumber(order.orderNumber);
                          setCustomerId(order.customerId);
                          setOrderStatus(order.orderStatus);
                          setOrderDate(order.orderDate);
                          setItems(order.items);
                          setIsOpenModalEditOrder(true);
                        }}
                      >
                        <MdOutlineModeEdit className="text-primary" />
                      </button>

                      <button
                        className="p-2 border rounded-md border-gray-200 bg-red-100 shadow-sm cursor-pointer"
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setIsOpenModalDeleteOrder(true);
                        }}
                      >
                        <MdDeleteOutline className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Add Order Modal */}
      {isOpenModalAddOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[700px] p-6 max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-6">ثبت سفارش جدید</h2>

            {/* Customer */}
            <div className="mb-5 relative">
              <label className="block mb-2 text-sm font-medium">مشتری</label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="نام یا شماره موبایل مشتری..."
                  value={customerSearch}
                  onChange={(e) => {
                    setCustomerSearch(e.target.value);
                    setShowCustomers(true);
                  }}
                  onFocus={() => setShowCustomers(true)}
                  className="w-full border rounded-md p-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {showCustomers && (
                  <button
                    type="button"
                    onClick={() => setShowCustomers(false)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 text-lg font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {showCustomers && customerSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-50 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-[100]">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        onClick={() => {
                          setCustomerId(customer.id);
                          setCustomerSearch(customer.name);
                          setShowCustomers(false);
                        }}
                        className=" flex flex-row px-4 py-3 cursor-pointer hover:bg-blue-100 align-items justify-between"
                      >
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-sm text-gray-500">
                          {customer.phone}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500">
                      مشتری پیدا نشد.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative mb-6">
              <label className="block mb-2 text-sm font-medium">محصولات</label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجوی محصول..."
                  value={productSearch}
                  onFocus={() => setShowProducts(true)}
                  onChange={(e) => {
                    setProductSearch(e.target.value);
                    setShowProducts(true);
                    setShowCustomers(false);
                  }}
                  className="w-full border rounded-md p-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {showProducts && (
                  <button
                    type="button"
                    onClick={() => setShowProducts(false)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 text-lg font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
              {showProducts && (
                <>
                  <div className="absolute bottom-full mb-1 left-0 right-0 bg-gray-100 border border-gray-200 rounded-md shadow-xl max-h-72 overflow-y-auto flex flex-col-reverse z-[100]">
                    {filteredProducts.map((product) => {
                      const selected = selectedProducts.some(
                        (p) => p.id === product.id,
                      );

                      return (
                        <div
                          key={product.id}
                          onClick={() => {
                            addProductToOrder(product);
                            setShowProducts(false);
                          }}
                          className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b border-gray-200 transition gap-8

              ${selected ? "bg-blue-50" : "hover:bg-gray-50"}

              ${product.stock === 0 && "opacity-50 cursor-not-allowed"}
            `}
                        >
                          <div>
                            <div className="flex items-center gap-2 w-3/5 text-right">
                              {selected && (
                                <span className="text-green-600 font-bold">
                                  ✔
                                </span>
                              )}

                              <span className="font-medium text-sm  ">
                                {product.name}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-8 text-sm text-right w-1/2">
                            <span
                              className={
                                product.stock
                                  ? "text-green-500"
                                  : "text-red-600"
                              }
                            >
                              {product.stock
                                ? `موجودی : ${product.stock}`
                                : "ناموجود"}
                            </span>

                            <span className="font-medium text-sm w-1/2 text-left">
                              {product.price.toLocaleString()} تومان
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <div className="space-y-3">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-md p-3"
                >
                  <div className=" font-medium w-[45%] ">{product.name}</div>

                  <div className="flex items-center gap-2 ">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="w-8 h-8 rounded border border-gray-200 shadow-xs hover:bg-gray-100 cursor-pointer "
                    >
                      -
                    </button>

                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        setSelectedProducts(
                          selectedProducts.map((p) =>
                            p.id === product.id
                              ? {
                                  ...p,
                                  quantity: Number(e.target.value),
                                }
                              : p,
                          ),
                        )
                      }
                      className="w-14 text-center border rounded h-8 border-gray-200 shadow-xs"
                    />

                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className="w-8 h-8 rounded border hover:bg-gray-100 cursor-pointer border-gray-200 shadow-xs"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-sm">
                    {(product.price * product.quantity).toLocaleString()} تومان
                  </div>

                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 border-t pt-4">
              <p className="font-medium">مبلغ کل</p>

              <div className="text-lg font-bold text-green-600">
                {orderAmount.toLocaleString()} تومان
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-3 border-t pt-4">
              <button
                className="px-6 py-2 bg-transparent rounded-md cursor-pointer hover:text-red-500 text-gray-400"
                onClick={() => setIsOpenModalAddOrder(false)}
              >
                انصراف
              </button>

              <Button
                className="px-6 py-2 bg-primary text-white"
                onClick={handleAddOrder}
              >
                ثبت سفارش
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

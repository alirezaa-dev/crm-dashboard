import Button from "../../ui/Button";
import React, { useState, useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { CustomerContext } from "../../../context/CustomerContext";
import { ProductContext } from "../../../context/ProductContext";
import OrdersTable from "./components/OrdersTable";
import AddOrderModal from "./components/AddOrderModal";
import useOrderForm from "./hooks/useOrderForm";
import EditOrderModal from "./components/EditOrderModal"

export default function Orders() {
  const { orders, setOrders } = useContext(OrderContext);
  const { customers } = useContext(CustomerContext);
  const { products } = useContext(ProductContext);
  const {
    customerSearch,
    setCustomerSearch,
    customerId,
    setCustomerId,
    showCustomers,
    setShowCustomers,

    productSearch,
    setProductSearch,
    showProducts,
    setShowProducts,

    selectedProducts,
    setSelectedProducts,

    filteredCustomers,
  } = useOrderForm(products, customers);
  const handleViewOrder = (order) => {
    console.log(order);
  };

  const updateQuantity = (id, quantity) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id ? { ...product, quantity } : product,
      ),
    );
  };
  const handleUpdateOrder = () => {
    const updatedOrders = orders.map((order) =>
      order.id === selectedOrderId
        ? {
            ...order,
            customerId,
            items: selectedProducts,
            orderAmount,
          }
        : order,
    );

    setOrders(updatedOrders);

    setIsOpenModalEditOrder(false);
  };
  const handleEditOrder = (order) => {
    setSelectedOrderId(order.id);

    setCustomerId(order.customerId);
    setCustomerSearch(
      customers.find((c) => c.id === order.customerId)?.name || "",
    );

    const formattedItems = order.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      return {
        id: product?.id,
        name: product?.name,
        price: item.productPrice,
        quantity: item.quantity,
      };
    });

    setSelectedProducts(formattedItems);

    setIsOpenModalEditOrder(true);
  };
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
  const resetForm = () => {
    setCustomerSearch("");
    setCustomerId(null);
    setProductSearch("");
    setSelectedProducts([]);
    setShowCustomers(false);
    setShowProducts(false);
    setIsOpenModalAddOrder(false);
  };
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
    resetForm();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h2>سفارشات</h2>

        <Button
          className="p-2 border rounded-sm mx-1 border-gray-300"
          onClick={() => {
            setIsOpenModalAddOrder(true);
          }}
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
      <OrdersTable
        orders={filteredOrders}
        customers={customers}
        onView={handleViewOrder}
        onEdit={handleEditOrder}
      />

      {/* Add Order Modal */}
      <AddOrderModal
        isOpen={isOpenModalAddOrder}
        onClose={() => {
          setIsOpenModalAddOrder(false);
        }}
        handleAddOrder={handleAddOrder}
        customerSearch={customerSearch}
        setCustomerSearch={setCustomerSearch}
        customerId={customerId}
        setCustomerId={setCustomerId}
        showCustomers={showCustomers}
        setShowCustomers={setShowCustomers}
        filteredCustomers={filteredCustomers}
        productSearch={productSearch}
        setProductSearch={setProductSearch}
        showProducts={showProducts}
        setShowProducts={setShowProducts}
        filteredProducts={filteredProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        addProductToOrder={addProductToOrder}
        removeProduct={removeProduct}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        updateQuantity={updateQuantity}
        orderAmount={orderAmount}
      />
      {/* Add Order Modal */}
      <EditOrderModal
        isOpen={isOpenModalEditOrder}
        onClose={() => {
          setIsOpenModalEditOrder(false);
        }}
        handleEditOrder={handleEditOrder}
        customerSearch={customerSearch}
        setCustomerSearch={setCustomerSearch}
        customerId={customerId}
        setCustomerId={setCustomerId}
        showCustomers={showCustomers}
        setShowCustomers={setShowCustomers}
        filteredCustomers={filteredCustomers}
        productSearch={productSearch}
        setProductSearch={setProductSearch}
        showProducts={showProducts}
        setShowProducts={setShowProducts}
        filteredProducts={filteredProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        addProductToOrder={addProductToOrder}
        removeProduct={removeProduct}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        updateQuantity={updateQuantity}
        orderAmount={orderAmount}
      />
    </>
  );
}

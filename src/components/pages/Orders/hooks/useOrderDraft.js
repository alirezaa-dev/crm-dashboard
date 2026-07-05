import { useState } from "react";
import { DELIVERY_METHOD } from "../../../../constants/deliveryMethod";

export default function useOrderDraft() {
  const [orderDraft, setOrderDraft] = useState({
    customerId: null,
    customerSearch: "",
    productSearch: "",
    selectedProducts: [],
    deliveryMethod: DELIVERY_METHOD.PICKUP,
    showCustomers: false,
    showProducts: false,
  });

  const updateDraft = (key, value) => {
    setOrderDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetDraft = () => {
    setOrderDraft({
      customerId: null,
      customerSearch: "",
      productSearch: "",
      selectedProducts: [],
      deliveryMethod: DELIVERY_METHOD.PICKUP,
      showCustomers: false,
      showProducts: false,
    });
  };

  const setDraft = (data) => {
    setOrderDraft(data);
  };

  // =========================
  // Product Logic
  // =========================
  const addProduct = (product) => {
    const exists = orderDraft.selectedProducts.find(
      (p) => p.id === product.id
    );

    if (exists) return;

    updateDraft("selectedProducts", [
      ...orderDraft.selectedProducts,
      { ...product, quantity: 1 },
    ]);
  };

  const removeProduct = (id) => {
    updateDraft(
      "selectedProducts",
      orderDraft.selectedProducts.filter((p) => p.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    updateDraft(
      "selectedProducts",
      orderDraft.selectedProducts.map((p) =>
        p.id === id ? { ...p, quantity } : p
      )
    );
  };

  const increaseQuantity = (id) => {
    updateDraft(
      "selectedProducts",
      orderDraft.selectedProducts.map((p) =>
        p.id === id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const decreaseQuantity = (id) => {
    updateDraft(
      "selectedProducts",
      orderDraft.selectedProducts.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: Math.max(1, p.quantity - 1),
            }
          : p
      )
    );
  };

  return {
    orderDraft,
    updateDraft,
    resetDraft,
    setDraft,

    addProduct,
    removeProduct,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
  };
}
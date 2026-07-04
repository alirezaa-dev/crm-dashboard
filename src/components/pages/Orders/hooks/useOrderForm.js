import { useState } from "react";

export default function useOrderForm(products, customers) {
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [showCustomers, setShowCustomers] = useState(false);

  const [productSearch, setProductSearch] = useState("");
  const [showProducts, setShowProducts] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const filteredCustomers = customers.filter((customer) => {
  const search = customerSearch.trim().toLowerCase();

  return (
    customer.name.toLowerCase().includes(search) ||
    customer.phone.includes(search)
  );
});

  return {
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
  };
}
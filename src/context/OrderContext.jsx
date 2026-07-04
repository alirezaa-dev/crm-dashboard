import { createContext, useState } from "react";

export const OrderContext = createContext();
export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "4000",
      customerId: 1,
      items: [
        {
          productId: 1,

          quantity: 2,
          productPrice: 189000,
          totalPrice: 378000,
        },
        {
          productId: 3,
          quantity: 1,
          productPrice: 145000,
          totalPrice: 145000,
        },
      ],
      orderStatus: 0,
      orderAmount: 899000,
      orderDate: "1405/04/08",
    },
  ]);
  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

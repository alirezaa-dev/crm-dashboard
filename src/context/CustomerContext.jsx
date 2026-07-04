import { createContext, useState } from "react";

export const CustomerContext = createContext();
export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "علیرضا دهقان بنادکی",
      phone: "09365534123",
      score: 120,
      joinDate: "۱۴۰۵/۰۳/۲۰",
    },
    {
      id: 2,
      name: "مریم احمدی",
      phone: "09123456789",
      score: 80,
      joinDate: "۱۴۰۵/۰۳/۱۵",
    },
  ]);
  return (
    <CustomerContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
}

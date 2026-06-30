import { createContext, useState } from "react";

export const BrandContext = createContext();
export function BrandProvider({ children }) {
  const [brands, setBrands] = useState([
    {
      id: 1,
      title: "شون",
      enTitle: "Schon",
    },
    {
      id: 2,
      title: "لافارر",
      enTitle: "La Farrerr",
    },
    {
      id: 3,
      title: "ویتالیر",
      enTitle: "Vitalayer",
    },
  ]);
  return (
    <BrandContext.Provider value={{ brands, setBrands }}>
      {children}
    </BrandContext.Provider>
  );
}

import { createContext, useState } from "react";

export const ProductContext = createContext();
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "شامپو بدن شون مدل Strawberry And Milk",
      sku: "P001",
      price: 189000,
      stock: 25,
      isActive: true,
      categoryId: 5,
      brandId: 1,
      
    },
    {
      id: 2,
      name: "کرم مرطوب‌کننده ویتالیر مدل امونیوم لاکتات",
      sku: "P002",
      price: 250000,
      stock: 12,
      isActive: true,
      categoryId: 4,
      brandId: 3,
    },
    {
      id: 3,
      name: "ژل شستشو صورت لافارر مناسب پوست چرب و مستعد آکنه مدل لایه بردار شماره 1",
      sku: "P003",
      price: 145000,
      stock: 0,
      isActive: false,
      categoryId: 3,
      brandId: 2,
    },
  ]);
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

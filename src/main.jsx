import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { BrandProvider } from "./context/BrandContext.jsx";
import { CustomerProvider } from "./context/CustomerContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <OrderProvider>
      <CustomerProvider>
        <CategoryProvider>
          <BrandProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </BrandProvider>
        </CategoryProvider>
      </CustomerProvider>
    </OrderProvider>
  </BrowserRouter>,
);

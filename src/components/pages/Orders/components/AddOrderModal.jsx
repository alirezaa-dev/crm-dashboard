import Button from "../../../ui/Button";
import CustomerSelector from "./OrderModalComponents/CustomerSelector";
import ProductSelector from "./OrderModalComponents/ProductSelector";
import SelectedProducts from "./OrderModalComponents/SelectedProducts";
import OrderSummary from "./OrderModalComponents/OrderAddSummary";
import OrderAddSummary from "./OrderModalComponents/OrderAddSummary";
import DeliveryMethodSelector from "./OrderModalComponents/DeliveryMethodSelector";
export default function AddOrderModal({
  isOpen,
  onClose,
  handleAddOrder,

  customerSearch,
  setCustomerSearch,
  customerId,
  setCustomerId,
  showCustomers,
  setShowCustomers,
  filteredCustomers,

  productSearch,
  setProductSearch,
  showProducts,
  setShowProducts,
  filteredProducts,

  selectedProducts,
  setSelectedProducts,

  addProductToOrder,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,

  orderAmount,
  deliveryMethod,
  setDeliveryMethod,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[700px] p-6 max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-6">ثبت سفارش جدید</h2>

        {/*  Select Customer */}
        <CustomerSelector
          customerSearch={customerSearch}
          setCustomerSearch={setCustomerSearch}
          setCustomerId={setCustomerId}
          showCustomers={showCustomers}
          setShowCustomers={setShowCustomers}
          filteredCustomers={filteredCustomers}
        />
        {/* Select Products */}

        <ProductSelector
          productSearch={productSearch}
          setProductSearch={setProductSearch}
          showProducts={showProducts}
          setShowProducts={setShowProducts}
          filteredProducts={filteredProducts}
          selectedProducts={selectedProducts}
          addProductToOrder={addProductToOrder}
          setShowCustomers={setShowCustomers}
        />

        {/* Selected Products */}
        <SelectedProducts
          selectedProducts={selectedProducts}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeProduct={removeProduct}
          updateQuantity={updateQuantity}
        />
        {/* Delivery MOthod */}
        <DeliveryMethodSelector
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
        />
        {/* Order Summary */}
        <OrderAddSummary
          orderAmount={orderAmount}
          onClose={onClose}
          handleAddOrder={handleAddOrder}
        />
      </div>
    </div>
  );
}

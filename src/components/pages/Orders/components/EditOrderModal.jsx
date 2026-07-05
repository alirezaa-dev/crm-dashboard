import CustomerSelector from "./OrderModalComponents/CustomerSelector";
import ProductSelector from "./OrderModalComponents/ProductSelector";
import SelectedProducts from "./OrderModalComponents/SelectedProducts";
import OrderEditSummary from "./OrderModalComponents/OrderEditSummary";
import DeliveryMethodSelector from "./OrderModalComponents/DeliveryMethodSelector";

export default function EditOrderModal({
  isOpen,
  onClose,
  handleUpdateOrder,

  orderDraft,
  updateDraft,

  filteredCustomers,
  filteredProducts,

  addProductToOrder,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,

  orderAmount,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[700px] p-6 max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-6">ویرایش سفارش</h2>

        {/* Select Customer */}
        <CustomerSelector
          customerSearch={orderDraft.customerSearch}
          setCustomerSearch={(value) => updateDraft("customerSearch", value)}
          customerId={orderDraft.customerId}
          setCustomerId={(value) => updateDraft("customerId", value)}
          showCustomers={orderDraft.showCustomers}
          setShowCustomers={(value) => updateDraft("showCustomers", value)}
          filteredCustomers={filteredCustomers}
        />

        {/* Select Products */}
        <ProductSelector
          productSearch={orderDraft.productSearch}
          setProductSearch={(value) => updateDraft("productSearch", value)}
          showProducts={orderDraft.showProducts}
          setShowProducts={(value) => updateDraft("showProducts", value)}
          filteredProducts={filteredProducts}
          selectedProducts={orderDraft.selectedProducts}
          addProductToOrder={addProductToOrder}
          setShowCustomers={(value) => updateDraft("showCustomers", value)}
        />

        {/* Selected Products */}
        <SelectedProducts
          selectedProducts={orderDraft.selectedProducts}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeProduct={removeProduct}
          updateQuantity={updateQuantity}
        />

        {/* Delivery Method */}
        <DeliveryMethodSelector
          deliveryMethod={orderDraft.deliveryMethod}
          setDeliveryMethod={(value) => updateDraft("deliveryMethod", value)}
        />

        {/* Order Summary */}
        <OrderEditSummary
          orderAmount={orderAmount}
          onClose={onClose}
          handleUpdateOrder={handleUpdateOrder}
        />
      </div>
    </div>
  );
}

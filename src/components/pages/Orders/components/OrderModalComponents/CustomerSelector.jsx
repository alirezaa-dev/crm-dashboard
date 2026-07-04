export default function CustomerSelector({
  customerSearch,
  setCustomerSearch,
  setCustomerId,
  showCustomers,
  setShowCustomers,
  filteredCustomers,
}) {
  return (
    <div className="mb-5 relative">
      <label className="block mb-2 text-sm font-medium">مشتری</label>

      <div className="relative">
        <input
          type="text"
          placeholder="نام یا شماره موبایل مشتری..."
          value={customerSearch}
          onChange={(e) => {
            setCustomerSearch(e.target.value);
            setShowCustomers(true);
          }}
          onFocus={() => setShowCustomers(true)}
          className="w-full border rounded-md p-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {showCustomers && (
          <button
            type="button"
            onClick={() => setShowCustomers(false)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {showCustomers && customerSearch && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-50 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-[100]">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => {
                  setCustomerId(customer.id);
                  setCustomerSearch(customer.name);
                  setShowCustomers(false);
                }}
                className="flex flex-row px-4 py-3 cursor-pointer hover:bg-blue-100 justify-between"
              >
                <p className="font-medium text-sm">{customer.name}</p>

                <p className="text-sm text-gray-500">{customer.phone}</p>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">
              مشتری پیدا نشد.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
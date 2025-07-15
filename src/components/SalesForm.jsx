import Header from "./Header";

const SalesForm = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto border rounded-lg shadow-sm p-6 bg-white">
          <h2 className="text-2xl text-center mb-6 font-bold text-[#EB1414]">
            Sales Form
          </h2>

          <form className="space-y-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="productName"
                className="block font-medium mb-1"
              >
                Product Name
              </label>
              <input
                id="productName"
                placeholder="Enter product name"
                className="w-full px-4 py-2 border rounded-md text-sm"
              />
            </div>

            {/* Sold By User */}
            <div>
              <label
                htmlFor="soldByUser"
                className="block font-medium mb-1"
              >
                Sold by User
              </label>
              <select
                id="soldByUser"
                className="w-full px-4 py-2 border rounded-md text-sm"
              >
                <option value="">Select user</option>
                <option value="aryan">Aryan</option>
                <option value="ronak">Ronak</option>
                <option value="anshu">Anshu</option>
              </select>
            </div>

            {/* Sold At Price */}
            <div>
              <label
                htmlFor="soldAtPrice"
                className="block font-medium mb-1"
              >
                Sold at Price (₹)
              </label>
              <input
                id="soldAtPrice"
                type="number"
                placeholder="Enter selling price"
                className="w-full px-4 py-2 border rounded-md text-sm"
              />
            </div>

            {/* Payment Received */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="paymentReceived"
                className="w-4 h-4 border rounded"
              />
              <label
                htmlFor="paymentReceived"
                className="text-sm"
              >
                Payment Received
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-[#EB1414] text-white py-2 rounded-md hover:bg-[#c11111] transition-colors"
            >
              Record Sale
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SalesForm;

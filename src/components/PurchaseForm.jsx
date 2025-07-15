import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";

const PurchaseForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (!isToken) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto border rounded-lg shadow-sm p-6 bg-white">
          <h2 className="text-2xl text-center mb-6 font-bold text-[#EB1414]">
            Purchase Form
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

            {/* Purchased By User */}
            <div>
              <label
                htmlFor="purchasedByUser"
                className="block font-medium mb-1"
              >
                Purchased by User
              </label>
              <select
                id="purchasedByUser"
                className="w-full px-4 py-2 border rounded-md text-sm"
              >
                <option value="">Select user</option>
                <option value="aryan">Aryan</option>
                <option value="ronak">Ronak</option>
                <option value="anshu">Anshu</option>
              </select>
            </div>

            {/* Purchase Price */}
            <div>
              <label
                htmlFor="purchasePrice"
                className="block font-medium mb-1"
              >
                Purchase Price (₹)
              </label>
              <input
                id="purchasePrice"
                type="number"
                placeholder="Enter purchase price"
                className="w-full px-4 py-2 border rounded-md text-sm"
              />
            </div>

            {/* Supplier */}
            <div>
              <label
                htmlFor="supplier"
                className="block font-medium mb-1"
              >
                Supplier
              </label>
              <input
                id="supplier"
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-md text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-[#EB1414] text-white py-2 rounded-md hover:bg-[#c11111] transition-colors"
            >
              Record Purchase
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PurchaseForm;

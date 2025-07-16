import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../constant";
import { IndianRupee } from "lucide-react";

const PurchaseForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [productsCategoryArr, setProductsCategoryArr] = useState([]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const selectedCategory = watch("productCategory");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product/getAll`);
        console.log(response.data.productData);
        const uniqueCategories = [
          ...new Set(
            response.data.productData.map((item) => item.product_category)
          ),
        ];
        setProductsCategoryArr(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (!isToken) {
      navigate("/login");
    }
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (selectedCategory == "addNew") {
      data.productCategory = data.addNewCategory;
    }
    try {
      const response = await axios.post(`${baseUrl}/product/purchaseData`, {
        data,
      });
      if (response.data.status == 200) {
        alert("Record added!");
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 font-head">
        <div className="max-w-2xl mx-auto border rounded-lg shadow-sm p-6 bg-white">
          <h2 className="text-2xl text-center mb-6 font-bold text-[#EB1414]">
            Purchase Form
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Product Name */}
            <div className="space-y-1">
              <label
                htmlFor="productName"
                className="block font-medium text-sm"
              >
                Product Name
              </label>
              <input
                id="productName"
                placeholder="Enter product name"
                {...register("productName", {
                  required: "Enter the product name",
                })}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#EB1414] ${
                  errors.productName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.productName && (
                <p className="text-sm text-red-600">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Product Category */}
            <div className="space-y-1">
              <label
                htmlFor="productCategory"
                className="block font-medium text-sm"
              >
                Product Category
              </label>

              <div className="relative">
                <select
                  id="productCategory"
                  {...register("productCategory", {
                    required: "Select the Category",
                  })}
                  className={`w-full appearance-none px-4 py-2 pr-10 rounded-md border text-sm text-gray-800 shadow-sm bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-[#EB1414] focus:border-[#EB1414]  ${
                    errors.productCategory
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Category</option>
                  {productsCategoryArr.map((item) => {
                    return (
                      <option
                        value={item}
                        key={item}
                      >
                        {item}
                      </option>
                    );
                  })}
                  <option value="addNew">Add New Category</option>
                </select>

                {/* Custom dropdown icon */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {errors.productCategory && (
                <p className="text-sm text-red-600">
                  {errors.productCategory.message}
                </p>
              )}
            </div>

            {/* Add new category */}
            {selectedCategory == "addNew" && (
              <div className="space-y-1">
                <label
                  htmlFor="addNewCategory"
                  className="block font-medium text-sm"
                >
                  Add New Category
                </label>
                <input
                  id="addNewCategory"
                  placeholder="Enter Category name"
                  {...register("addNewCategory", {
                    required: "Enter the Category",
                  })}
                  className={`w-full px-4 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#EB1414] ${
                    errors.addNewCategory ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.addNewCategory && (
                  <p className="text-sm text-red-600">
                    {errors.addNewCategory.message}
                  </p>
                )}
              </div>
            )}

            {/* Purchased By User */}
            <div className="space-y-1">
              <label
                htmlFor="purchasedByUser"
                className="block font-medium text-sm"
              >
                Purchased by User
              </label>
              <select
                id="purchasedByUser"
                {...register("purchasedByUser", {
                  required: "Select a user",
                })}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#EB1414] ${
                  errors.purchasedByUser ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select user</option>
                <option value="aryan">Aryan</option>
                <option value="ronak">Ronak</option>
                <option value="anshu">Anshu</option>
              </select>
              {errors.purchasedByUser && (
                <p className="text-sm text-red-600">
                  {errors.purchasedByUser.message}
                </p>
              )}
            </div>

            {/* Purchase Price */}
            <div className="space-y-1">
              <label
                htmlFor="purchasePrice"
                className="block font-medium text-sm"
              >
                Purchase Price (₹)
              </label>
              <div className="flex items-center relative">
                <IndianRupee className="w-5 h-5 absolute left-2 text-gray-500" />
                <input
                  id="purchasePrice"
                  type="number"
                  placeholder="Enter purchase price"
                  {...register("purchasePrice", {
                    required: "Enter the price",
                    min: {
                      value: 1,
                      message: "Price must be at least ₹1",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md text-sm pl-8 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB1414] ${
                    errors.purchasePrice ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.purchasePrice && (
                <p className="text-sm text-red-600">
                  {errors.purchasePrice.message}
                </p>
              )}
            </div>

            {/* Supplier */}
            <div className="space-y-1">
              <label
                htmlFor="supplier"
                className="block font-medium text-sm"
              >
                Supplier
              </label>
              <input
                id="supplier"
                placeholder="Enter supplier name"
                {...register("supplier", {
                  required: "Enter supplier name",
                })}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#EB1414] ${
                  errors.supplier ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.supplier && (
                <p className="text-sm text-red-600">
                  {errors.supplier.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || productsCategoryArr.length === 0}
              className="w-full bg-[#EB1414] text-white py-2 rounded-md hover:bg-[#c11111] transition-colors"
            >
              {isLoading ? "Processing..." : "Record Purchase"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PurchaseForm;

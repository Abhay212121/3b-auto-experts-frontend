import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../constant";
import { IndianRupee } from "lucide-react";

const SalesForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [productsNameArr, setProductsNameArr] = useState([]);
  const [productsCategoryArr, setProductsCategoryArr] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const selectedCategory = watch("productCategory");
  const filteredProducts = selectedCategory
    ? productsNameArr.filter(
        (item) => item.product_category === selectedCategory
      )
    : productsNameArr;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/product/saledata`, {
        data,
      });
      if (response.data.status == 200) {
        alert("Done!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product/getAll`);
        console.log(response.data.productData);
        setProductsNameArr(response.data.productData);
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

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto border rounded-lg shadow-sm p-6 bg-white">
          <h2 className="text-2xl text-center mb-6 font-bold text-[#EB1414]">
            Sales Form
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
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
                        onClick={() => handleCategoryClick(item)}
                      >
                        {item}
                      </option>
                    );
                  })}
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

            {/* Product Name */}
            <div className="space-y-1">
              <label
                htmlFor="productName"
                className="block font-medium text-sm"
              >
                Product Name
              </label>

              <div className="relative ">
                <select
                  id="productName"
                  {...register("productName", {
                    required: "Select the product",
                  })}
                  className={`w-full appearance-none px-4 py-2 pr-10 rounded-md border text-sm text-gray-800 shadow-sm bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-[#EB1414] focus:border-[#EB1414] overflow-visible ${
                    errors.productName ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Product</option>
                  {filteredProducts.map((product) => (
                    <option
                      key={product.product_name}
                      value={product.product_name}
                    >
                      {product.product_name}
                    </option>
                  ))}
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

              {errors.productName && (
                <p className="text-sm text-red-600">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Sold At Price (₹) */}
            <div className="space-y-1">
              <label
                htmlFor="soldAtPrice"
                className="block font-medium text-sm"
              >
                Sold at Price (₹)
              </label>

              <div className="flex items-center relative">
                <IndianRupee className="w-5 h-5 absolute left-2 text-gray-500" />
                <input
                  id="soldAtPrice"
                  type="number"
                  placeholder="Enter selling price"
                  {...register("soldAtPrice", {
                    required: "Selling price is required",
                    min: {
                      value: 1,
                      message: "Price must be at least ₹1",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md text-sm pl-8 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB1414] focus:border-[#EB1414] ${
                    errors.soldAtPrice ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              {errors.soldAtPrice && (
                <p className="text-sm text-red-600">
                  {errors.soldAtPrice.message}
                </p>
              )}
            </div>

            {/* Sold By User */}
            <div className="space-y-1">
              <label
                htmlFor="soldByUser"
                className="block font-medium text-sm"
              >
                Sold by User
              </label>

              <div className="relative">
                <select
                  id="soldByUser"
                  {...register("soldByUser", {
                    required: "Select a user",
                  })}
                  className={`w-full appearance-none px-4 py-2 pr-10 rounded-md border text-sm text-gray-800 shadow-sm bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-[#EB1414] focus:border-[#EB1414] ${
                    errors.soldByUser ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select user</option>
                  <option value="aryan">Aryan</option>
                  <option value="ronak">Ronak</option>
                  <option value="anshu">Anshu</option>
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

              {errors.soldByUser && (
                <p className="text-sm text-red-600">
                  {errors.soldByUser.message}
                </p>
              )}
            </div>

            {/* Sold to Car */}
            <div className="space-y-1">
              <label
                htmlFor="soldForCar"
                className="block font-medium text-sm"
              >
                Sold to Car
              </label>

              <input
                id="soldForCar"
                type="text"
                placeholder="Enter the car name"
                {...register("soldForCar", {
                  required: "Car name is required",
                  pattern: {
                    value: /^[a-zA-Z0-9 @#]+$/,
                    message:
                      "Only letters, numbers, spaces, @ and # are allowed",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#EB1414] focus:border-[#EB1414] ${
                  errors.soldForCar ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.soldForCar && (
                <p className="text-sm text-red-600">
                  {errors.soldForCar.message}
                </p>
              )}
            </div>

            {/* Sold on Date */}
            <div className="space-y-1">
              <label
                htmlFor="soldOnDate"
                className="block font-medium text-sm"
              >
                Sold on Date
              </label>

              <input
                id="soldOnDate"
                type="date"
                {...register("soldOnDate", {
                  required: "Date is required",
                })}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#EB1414] focus:border-[#EB1414] ${
                  errors.soldOnDate ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.soldOnDate && (
                <p className="text-sm text-red-600">
                  {errors.soldOnDate.message}
                </p>
              )}
            </div>

            {/* Payment Status */}
            <div className="space-y-1">
              <label className="block font-medium text-sm mb-1">
                Payment Status
              </label>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    value="pending"
                    {...register("paymentStatus", {
                      required: "Please select a payment status",
                    })}
                    className="w-4 h-4 text-[#EB1414] focus:ring-[#EB1414]"
                  />
                  Pending
                </label>

                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    value="completed"
                    {...register("paymentStatus", {
                      required: "Please select a payment status",
                    })}
                    className="w-4 h-4 text-[#EB1414] focus:ring-[#EB1414]"
                  />
                  Completed
                </label>
              </div>

              {errors.paymentStatus && (
                <p className="text-sm text-red-600">
                  {errors.paymentStatus.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={productsNameArr.length === 0 || isLoading}
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

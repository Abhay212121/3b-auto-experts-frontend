import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import { baseUrl } from "../constant";

const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Add attempt:", data);
      const response = await axios.post(`${baseUrl}/product/addnew`, {
        productData: data,
      });
      if (response.data.status == 200) {
        alert("product added!");
        reset();
      }
    } catch (error) {
      console.log("Err:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-150 bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#EB1414] mb-2">
              3B AutoXperts
            </h1>
            <p className="text-[#555]">Add new products</p>
          </div>

          <div className="border rounded-lg border-gray-400 shadow-sm bg-white">
            <div className="px-6 pt-4">
              <h2 className="text-center text-[#EB1414] font-semibold text-2xl">
                Add
              </h2>
            </div>
            <div className="px-6 py-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label
                    htmlFor="productName"
                    className="text-sm font-medium"
                  >
                    Product Name
                  </label>
                  <input
                    id="productName"
                    type="productName"
                    placeholder="Enter product name"
                    {...register("productName", {
                      required: "name is required",
                      pattern: {
                        value: /^[a-zA-Z0-9 @#]+$/,
                        message: "Special Character Not allowed",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.productName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.productName && (
                    <p className="text-sm text-red-600">
                      {errors.productName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="productCategory"
                    className="text-sm font-medium"
                  >
                    Product Category
                  </label>

                  <div className="relative">
                    <select
                      id="productCategory"
                      {...register("productCategory", {
                        required: "Category is required",
                        pattern: {
                          value: /^[a-zA-Z0-9 @#]+$/,
                          message: "Special Character Not allowed",
                        },
                      })}
                      className={`w-full appearance-none px-4 py-2 pr-10 rounded-md border shadow-sm text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#EB1414] focus:border-[#EB1414] bg-gray-100 ${
                        errors.productCategory
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="LED">LED</option>
                      <option value="Projectors">Projectors</option>
                      <option value="Mats">Mats</option>
                      <option value="Infotainment">Infotainment</option>
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

                <div className="space-y-1">
                  <label
                    htmlFor="price"
                    className="text-sm font-medium"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    placeholder="Enter product's price"
                    {...register("price", {
                      required: "price is required",
                    })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#EB1414] text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  {isLoading ? "Adding..." : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;

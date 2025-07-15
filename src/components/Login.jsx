import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constant";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Login attempt:", data);
      const response = await axios.post(`${baseUrl}/user/login`, {
        userData: data,
      });
      if (response.data.status == 200) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setValidationError(response.data.msg);
      }
    } catch (error) {
      console.log("Err:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#EB1414] mb-2">
            3B Autoxperts
          </h1>
          <p className="text-[#555]">Please sign in to your account</p>
        </div>

        <div className="border rounded-lg border-gray-400 shadow-sm bg-white">
          <div className="px-6 pt-4">
            <h2 className="text-center text-[#EB1414] font-semibold text-2xl">
              Login
            </h2>
          </div>
          <div className="px-6 py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {validationError && (
                <p className="text-sm text-red-600 text-center">
                  {validationError}
                </p>
              )}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#EB1414] text-white py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

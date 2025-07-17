import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constant";

export const Home = () => {
  const navigate = useNavigate();
  const [totalProfit, setTotalProfit] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [successfullTransactionsCount, setSuccessfullTransactionsCount] =
    useState(0);
  const [pendingTransactionsCount, setPendingTransactionsCount] = useState(0);
  const [receivedSales, setReceivedSales] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/home`);
      setReceivedSales(response.data.data.receivedSum);
      setTotalSales(response.data.data.totalSum);
      setTotalProfit(response.data.data.totalProfit);
      setProfitPercentage(response.data.data.profitPercentage);
      setSuccessfullTransactionsCount(
        response.data.data.successfulTransactions
      );
      setPendingTransactionsCount(response.data.data.pendingTransactions);
      console.log(response);
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
      <div className="md:px-20 my-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#EB1414] mb-2">
            3B AutoXperts
          </h1>
          <p className="text-[#6e6e6e] text-lg">Business Dashboard</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Sales */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-black shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">Total Sales</p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold ">
                {totalSales.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
            </div>
          </div>

          {/* Completed Sales */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-black shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">
                Completed Sales
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-green-600">
                {receivedSales.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
            </div>
          </div>

          {/* Total Purchases */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-black shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">
                Pending amount
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-red-500">
                {" "}
                {(receivedSales - totalSales).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
            </div>
          </div>

          {/* Total Profit */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-black shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">Total Profit</p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-green-600">
                {" "}
                {totalProfit.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
            </div>
          </div>
          {/*Profit %*/}
          <div className="rounded-lg border border-[#EB1414] bg-white text-green-600 shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">
                Profit percentage
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">
                {profitPercentage.toFixed(2)}%
              </div>
            </div>
          </div>
          {/* Successfull Transactions */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-green-600 shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">
                Successfull Transactions
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-green-600">
                {successfullTransactionsCount}
              </div>
            </div>
          </div>

          {/* Incomplete Transactions */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-black shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">
                Pending Transactions
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-[#EB1414]">
                {pendingTransactionsCount}
              </div>
            </div>
          </div>

          {/* Purchase data */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-black shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">Purchase</p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-[#EB1414]">0</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

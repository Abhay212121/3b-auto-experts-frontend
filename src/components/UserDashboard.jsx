import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { baseUrl } from "../constant";

const UserDashboard = ({ userName }) => {
  const [totalSales, setTotalSales] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [successfullTransactionsCount, setSuccessfullTransactionsCount] =
    useState(0);
  const [pendingTransactionsCount, setPendingTransactionsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/getData`, {
          params: {
            name: userName,
          },
        });

        console.log("API Response:", response);

        const data = response?.data?.data;
        if (!data) {
          console.warn("No data found in response:", response.data);
          return;
        }

        setTotalSales(response.data.data.totalSum);
        setTotalProfit(response.data.data.totalProfit);
        setProfitPercentage(response.data.data.profitPercentage);
        setSuccessfullTransactionsCount(
          response.data.data.successfulTransactions
        );
        setReceivedAmount(response.data.data.receivedSum);

        setPendingTransactionsCount(response.data.data.pendingTransactions);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userName) {
      fetchData();
    }
  }, [userName]);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 md:px-20">
        <h1 className="text-3xl font-bold text-[#EB1414] mb-8 text-center">
          {userName}'s Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Sales",
              value: `₹${totalSales.toLocaleString("en-IN")}`,
            },
            {
              label: "Completed Sales",
              value: `₹${receivedAmount.toLocaleString("en-IN")}`,
              className: "text-green-600",
            },
            {
              label: "Pending Amount",
              value: `₹${(receivedAmount - totalSales).toLocaleString(
                "en-IN"
              )}`,
              className: "text-red-600",
            },
            {
              label: "Total Profit",
              value: `₹${totalProfit.toLocaleString("en-IN")}`,
              className: "text-green-600",
            },
            {
              label: "Profit Percentage",
              value: `${profitPercentage.toFixed(2)}%`,
              className: "text-green-600",
            },
            {
              label: "Successfull Transactions",
              value: `${successfullTransactionsCount}`,
              className: "text-green-600",
            },
            {
              label: "Pending Transactions",
              value: `${pendingTransactionsCount}`,
              className: "text-red-600",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-lg border shadow-sm p-4 bg-white"
            >
              <p className="text-sm text-gray-500 mb-1">{item.label}</p>
              <div
                className={`text-2xl font-bold ${item.className || ""}`}
                style={{ color: item.color }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Table */}
          {/* <div className="border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold text-[#EB1414] p-4 border-b">
              Recent Sales
            </h2>
            <div className="p-4">
              {sales.length > 0 ? (
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Product</th>
                      <th>Price</th>
                      <th>Payment</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.slice(0, 5).map((sale) => (
                      <tr
                        key={sale.id}
                        className="border-b"
                      >
                        <td className="py-2">{sale.productName}</td>
                        <td>
                          ₹
                          {parseFloat(sale.soldAtPrice).toLocaleString("en-IN")}
                        </td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              sale.paymentReceived
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {sale.paymentReceived ? "Received" : "Pending"}
                          </span>
                        </td>
                        <td>{formatDate(sale.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No sales recorded yet
                </p>
              )}
            </div>
          </div> */}

          {/* Purchases Table */}
          {/* <div className="border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold text-[#EB1414] p-4 border-b">
              Recent Purchases
            </h2>
            <div className="p-4">
              {purchases.length > 0 ? (
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Product</th>
                      <th>Price</th>
                      <th>Supplier</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.slice(0, 5).map((purchase) => (
                      <tr
                        key={purchase.id}
                        className="border-b"
                      >
                        <td className="py-2">{purchase.productName}</td>
                        <td>
                          ₹
                          {parseFloat(purchase.purchasePrice).toLocaleString(
                            "en-IN"
                          )}
                        </td>
                        <td>{purchase.supplier}</td>
                        <td>{formatDate(purchase.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No purchases recorded yet
                </p>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

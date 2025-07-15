import { useEffect, useState } from "react";
import Header from "./Header";

const UserDashboard = ({ userName }) => {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const salesData = JSON.parse(localStorage.getItem("salesData") || "[]");
    const purchaseData = JSON.parse(
      localStorage.getItem("purchaseData") || "[]"
    );

    const userSales = salesData.filter(
      (sale) => sale.soldByUser === userName.toLowerCase()
    );
    const userPurchases = purchaseData.filter(
      (purchase) => purchase.purchasedByUser === userName.toLowerCase()
    );

    setSales(userSales);
    setPurchases(userPurchases);
  }, [userName]);

  const totalSalesAmount = sales.reduce(
    (sum, sale) => sum + parseFloat(sale.soldAtPrice || "0"),
    0
  );
  const totalPurchaseAmount = purchases.reduce(
    (sum, purchase) => sum + parseFloat(purchase.purchasePrice || "0"),
    0
  );
  const profit = totalSalesAmount - totalPurchaseAmount;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN");
  };

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
              value: `₹${totalSalesAmount.toLocaleString("en-IN")}`,
            },
            {
              label: "Total Purchases",
              value: `₹${totalPurchaseAmount.toLocaleString("en-IN")}`,
            },
            {
              label: "Profit/Loss",
              value: `₹${profit.toLocaleString("en-IN")}`,
              className: profit >= 0 ? "text-green-600" : "text-red-600",
            },
            { label: "Items Sold", value: sales.length, color: "#EB1414" },
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
          <div className="border rounded-lg shadow-sm bg-white">
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
          </div>

          {/* Purchases Table */}
          <div className="border rounded-lg shadow-sm bg-white">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

import Header from "./Header";

export const Home = () => {
  return (
    <>
      <Header />
      <div className="md:px-20 my-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#EB1414] mb-2">
            3B Auto Experts
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
              <div className="text-2xl font-bold text-[#EB1414]">0</div>
            </div>
          </div>

          {/* Total Purchases */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-black shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">
                Total Purchases
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>

          {/* Total Profit */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-black shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">Total Profit</p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>

          {/* Total Transactions */}
          <div className="rounded-lg border border-[#EB1414] bg-white text-black shadow-sm">
            <div className="pb-2 flex flex-col space-y-1.5 p-6">
              <p className="text-sm font-medium text-[#6e6e6e]">
                Total Transactions
              </p>
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

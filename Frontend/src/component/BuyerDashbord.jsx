import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyerDashbord() {
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-[Poppins]">
      
      {/* Navbar */}
      <header className="bg-green-700 text-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Buyer Dashboard</h1>
        <button 
          onClick={() => navigate("/")}
          className="bg-white text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-100 transition"
        >
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="flex justify-center bg-green-100 py-4 shadow-sm">
        {[
          { id: "pending", label: "Pending Transactions" },
          { id: "success", label: "Successful Transactions" },
          { id: "rejected", label: "Rejected Transactions" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`mx-4 px-6 py-2 rounded-full font-medium text-sm md:text-base transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-green-700 text-white shadow-md"
                : "bg-white text-green-700 hover:bg-green-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto mt-10 p-6">
        {activeTab === "pending" && <PendingTransactions />}
        {activeTab === "success" && <SuccessfulTransactions />}
        {activeTab === "rejected" && <RejectedTransactions />}
      </div>
    </div>
  );
}

/* ==============================
   ✅ Pending Transactions Tab 
================================*/
function PendingTransactions() {
  const data = [
    { id: "TXP-101", credits: 200, price: "$1800", date: "2025-11-12", status: "Pending" },
    { id: "TXP-102", credits: 350, price: "$3150", date: "2025-11-09", status: "Pending" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-6">⏳ Pending Transactions</h2>
      <TransactionTable data={data} />
    </div>
  );
}

/* ==============================
   ✅ Successful Transactions Tab 
================================*/
function SuccessfulTransactions() {
  const data = [
    { id: "TXS-501", credits: 500, price: "$4500", date: "2025-10-28", status: "Success" },
    { id: "TXS-502", credits: 150, price: "$1350", date: "2025-09-15", status: "Success" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-6">✅ Successful Transactions</h2>
      <TransactionTable data={data} />
    </div>
  );
}

/* ==============================
   ❌ Rejected Transactions Tab 
================================*/
function RejectedTransactions() {
  const data = [
    { id: "TXR-301", credits: 100, price: "$900", date: "2025-11-03", status: "Rejected" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-6">❌ Rejected Transactions</h2>
      <TransactionTable data={data} />
    </div>
  );
}

/* ==============================
   📊 Reusable Table Component 
================================*/
function TransactionTable({ data }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-green-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-green-700 text-white">
            <th className="py-3 px-5">Transaction ID</th>
            <th className="py-3 px-5">Credits</th>
            <th className="py-3 px-5">Amount</th>
            <th className="py-3 px-5">Date</th>
            <th className="py-3 px-5">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr key={i} className="border-b hover:bg-green-50 transition-colors">
              <td className="py-3 px-5">{t.id}</td>
              <td className="py-3 px-5">{t.credits}</td>
              <td className="py-3 px-5">{t.price}</td>
              <td className="py-3 px-5">{t.date}</td>
              <td className={`py-3 px-5 font-semibold ${
                t.status === "Pending"
                  ? "text-yellow-600"
                  : t.status === "Success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                {t.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
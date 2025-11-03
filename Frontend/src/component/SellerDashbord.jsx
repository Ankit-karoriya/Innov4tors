import React, { useState } from "react";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white font-[Poppins]">
      {/* Navbar */}
      <header className="bg-emerald-700 text-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Seller Dashboard</h1>
        <button className="bg-white text-emerald-700 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-100 transition">
          Logout
        </button>
      </header>

      {/* Tabs Navigation */}
      <div className="flex justify-center bg-emerald-100 py-4 shadow-sm">
        {[
          { id: "projects", label: "See All Projects" },
          { id: "details", label: "Project Details" },
          { id: "transactions", label: "Transaction Details" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`mx-4 px-6 py-2 rounded-full font-medium text-sm md:text-base transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-emerald-700 text-white shadow-md"
                : "bg-white text-emerald-700 hover:bg-emerald-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto mt-10 p-6">
        {activeTab === "projects" && <AllProjects />}
        {activeTab === "details" && <ProjectDetails />}
        {activeTab === "transactions" && <TransactionDetails />}
      </div>
    </div>
  );
}

/* --- Tab 1: All Projects --- */
function AllProjects() {
  const projects = [
    {
      name: "Mangrove Restoration Project",
      location: "Kerala, India",
      credits: 1500,
      status: "Active",
    },
    {
      name: "Solar Energy Expansion",
      location: "Gujarat, India",
      credits: 2200,
      status: "Completed",
    },
    {
      name: "Urban Tree Plantation",
      location: "Delhi, India",
      credits: 800,
      status: "Pending",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">
        🌿 All Projects
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj, index) => (
          <div
            key={index}
            className="bg-white border border-emerald-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">
              {proj.name}
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Location:</strong> {proj.location}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Credits:</strong> {proj.credits}
            </p>
            <p
              className={`text-sm font-semibold ${
                proj.status === "Active"
                  ? "text-green-600"
                  : proj.status === "Completed"
                  ? "text-blue-600"
                  : "text-yellow-600"
              }`}
            >
              Status: {proj.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Tab 2: Project Details --- */
function ProjectDetails() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">
        📋 Project Details
      </h2>

      <div className="bg-white shadow-md rounded-xl p-6 border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-700 mb-4">
          Mangrove Restoration Project
        </h3>
        <p className="text-gray-700 mb-2">
          <strong>Project ID:</strong> MGRV-1024
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> Kerala, India
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Description:</strong> A sustainability initiative focusing on
          restoring 500 hectares of mangrove forest to capture carbon and
          improve local biodiversity.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Total Carbon Credits:</strong> 1500
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Status:</strong>{" "}
          <span className="text-green-600 font-semibold">Active</span>
        </p>
      </div>
    </div>
  );
}

/* --- Tab 3: Transaction Details --- */
function TransactionDetails() {
  const transactions = [
    {
      id: "TXN-1001",
      date: "2025-10-12",
      buyer: "EcoTrade Ltd.",
      credits: 300,
      amount: "$2,700",
    },
    {
      id: "TXN-1002",
      date: "2025-09-25",
      buyer: "GreenPlanet Org.",
      credits: 450,
      amount: "$4,050",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">
        💰 Transaction Details
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-emerald-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="py-3 px-5">Transaction ID</th>
              <th className="py-3 px-5">Date</th>
              <th className="py-3 px-5">Buyer</th>
              <th className="py-3 px-5">Credits</th>
              <th className="py-3 px-5">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-b hover:bg-emerald-50 transition-colors"
              >
                <td className="py-3 px-5">{t.id}</td>
                <td className="py-3 px-5">{t.date}</td>
                <td className="py-3 px-5">{t.buyer}</td>
                <td className="py-3 px-5">{t.credits}</td>
                <td className="py-3 px-5">{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
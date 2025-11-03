import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/seller/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/seller/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white font-[Poppins]">
      {/* Navbar */}
      <header className="bg-emerald-700 text-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Seller Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="bg-white text-emerald-700 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-100 transition"
        >
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
  const [showModal, setShowModal] = useState(false);

  const projects = [
    { name: "Mangrove Restoration Project", location: "Kerala, India", credits: 1500, status: "Active" },
    { name: "Solar Energy Expansion", location: "Gujarat, India", credits: 2200, status: "Completed" },
    { name: "Urban Tree Plantation", location: "Delhi, India", credits: 800, status: "Pending" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-emerald-800">🌿 All Projects</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-emerald-700 transition"
        >
          View Project List
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj, index) => (
          <div
            key={index}
            className="bg-white border border-emerald-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">{proj.name}</h3>
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

      {/* Modal for Project List */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-11/12 md:w-2/3 lg:w-1/2 p-6 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-emerald-700">Project List</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-500 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <ul className="divide-y divide-gray-200">
              {projects.map((proj, i) => (
                <li key={i} className="py-3">
                  <p className="text-emerald-800 font-semibold">{proj.name}</p>
                  <p className="text-gray-600 text-sm">
                    {proj.location} — {proj.credits} credits ({proj.status})
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- Tab 2: Project Details with Subtabs --- */
function ProjectDetails() {
  const [subTab, setSubTab] = useState("overview");

  const pendingProjects = [
    { name: "Urban Tree Plantation", location: "Delhi", credits: 800 },
  ];
  const approvedProjects = [
    { name: "Solar Energy Expansion", location: "Gujarat", credits: 2200 },
  ];
  const rejectedProjects = [
    { name: "River Cleanup Initiative", location: "Odisha", credits: 600 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">📋 Project Details</h2>

      {/* Subtabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        {[
          { id: "overview", label: "Overview" },
          { id: "pending", label: "Seller Pending Projects" },
          { id: "approved", label: "Seller Approved Projects" },
          { id: "rejected", label: "Seller Rejected Projects" },
          { id: "create", label: "Create a New Project" }, // ✅ Added new tab
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              subTab === tab.id
                ? "bg-emerald-700 text-white shadow-md"
                : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subtab Content */}
      {subTab === "overview" && (
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
            <strong>Description:</strong> Restoring 500 hectares of mangroves to
            capture carbon and enhance biodiversity.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Total Carbon Credits:</strong> 1500
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Status:</strong>{" "}
            <span className="text-green-600 font-semibold">Active</span>
          </p>
        </div>
      )}

      {subTab === "pending" && (
        <ProjectListSection title="Pending Projects" data={pendingProjects} color="yellow" />
      )}

      {subTab === "approved" && (
        <ProjectListSection title="Approved Projects" data={approvedProjects} color="green" />
      )}

      {subTab === "rejected" && (
        <ProjectListSection title="Rejected Projects" data={rejectedProjects} color="red" />
      )}

      {/* ✅ NEW TAB CONTENT */}
      {subTab === "create" && <CreateProjectForm />}
    </div>
  );
}

/* --- New Component: CreateProjectForm --- */
function CreateProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    description: "",
    credits: "",
    duration: "",
    area: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New project created:", formData);
    alert("✅ Project submitted successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      location: "",
      description: "",
      credits: "",
      duration: "",
      area: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-emerald-100 p-6">
      <h3 className="text-xl font-semibold text-emerald-700 mb-4">🆕 Create a New Project</h3>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* Project Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-emerald-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-emerald-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-emerald-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border border-emerald-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Project Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-emerald-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Duration (in months)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            className="w-full border border-emerald-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Area */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Area (in hectares)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            min="0.1"
            step="0.1"
            className="w-full border border-emerald-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Credits */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Carbon Credits</label>
          <input
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            required
            min="1"
            className="w-full border border-emerald-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border border-emerald-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-emerald-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
}
/* --- Subcomponent for Project Lists --- */
function ProjectListSection({ title, data, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-emerald-100 p-6">
      <h3 className={`text-xl font-semibold text-${color}-700 mb-4`}>{title}</h3>
      {data.length === 0 ? (
        <p className="text-gray-600">No projects found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {data.map((proj, index) => (
            <li key={index} className="py-3">
              <p className="font-semibold text-emerald-800">{proj.name}</p>
              <p className="text-gray-600 text-sm">
                {proj.location} — {proj.credits} credits
              </p>
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
}

/* --- Tab 3: Transaction Details --- */
function TransactionDetails() {
  const transactions = [
    { id: "TXN-1001", date: "2025-10-12", buyer: "EcoTrade Ltd.", credits: 300, amount: "$2,700" },
    { id: "TXN-1002", date: "2025-09-25", buyer: "GreenPlanet Org.", credits: 450, amount: "$4,050" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">💰 Transaction Details</h2>

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
              <tr key={t.id} className="border-b hover:bg-emerald-50 transition-colors">
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
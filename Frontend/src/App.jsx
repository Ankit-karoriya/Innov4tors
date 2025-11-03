import { Routes, Route } from "react-router-dom";

import HomePage from './component/HomePage.jsx';
import BuyerRegistrationForm from './component/BuyerRegistrationForm.jsx';
import SellerRegistrationForm from "./component/SellerRegistrationForm.jsx";
import SellerLogin from "./component/SellerLogin.jsx";
import BuyerLogin from "./component/BuyerLogin.jsx";
import SellerDashboard from "./component/SellerDashbord.jsx";
import SellerProjectForm from "./component/SellerProjectForm.jsx";
import ProjectList from "./component/ProjectList.jsx";
import SellerPendingProjects from "./component/SellerPendingProjects.jsx";
import SellerApprovedProjects from "./component/SellerApprovedProjects.jsx";
import SellerRejectedProjects from "./component/SellerRejectedProjects.jsx";
import SellerTransactionDetails from "./component/SellerTransactionDetails.jsx";
import BuyerDashboard from "./component/BuyerDashbord.jsx";
import BuyerPendingTransaction from "./component/BuyerPendingTransaction.jsx";
import BuyerSuccessfulTransaction from "./component/BuyerSuccessfullTransaction.jsx";
import BuyerRejectedTransactions from "./component/BuyerRejectedTransactions.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Seller Routes */}
        <Route path="/seller/register" element={<SellerRegistrationForm />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/project-form" element={<SellerProjectForm />} />
        <Route path="/seller/projects" element={<ProjectList />} />
        <Route path="/seller/projects/pending" element={<SellerPendingProjects />} />
        <Route path="/seller/projects/approved" element={<SellerApprovedProjects />} />
        <Route path="/seller/projects/rejected" element={<SellerRejectedProjects />} />
        <Route path="/seller/transactions" element={<SellerTransactionDetails />} />

        {/* Buyer Routes */}
        <Route path="/buyer/register" element={<BuyerRegistrationForm />} />
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/transactions/pending" element={<BuyerPendingTransaction />} />
        <Route path="/buyer/transactions/successful" element={<BuyerSuccessfulTransaction />} />
        <Route path="/buyer/transactions/rejected" element={<BuyerRejectedTransactions />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen text-center text-2xl font-semibold text-red-500">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

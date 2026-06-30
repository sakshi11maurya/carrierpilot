// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }

// export default Dashboard;

import React from "react";
import ResumeAnalyzer from "./ResumeAnalyzer";

function Dashboard() {

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          CareerPilot AI Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Resume Analyzer Full */}
      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Resume Analyzer
        </h2>

        <ResumeAnalyzer />
      </div>

    </div>
  );
}

export default Dashboard;
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import ResumeAnalyzer from "./pages/ResumeAnalyzer";
// import "./App.css";

// function App() {
//   return (
//     <Router>
      
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-4xl font-bold text-blue-600">
//           CareerPilot AI</h1>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//         <div>
//           <ResumeAnalyzer/>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyzer" element={<ResumeAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;




// npx create-react-app frontend
// npx create-react-app@latest frontend
// cd frontend
// npm start
//npm install react-router-dom

//tailwind css
//npm install -D tailwindcss@3 postcss autoprefixer
//npx tailwindcss init -p

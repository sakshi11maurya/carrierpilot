// import { Link } from 'react-router-dom';

// function Login() {
//   return (
//     <div>
//       <div className="flex items-center justify-center h-screen bg-gray-100"></div>
//       <div className="bg-white p-8 rounded-xl shadow-lg w-96">
//         <div className="text-2xl font-bold text-center mb-6">  <h2>CareerPilot AI Login</h2></div>

//         <input
//           type="email"
//           placeholder='email'
//           className="w-full p-2 mb-4 border rounded"
//           />

//           <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//         />

//          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//           Login
//         </button>

//            <p className="text-sm text-center mt-4">
//             Don't have an account? {" "}
//             <Link to="/signup" className="text-blue-600 hover:underline">
//               Sign up
//             </Link>
//            </p>

//       </div>

//       </div>
    
//   );
// }

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
         //"http://localhost:5000/api/user/login",
        "http://127.0.0.1:5000/api/user/login",
        { email, password }
      );

      alert(res.data.message);

      // token save
      localStorage.setItem("token", res.data.token);

      // redirect
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          CareerPilot AI Login
        </h2>

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
// import { Link } from "react-router-dom";

// function Signup() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">

//       <div className="bg-white p-8 rounded-xl shadow-lg w-96">

//         <h2 className="text-2xl font-bold text-center mb-6">
//           Create Account
//         </h2>

//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
//           Signup
//         </button>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-600">
//             Login
//           </Link>
//         </p>

//       </div>

//     </div>
//   );
// }

// export default Signup;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/signup",
        { name, email, password }
      );

      alert(res.data.message);

      // redirect to login
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Signup
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
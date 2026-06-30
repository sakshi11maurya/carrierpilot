// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// exports.signup = async (req, res) => {
//   try {

//     const { name, email, password } = req.body;

//     const newUser = new User({
//       name,
//       email,
//       password
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: "User Created Successfully",
//       user: newUser
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// const jwt = require("jsonwebtoken");


// exports.login = async (req,res)=>{

//  const {email,password} = req.body;

//  const user = await User.findOne({email});

//  if(!user){
//   return res.status(404).json({message:"User not found"});
//  }

//  const isMatch = await bcrypt.compare(password,user.password);

//  if(!isMatch){
//   return res.status(400).json({message:"Invalid password"});
//  }

//  const token = jwt.sign(
//   {id:user._id},
//   "secretkey",
//   {expiresIn:"1d"}
//  );

//  res.json({
//   message:"Login successful",
//   token
//  });

// };

// import { useState } from "react";
// import { Link } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();
//       console.log(data);

//       if (res.ok) {
//         alert("Login successful");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           CareerPilot AI Login
//         </h2>

//         <input
//           type="email"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>

//         <p className="text-sm text-center mt-4">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


const User = require("../models/User");

// SIGNUP CONTROLLER
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "Signup successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in signup" });
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in login" });
  }
};
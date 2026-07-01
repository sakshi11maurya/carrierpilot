// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();

// const userRoutes = require("./routes/userRoutes");

// app.use("/api/users", userRoutes);

// const aiRoutes = require("./routes/aiRoute");

// app.use("/api/ai", aiRoutes);

// app.use(cors());
// app.use(express.json());


// import axios from "axios"; //....

// /* MongoDB Connection */
// mongoose.connect("mongodb://127.0.0.1:27017/careerpilot")
// .then(() => console.log("MongoDB Connected"))
// .catch((err) => console.log(err));

// /* Test Route */
// app.get("/", (req, res) => {
//   res.send("CareerPilot AI Backend Running");
// });


// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}`);
// });









// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();

// // ✅ Middleware FIRST
// app.use(cors());
// app.use(express.json());

// // ✅ Routes
// const userRoutes = require("./routes/userRoutes");
// const aiRoutes = require("./routes/aiRoute");

// app.use("/api/user", userRoutes);   // singular rakho (frontend match karega)
// app.use("/api/ai", aiRoutes);

// // ✅ MongoDB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/careerpilot")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // ✅ Test Route (only ONE)
// app.get("/", (req, res) => {
//   res.send("CareerPilot AI Backend Running");
// });

// // ✅ Server Start
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug
console.log("MONGO_URI Loaded:", !!process.env.MONGO_URI);

// Routes
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoute");

app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("CareerPilot AI Backend Running");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});










//node server.js


//for git changes
//git add .
//git commit -m "Describe your changes"
//git push
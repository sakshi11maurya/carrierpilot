
// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");
// const { analyzeResume } = require("../controllers/aiController");

// // TEXT analyze (agar hai to add karo)
// router.post("/analyze", (req, res) => {
//   res.json({ result: "Text analyzed successfully" });
// });

// // PDF analyze
// router.post("/analyze-resume", upload.single("resume"), analyzeResume);

// module.exports = router;





// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");
// const { analyzeResume } = require("../controllers/aiController");

// // ✅ TEXT ANALYSIS ROUTE
// router.post("/analyze", (req, res) => {
//   const { resumeText } = req.body;

//   if (!resumeText) {
//     return res.json({ result: "No text provided" });
//   }

//   res.json({
//     result: "Text analyzed successfully ✅"
//   });
// });

// // ✅ PDF ANALYSIS ROUTE
// router.post("/analyze-resume", upload.single("resume"), analyzeResume);

// module.exports = router;



// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");

// // 👇 IMPORTANT IMPORT
// const { analyzeText, analyzeResume } = require("../controllers/aiController");

// // ✅ TEXT ANALYSIS (AI wala)
// router.post("/analyze", analyzeText);

// // ✅ PDF ANALYSIS
// router.post("/analyze-resume", upload.single("resume"), analyzeResume);

// module.exports = router;




// routes/aiRoute.js

const express = require("express");
const router = express.Router();

const { analyzeText, analyzeResume } = require("../controllers/aiController");
const upload = require("../middleware/upload");

// ✅ TEXT ANALYSIS
router.post("/analyze", analyzeText);

// ✅ PDF ANALYSIS
router.post("/analyze-resume", upload.single("resume"), analyzeResume);

module.exports = router;
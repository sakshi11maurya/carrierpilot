
// const OpenAI = require("openai");
// require("dotenv").config();

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// exports.analyzeText = async (req, res) => {
//   try {
//     const { resumeText } = req.body;

//     if (!resumeText) {
//       return res.json({ result: "No text provided" });
//     }

//     const response = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: "You are a professional resume reviewer."
//         },
//         {
//           role: "user",
//           content: `Analyze this resume and give:
//           1. Mistakes
//           2. Improvements
//           3. Score out of 100

//           Resume:
//           ${resumeText}`
//         }
//       ],
//     });

//     const result = response.choices[0].message.content;

//     res.json({ result });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       result: "AI analysis failed"
//     });
//   }
// };


// controllers/aiController.js





// exports.analyzeText = async (req, res) => {
//   try {
//     const { resumeText } = req.body;

//     if (!resumeText) {
//       return res.json({ result: "No text provided" });
//     }

//     let feedback = [];
//     let score = 100;

//     const text = resumeText.toLowerCase();

//     // 🔍 Sections check
//     if (!text.includes("skills")) {
//       feedback.push("❌ Skills section missing");
//       score -= 10;
//     }

//     if (!text.includes("education")) {
//       feedback.push("❌ Education section missing");
//       score -= 10;
//     }

//     if (!text.includes("projects")) {
//       feedback.push("❌ Projects section missing");
//       score -= 10;
//     }

//     if (!text.includes("experience")) {
//       feedback.push("❌ Experience section missing");
//       score -= 10;
//     }

//     // 📧 Email check
//     if (!resumeText.includes("@")) {
//       feedback.push("❌ Email missing");
//       score -= 5;
//     }

//     // 📱 Phone check (10 digit)
//     if (!resumeText.match(/\d{10}/)) {
//       feedback.push("❌ Phone number missing or invalid");
//       score -= 5;
//     }

//     // 📏 Length check
//     if (resumeText.length < 300) {
//       feedback.push("❌ Resume too short");
//       score -= 10;
//     }

//     // 🧠 Achievements check
//     if (!text.includes("achievement")) {
//       feedback.push("⚠ Add achievements section");
//       score -= 5;
//     }

//     // ✅ Good case
//     if (feedback.length === 0) {
//       feedback.push("✅ Excellent Resume!");
//     }

//     res.json({
//       result: `
// Score: ${score}/100

// ${feedback.join("\n")}
//       `
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       result: "Error analyzing resume"
//     });
//   }
// };



// // ✅ PDF (basic placeholder — error-free)
// exports.analyzeResume = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.json({ result: "No file uploaded" });
//     }

//     res.json({
//       result: "PDF analysis coming soon 🚀"
//     });

//   } catch (error) {
//     res.status(500).json({
//       result: "Error analyzing PDF"
//     });
//   }
// };





const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

// ================= COMMON ANALYSIS FUNCTION =================
function analyzeResumeContent(resumeText) {
  let feedback = [];
  let score = 100;

  const text = resumeText.toLowerCase();

  // Sections Check
  if (!text.includes("skills")) {
    feedback.push("❌ Skills section missing");
    score -= 10;
  }

  if (!text.includes("education")) {
    feedback.push("❌ Education section missing");
    score -= 10;
  }

  if (!text.includes("projects")) {
    feedback.push("❌ Projects section missing");
    score -= 10;
  }

  if (!text.includes("experience")) {
    feedback.push("❌ Experience section missing");
    score -= 10;
  }

  // Email Check
  if (!resumeText.includes("@")) {
    feedback.push("❌ Email missing");
    score -= 5;
  }

  // Phone Check
  if (!resumeText.match(/\d{10}/)) {
    feedback.push("❌ Phone number missing or invalid");
    score -= 5;
  }

  // Resume Length
  if (resumeText.length < 300) {
    feedback.push("❌ Resume too short");
    score -= 10;
  }

  // Achievement Check
  if (!text.includes("achievement")) {
    feedback.push("⚠ Add achievements section");
    score -= 5;
  }

  if (feedback.length === 0) {
    feedback.push("✅ Excellent Resume!");
  }

  return `
Score: ${score}/100

${feedback.join("\n")}
`;
}

// ================= TEXT ANALYSIS =================
exports.analyzeText = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.json({
        result: "No text provided",
      });
    }

    res.json({
      result: analyzeResumeContent(resumeText),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      result: "Error analyzing text",
    });
  }
};

// ================= FILE ANALYSIS =================
exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        result: "No file uploaded",
      });
    }

    let resumeText = "";

    // PDF
    if (req.file.mimetype === "application/pdf") {
      const buffer = fs.readFileSync(req.file.path);

      const data = await pdf(buffer);

      resumeText = data.text;
    }

    // DOCX
    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const data = await mammoth.extractRawText({
        path: req.file.path,
      });

      resumeText = data.value;
    } else {
      fs.unlinkSync(req.file.path);

      return res.json({
        result: "Only PDF and DOCX files are supported.",
      });
    }

    // Delete uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      result: analyzeResumeContent(resumeText),
    });
  } catch (error) {
    console.error(error);

    // Delete file if exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      result: "Error analyzing uploaded file",
    });
  }
};
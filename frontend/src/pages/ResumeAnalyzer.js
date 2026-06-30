// import React, { useState } from "react";

// function ResumeAnalyzer() {

// const [resumeText,setResumeText] = useState("");
// const [file,setFile] = useState(null);
// const [result,setResult] = useState("");


// // TEXT ANALYZE
// const analyzeText = async () => {

// const res = await fetch("http://localhost:5000/api/ai/analyze",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({resumeText})
// });

// const data = await res.json();
// setResult(data.result);

// };


// // PDF UPLOAD
// const uploadPDF = async () => {

// const formData = new FormData();
// formData.append("resume",file);

// const res = await fetch("http://localhost:5000/analyze",{
// method:"POST",      //http://localhost:5000/api/ai/analyze-resume
// body:formData
// });

// const data = await res.json();
// setResult(data.result);

// };

// return(

// <div>

// <h2>Paste Resume</h2>

// <textarea
// placeholder="Paste resume text"
// onChange={(e)=>setResumeText(e.target.value)}
// ></textarea>

// <button onClick={analyzeText}>
// Analyze Text
// </button>

// <hr/>

// <h2>Upload Resume PDF</h2>

// <input
// type="file"
// onChange={(e)=>setFile(e.target.files[0])}
// />

// <button onClick={uploadPDF}>
// Upload PDF
// </button>

// <h3>Result</h3>

// <p>{result}</p>

// </div>

// );

// }

// export default ResumeAnalyzer;


import React, { useState } from "react";

function ResumeAnalyzer() {

  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  // TEXT ANALYZE
  const analyzeText = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resumeText })
      });

      const data = await res.json();
      setResult(data.result);

    } catch (err) {
      console.error(err);
      alert("Error analyzing text");
    }
  };

  // PDF UPLOAD
  const uploadPDF = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("http://localhost:5000/api/ai/analyze-resume", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setResult(data.result);

    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-2">Paste Resume</h2>

      <textarea
        className="border w-full p-2 mb-2"
        placeholder="Paste resume text"
        onChange={(e)=>setResumeText(e.target.value)}
      ></textarea>

      <button
        onClick={analyzeText}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Analyze Text
      </button>

      <hr className="my-4"/>

      <h2 className="text-xl font-bold mb-2">Upload Resume PDF</h2>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button
        onClick={uploadPDF}
        className="bg-green-500 text-white p-2 rounded ml-2"
      >
        Upload PDF
      </button>

      <h3 className="mt-4 font-bold">Result</h3>

      <p className="bg-gray-100 p-2 mt-2">{result}</p>

    </div>
  );
}

export default ResumeAnalyzer;
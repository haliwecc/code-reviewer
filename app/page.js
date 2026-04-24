"use client";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Java");
  const [review, setReview] = useState("");//Explain like I’m a beginner” toggle
  const [level, setLevel] = useState("Medium");//do not commit with the API password
  const [result, setResult] = useState("");

  const handleSubmit=async()=>{
    try{
    const res= await fetch("http://localhost:8080/api/review",{
      method:"POST",
      headers:{
        "Content-Type":"text/plain"
      },
      body:JSON.stringify({
        code,
        language,
        review,
        level
      })
      });
if(!res.ok){
  throw new Error("Failed to fetch review");
}
      const data=await res.json();
      setResult(data);
    }
    catch(error){
      console.error("Error:",error);
    }
  }

  return (
  <>
  <main >
      <p>Please enter your code:</p>
      <input type="text" value={code} onChange={(event) => setCode(event.target.value)} className="code-input" />
      <div className="user">
        <p1>Language:</p1>
        <select id="languages">
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div className="user">
        <p1>Explanation Level:</p1>
        <select id="levels">
          <option value="beginner">Beginner</option> //Explain like im 5
          //Explain like im 5
          <option value="intermediate">Brief</option> //Just show code
          //Just show code
          <option value="advanced">Interesting</option> //use real life explantion
        //use real life explantion
        </select>
      </div>

      <button onClick={handleSubmit} className="submit-button">Review Code</button>
    </main>
    <div className="result">{result}</div>
    </>
  );
}

"use client";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Java");
  const [review, setReview] = useState("");//Explain like I’m a beginner” toggle
  const [level, setLevel] = useState("Medium");//do not commit with the API password
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
<option value="beginner">Beginner</option>//Explain like im 5
<option value="intermediate">Brief</option>//Just show code
<option value="advanced">Interesting</option>//use real life explantion
  </select>
    </div>
    
  </main>
  );
}

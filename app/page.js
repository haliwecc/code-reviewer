"use client";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Java");
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("Medium");//do not commit with the API password
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setResult("");
      const res = await fetch("http://localhost:8080/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code,
          language,
          level
        })
      });
      if (!res.ok) {
        throw new Error("Failed to fetch review");
      }
      const data = await res.text();
      setResult(data);
    }
    catch (error) {
      console.error("Error:", error);
      setResult("An error occurred while fetching the review.");
    }
    setLoading(false);
  }

  return (
    <>
      <main >
        <div className="split user">
          <div className="centered">

            <div className="user-option">
              <p>Language:</p>
              <select value={language} onChange={(event) => setLanguage(event.target.value)} id="languages">
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>

            <div className="user-option">
              <p>Explanation Level:</p>
              <select value={level} onChange={(event) => setLevel(event.target.value)} id="levels">
                <option value="beginner">Beginner</option>

                <option value="intermediate">Brief</option>

                <option value="advanced">Interesting</option>

              </select>
            </div>

            <textarea value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter your code here..." />

            <button onClick={handleSubmit} className="submit-button" disabled={loading}>
              {loading ? "Reviewing..." : "Review Code"}
            </button>
          </div>
        </div>

        <div className="split ai">
          <div className="centered">
            <p>Hello</p>
            {loading && <p>Loading...</p>}
            <div className="result">{result}</div>
          </div>
        </div>
      </main>

    </>
  );
}

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
      setResult(divideResponse(data));
    }
    catch (error) {
      console.error("Error:", error);
      setResult("An error occurred while fetching the review.");
    }
    setLoading(false);
  }

  const divideResponse = (text) => {//A function that recieves the AI response(text)
    const extract = (heading) => {//Function that extracts sections like bugs and improvements based on the heading
      const regex = new RegExp('${heading}:\\s*([\\s\\s]*?)(?=\\n[A-Z]+:|$)', "i");//Build a regex to find the section based on the heading
      const match = text.match(regex);//Runs a regex on the AI response
      if (!match) {//If it doesnt exist return an empty array
        return [];
      }
      return match[1]//Return the matched section, split it into lines, remove bullet points,*,- and trim whitespace
        .split("\n")
        .map(l => l.replace(/^[-*•]\s*/, "").trim())
        .filter(Boolean);//Remove empty lines
    };

    const fullMatch = text.match(/FULL REVIEW:\s*([\s\S]*?)$/i);//Extract the full review section if it exists
    return {
      bugs: extract("BUGS"),
      improvements: extract("IMPROVEMENTS"),
      fullReview: fullMatch ? fullMatch[1].trim() : text,
    };
  };

  return (
    <>
      <nav>
        <div className="nav">powered by Ollama mistral</div>
      </nav>

      <main className="layout">
        <div className="left">

          <div className="label">Language</div>
          <div className="chip-row">
            {["java", "python", "javascript"].map(l => (
              <button
                key={l}
                className={`chip ${language === l ? "active" : ""}`}
                onClick={() => setLanguage(l)}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>

          <div className="label">Your code</div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Paste your code here..."
          />

          <div className="label">Explanation level</div>
          <div className="chip-row">
            {["beginner", "intermediate", "advanced"].map(l => (
              <button
                key={l}
                className={`chip ${level === l ? "active" : ""}`}
                onClick={() => setLevel(l)}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>

          <button className="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Reviewing..." : "Submit for review"}
          </button>



          {loading && (
            <div className="loading-text">
              Thinking...
            </div>
          )}

          {result?.error && (
            <div className="empty-state" style={{ color: "#ffaaaa" }}>
              {result.error}
            </div>
          )}

          {result && !result.error && (
            <>
              {result.bugs.length > 0 && (
                <div>
                  <div className="sec-title">Bugs found</div>
                  {result.bugs.map((bug, i) => (
                    <div key={i} className="bug-item">
                      <div className="bug-dot"></div>
                      <div className="bug-text">{bug}</div>
                    </div>
                  ))}
                </div>
              )}

              {result.bugs.length === 0 && (
                <div>
                  <div className="sec-title">Bugs found</div>
                  <div className="bug-item">
                    <div className="bug-text">
                      No bugs found!
                    </div>
                  </div>
                </div>
              )}

              {result.improvements.length > 0 && (
                <div>
                  <div className="sec-title">Improvements</div>
                  {result.improvements.map((imp, i) => (
                    <div key={i} className="imp-item">
                      <div className="imp-text">{imp}</div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <div className="sec-title">Full review</div>
                <div className="full-review">{result.full}</div>
              </div>
            </>
          )}
        </div>
        <div className="right">
          {!result && !loading && (
            <div className="empty-state">
              Paste your code and click Review to get started
            </div>
          )}
        </div>
      </main>
    </>
  );
}

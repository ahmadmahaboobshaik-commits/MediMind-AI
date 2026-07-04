import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { chatWithAI } from "../services/api";

import "../styles/TextSearch.css";

function TextSearch() {

  const navigate = useNavigate();

  const [medicine, setMedicine] = useState("");

  const [loading, setLoading] = useState(false);

  const [answer, setAnswer] = useState("");

  async function handleSearch() {

    if (!medicine.trim()) return;

    setLoading(true);

    setAnswer("");

    try {

      const reply = await chatWithAI(
        `Explain this medicine:\n\n${medicine}`
      );

      setAnswer(reply);

    } catch {

      setAnswer("Unable to contact MediMind AI.");

    }

    setLoading(false);

  }

  return (

    <div className="text-page">

      <h1>⌨ Search Medicine</h1>

      <p>

        Enter the medicine name below.

      </p>

      <input

        value={medicine}

        onChange={(e)=>setMedicine(e.target.value)}

        placeholder="Example: Crocin 650"

      />

      <button onClick={handleSearch}>

        🔍 Search

      </button>

      {

        loading &&

        <p>

          🤖 Searching...

        </p>

      }

      {

        answer &&

        <div className="answer-box">

          {answer}

        </div>

      }

      <button

        className="back-btn"

        onClick={()=>navigate("/medicine-assistant")}

      >

        ← Back

      </button>

    </div>

  );

}

export default TextSearch;
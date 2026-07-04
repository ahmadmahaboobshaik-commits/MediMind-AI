import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { analyzeMedicineImage } from "../services/api";
import { useMedicines } from "../context/MedicineContext";

import "../styles/MedicineAnalysis.css";

function MedicineAnalysis() {

  const navigate = useNavigate();

  const location = useLocation();

  const image = location.state?.image;

  const file = location.state?.file;

  const { setCurrentMedicine } = useMedicines();

  const [loading, setLoading] = useState(false);

  const [medicine, setMedicine] = useState(null);

  const [error, setError] = useState("");

  async function handleAnalyze() {

    if (!file) return;

    try {

      setLoading(true);

      setError("");

      const result = await analyzeMedicineImage(file);

      setMedicine(result);

      // ⭐ Save for AI Assistant
      setCurrentMedicine(result);

    } catch (err) {

      console.error(err);

      setError("Unable to analyze medicine.");

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    if (file) {

      handleAnalyze();

    }

  }, []);

  return (

    <div className="analysis-page">

      <button
        className="back-btn"
        onClick={() => navigate("/medicine-assistant")}
      >
        ← Back
      </button>

      <div className="analysis-card">

        {image ? (

          <img
            src={image}
            alt="Medicine"
            className="medicine-preview"
          />

        ) : (

          <div className="medicine-image">
            💊
          </div>

        )}

        <h1>Medicine Analysis</h1>

        {loading ? (

          <p className="waiting">
            🤖 Gemini is analyzing...
          </p>

        ) : (

          <p className="waiting">
            Analysis Complete
          </p>

        )}

        {error && (

          <p
            style={{
              color: "red",
              textAlign: "center"
            }}
          >
            {error}
          </p>

        )}

        <div className="result-section">

          <div className="result-box">
            <h3>Medicine Name</h3>
            <p>{medicine?.name || "--"}</p>
          </div>

          <div className="result-box">
            <h3>Uses</h3>
            <p>{medicine?.uses || "--"}</p>
          </div>

          <div className="result-box">
            <h3>Dosage</h3>
            <p>{medicine?.dosage || "--"}</p>
          </div>

          <div className="result-box">
            <h3>Warnings</h3>
            <p>{medicine?.warnings || "--"}</p>
          </div>

          <div className="result-box">
            <h3>Side Effects</h3>
            <p>{medicine?.sideEffects || "--"}</p>
          </div>

          <div className="result-box">
            <h3>Storage</h3>
            <p>{medicine?.storage || "--"}</p>
          </div>

        </div>

        <div className="analysis-buttons">

          <button className="speak-btn">
            🔊 Read Aloud
          </button>

          <button
            className="ask-btn"
            onClick={() => navigate("/assistant")}
          >
            🤖 Ask AI
          </button>

        </div>

      </div>

    </div>

  );

}

export default MedicineAnalysis;